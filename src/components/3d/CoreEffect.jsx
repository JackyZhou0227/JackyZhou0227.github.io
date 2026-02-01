import React, { useRef, useMemo, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

// --- Shaders ---

const coreShader = {
    vertexShader: `
    varying vec3 vPosition;
    varying vec3 vNormal;
    varying vec2 vUv;
    uniform float time;
    
    void main() {
        vPosition = position;
        float displacement = sin(position.x * 5.0 + time) * 
                           cos(position.y * 5.0 + time) * 
                           sin(position.z * 5.0 + time) * 0.08;
                           
        displacement += sin(position.x * 10.0 + time * 2.0) * 0.02;
        
        vec3 newPosition = position + normal * displacement;
        vNormal = normalize(normalMatrix * normal);
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
    }`,
    fragmentShader: `
    varying vec3 vPosition;
    varying vec3 vNormal;
    varying vec2 vUv;
    uniform float time;
    uniform vec2 mousePos;
    
    vec3 colorPalette(float t) {
        vec3 a = vec3(0.5, 0.5, 0.5);
        vec3 b = vec3(0.5, 0.5, 0.5);
        vec3 c = vec3(1.0, 1.0, 1.0);
        vec3 d = vec3(0.3, 0.2, 0.2);
        return a + b * cos(6.28318 * (c * t + d));
    }
    
    void main() {
        vec2 center = vec2(0.0, 0.0);
        float distToMouse = length(mousePos - vPosition.xy);
        float mouseInfluence = smoothstep(1.0, 0.0, distToMouse);
        
        float pattern = sin(vPosition.x * 3.0 + time) * 
                       cos(vPosition.y * 3.0 + time) * 
                       sin(vPosition.z * 3.0 + time);
                       
        pattern += mouseInfluence * 2.0;
        
        float colorIndex = pattern * 0.5 + 0.5;
        vec3 baseColor = mix(
            vec3(0.1, 0.4, 1.0),
            vec3(1.0, 0.2, 0.5),
            colorIndex
        );
        
        float fresnel = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 4.0);
        vec3 finalColor = mix(baseColor, vec3(1.0), fresnel);
        
        float pulse = sin(time * 2.0 - length(vPosition) * 3.0) * 0.5 + 0.5;
        pulse += sin(time * 4.0 - length(vPosition) * 6.0) * 0.25;
        finalColor += vec3(1.0, 0.5, 0.2) * pulse * 0.4;
        
        gl_FragColor = vec4(finalColor, 0.95);
    }`
};

const enhancedRingShader = {
    vertexShader: `
    varying vec2 vUv;
    varying vec3 vPos;
    uniform float time;
    
    void main() {
        vUv = uv;
        vPos = position;
        vec3 pos = position;
        float angle = atan(position.y, position.x);
        float spiralIntensity = sin(angle * 8.0 + time * 2.0) * 0.02;
        pos.z += spiralIntensity;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }`,
    fragmentShader: `
    varying vec2 vUv;
    varying vec3 vPos;
    uniform float time;
    uniform vec3 color;
    uniform float radius;
    
    void main() {
        float angle = atan(vPos.y, vPos.x);
        float energyWave = sin(angle * 16.0 - time * 4.0) * 0.5 + 0.5;
        energyWave *= sin(angle * 8.0 + time * 2.0) * 0.5 + 0.5;
        float shimmer = sin(vUv.x * 40.0 + time * 3.0) * 0.5 + 0.5;
        shimmer *= sin(angle * 20.0 - time * 5.0) * 0.5 + 0.5;
        vec3 finalColor = mix(color, vec3(1.0), shimmer * 0.6);
        finalColor += vec3(0.2, 0.4, 1.0) * energyWave * 0.3;
        float glow = smoothstep(0.5, 0.0, abs(vUv.y - 0.5)) * 0.8;
        gl_FragColor = vec4(finalColor, (energyWave * 0.6 + glow * 0.4) * 0.8);
    }`
};

// --- Components ---

const Core = () => {
    const mesh = useRef()
    const material = useRef()
    const { camera, raycaster } = useThree()
    const interactionPlane = useMemo(() => new THREE.Plane(new THREE.Vector3(0, 0, 1), 0), [])
    const intersectPoint = useMemo(() => new THREE.Vector3(), [])
    const mouseRef = useRef(new THREE.Vector2(0, 0))

    useEffect(() => {
        const handleMouseMove = (event) => {
            mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1
            mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1
        }
        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [])

    useFrame((state) => {
        const time = state.clock.getElapsedTime()

        if (mesh.current) {
            mesh.current.rotation.y = time * 0.2
            mesh.current.rotation.z = time * 0.1
        }

        if (material.current) {
            material.current.uniforms.time.value = time

            // Mouse interaction
            raycaster.setFromCamera(mouseRef.current, camera)
            raycaster.ray.intersectPlane(interactionPlane, intersectPoint)
            material.current.uniforms.mousePos.value.set(intersectPoint.x, intersectPoint.y)
        }
    })

    const uniforms = useMemo(() => ({
        time: { value: 0 },
        mousePos: { value: new THREE.Vector2(0, 0) }
    }), [])

    return (
        <mesh ref={mesh}>
            <icosahedronGeometry args={[1, 32]} />
            <shaderMaterial
                ref={material}
                uniforms={uniforms}
                vertexShader={coreShader.vertexShader}
                fragmentShader={coreShader.fragmentShader}
                transparent={true}
                blending={THREE.AdditiveBlending}
            />
        </mesh>
    )
}

const Rings = () => {
    const ringConfigs = useMemo(() => [
        { radius: 1.6, width: 0.04, color: new THREE.Vector3(0.0, 0.5, 1.0), speed: 0.4 },
        { radius: 2.1, width: 0.02, color: new THREE.Vector3(0.2, 0.8, 1.0), speed: -0.3 },
        { radius: 2.4, width: 0.06, color: new THREE.Vector3(1.0, 0.2, 0.5), speed: 0.2 }
    ], [])

    return (
        <group>
            {ringConfigs.map((config, index) => (
                <Ring key={index} config={config} />
            ))}
        </group>
    )
}

const Ring = ({ config }) => {
    const group = useRef()
    const mainMat = useRef()
    const energyMat = useRef()

    const segments = Math.floor(config.radius * 180)

    const uniforms = useMemo(() => ({
        time: { value: 0 },
        color: { value: config.color },
        radius: { value: config.radius }
    }), [config.color, config.radius])

    useFrame((state) => {
        const time = state.clock.getElapsedTime()

        if (group.current) {
            group.current.rotation.x = Math.PI * 0.5 + Math.sin(time * 0.5) * 0.05
            group.current.rotation.y = time * config.speed
            group.current.rotation.z = Math.sin(time * 0.3) * 0.05
        }

        if (mainMat.current) mainMat.current.uniforms.time.value = time
        if (energyMat.current) energyMat.current.uniforms.time.value = time
    })

    return (
        <group ref={group}>
            {/* Main Ring */}
            <mesh>
                <torusGeometry args={[config.radius, config.width, 16, segments]} />
                <shaderMaterial
                    ref={mainMat}
                    uniforms={uniforms}
                    vertexShader={enhancedRingShader.vertexShader}
                    fragmentShader={enhancedRingShader.fragmentShader}
                    transparent={true}
                    blending={THREE.AdditiveBlending}
                    depthWrite={false}
                    side={THREE.DoubleSide}
                />
            </mesh>
            {/* Energy Ring */}
            <mesh rotation={[Math.PI * 0.01, 0, 0]}>
                <torusGeometry args={[config.radius * 1.001, config.width * 0.5, 16, segments]} />
                <shaderMaterial
                    ref={energyMat}
                    uniforms={uniforms} // Share uniforms? Clone logic from original used clone(), but here we can share or recreate. Sharing is fine as they are same values.
                    vertexShader={enhancedRingShader.vertexShader}
                    fragmentShader={enhancedRingShader.fragmentShader}
                    transparent={true}
                    blending={THREE.AdditiveBlending}
                    depthWrite={false}
                    side={THREE.DoubleSide}
                />
            </mesh>
        </group>
    )
}

const Particles = () => {
    const points = useRef()

    const { positions, sizes } = useMemo(() => {
        const particlesCount = 2000
        const positions = new Float32Array(particlesCount * 3)
        const sizes = new Float32Array(particlesCount)

        for (let i = 0; i < particlesCount * 3; i += 3) {
            const angle = Math.random() * Math.PI * 2
            const radius = 1.5 + Math.random() * 5
            const height = (Math.random() - 0.5) * 3

            positions[i] = Math.cos(angle) * radius
            positions[i + 1] = height
            positions[i + 2] = Math.sin(angle) * radius

            sizes[i / 3] = Math.random() * 0.02 + 0.01
        }
        return { positions, sizes }
    }, [])

    useFrame((state) => {
        const time = state.clock.getElapsedTime()
        if (points.current) {
            points.current.rotation.y = time * 0.05

            const posAttr = points.current.geometry.attributes.position
            const array = posAttr.array

            // Note: Mutating buffer directly in loop is expensive if done per-frame for all points, 
            // but original code does it.
            // Original: 
            // for(let i = 0; i < positions.length; i += 3) {
            //     positions[i + 1] += Math.sin(time + i) * 0.0005;
            // }
            // Since we need to preserve the base height, simple += will make them drift indefinitely?
            // Wait, original code: positions[i + 1] += Math.sin(time + i) * 0.0005;
            // Yes, it adds to the current value. Since sin oscillates, it might drift or just wiggle.
            // But 'i' is index, so 'time + i' is shifting phase.
            // Let's replicate exact behavior.

            for (let i = 0; i < array.length; i += 3) {
                array[i + 1] += Math.sin(time + i) * 0.0005
            }
            posAttr.needsUpdate = true
        }
    })

    return (
        <points ref={points}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={positions.length / 3}
                    array={positions}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-size"
                    count={sizes.length}
                    array={sizes}
                    itemSize={1}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.02}
                sizeAttenuation={true}
                color={0x88ccff}
                transparent={true}
                opacity={0.6}
                blending={THREE.AdditiveBlending}
            />
        </points>
    )
}

const MovingLights = () => {
    const lightsRef = useRef([])

    // Initial setup for refs
    useEffect(() => {
        lightsRef.current = lightsRef.current.slice(0, 4)
    }, [])

    useFrame((state) => {
        const time = state.clock.getElapsedTime()

        lightsRef.current.forEach((light, i) => {
            if (!light) return
            const angle = time * 0.3 + (i * Math.PI * 2 / 4)
            const radius = 4 + Math.sin(time * 0.5 + i) * 0.5

            light.position.x = Math.cos(angle) * radius
            light.position.y = Math.sin(angle) * radius
            light.position.z = 2 + Math.sin(time * 0.3 + i)
            light.intensity = 1.5 + Math.sin(time * 0.5 + i) * 0.3
        })
    })

    const colors = [0x4444ff, 0xff4444, 0x44ffff, 0xff44ff]

    return (
        <group>
            <ambientLight intensity={0.5} color="#112233" />
            {colors.map((color, i) => (
                <pointLight
                    key={i}
                    ref={el => lightsRef.current[i] = el}
                    color={color}
                    distance={10}
                    decay={2}
                />
            ))}
        </group>
    )
}

const CoreEffect = () => {
    const { camera, size, controls } = useThree()
    
    useEffect(() => {
        // Simple responsive logic based on canvas width
        // Assuming standard md breakpoint is around 768px
        const isDesktop = size.width > 768
        
        if (isDesktop) {
            // Use view offset to shift the center of projection to the right
            // We pretend the screen is wider (1.4x) and we are viewing the left part
            // The optical center (0,0,0) will then appear at 70% of our screen width (0.5 * 1.4 = 0.7)
            // This allows us to keep the rotation center at (0,0,0) while visually shifting the object
            camera.setViewOffset(size.width * 1.4, size.height, 0, 0, size.width, size.height)
            camera.position.set(0, 0, 5.5)
        } else {
            camera.clearViewOffset()
            camera.position.set(0, 0, 6.5)
        }
        
        if (controls) {
            controls.target.set(0, 0, 0)
            controls.update()
        }
    }, [camera, size.width, size.height, controls])

    // Scale up the content on desktop
    const isDesktop = size.width > 768
    const contentScale = isDesktop ? 1.08 : 0.9

    return (
        <group scale={contentScale}>
            <Core />
            <Rings />
            {/* <Particles /> */}
            <MovingLights />
        </group>
    )
}

export default CoreEffect
