import React, { Suspense, useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'
import * as THREE from 'three'
import CoreEffect from '../3d/CoreEffect'
import { getLocation } from '../../utils/location'

const RotatingStars = () => {
  const ref = useRef()
  useFrame((state, delta) => {
    ref.current.rotation.y += delta / 10
    ref.current.rotation.x -= delta / 15
  })
  return (
    <group ref={ref}>
      {/* Layer 1: Slow pulsing background stars */}
      <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
      {/* Layer 2: Medium active stars */}
      <Stars radius={100} depth={50} count={2000} factor={6} saturation={0} fade speed={3} />
      {/* Layer 3: Fast twinkling bright stars */}
      <Stars radius={100} depth={50} count={1000} factor={8} saturation={0} fade speed={6} />
    </group>
  )
}

const DecryptText = ({ targetText, startDelay = 0 }) => {
  const [displayText, setDisplayText] = useState("")
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#@%&"

  useEffect(() => {
    let interval
    let iteration = 0

    const startAnimation = () => {
      interval = setInterval(() => {
        setDisplayText(prev =>
          targetText
            .split("")
            .map((char, index) => {
              if (index < iteration) return targetText[index]
              return chars[Math.floor(Math.random() * chars.length)]
            })
            .join("")
        )

        if (iteration >= targetText.length) {
          clearInterval(interval)
        }

        iteration += 1 / 3 // Slow down the reveal
      }, 30)
    }

    const timer = setTimeout(startAnimation, startDelay)
    return () => {
      clearTimeout(timer)
      clearInterval(interval)
    }
  }, [targetText, startDelay])

  return <span>{displayText}</span>
}

const CoordinatesDisplay = () => {
  const [status, setStatus] = useState("searching") // searching, locking, locked, error
  const [coords, setCoords] = useState("")

  useEffect(() => {
    // Artificial delay for "SEARCHING" phase
    const searchTimer = setTimeout(() => {
      getLocation()
        .then(({ lat, long }) => {
          const latDir = lat >= 0 ? 'N' : 'S'
          const longDir = long >= 0 ? 'E' : 'W'
          setCoords(`COORDS: ${Math.abs(lat).toFixed(2)}°${latDir}, ${Math.abs(long).toFixed(2)}°${longDir}`)
          setStatus("locking")

          // Transition to locked state after "locking" animation
          // Text "LINK ESTABLISHED..." is ~19 chars.
          // Animation speed: 30ms * 3 ticks/char = 90ms/char.
          // Animation duration: ~1.7s.
          // Pause duration: 1.5s.
          // Total delay: ~3200ms.
          setTimeout(() => setStatus("locked"), 3500)
        })
        .catch(err => {
          console.error("Location fetch failed:", err)
          setStatus("error")
        })
    }, 1500)

    return () => clearTimeout(searchTimer)
  }, [])

  if (status === "error") {
    return (
      <span className="text-sm text-red-500 font-mono tracking-widest animate-pulse">
        ⚠ LOCATION SCAN FAILED
      </span>
    )
  }

  if (status === "searching") {
    return (
      <span className="text-sm text-cyan-400/60 font-mono tracking-widest animate-pulse">
        SEARCHING SIGNAL...
      </span>
    )
  }

  if (status === "locking") {
    return (
      <span className="text-sm text-cyan-400 font-mono tracking-widest">
        <DecryptText targetText="LINK ESTABLISHED..." />
      </span>
    )
  }

  return (
    <span className="text-sm text-cyan-400/80 font-mono tracking-widest">
      <DecryptText targetText={coords} />
    </span>
  )
}

const SciFiFrame = ({ children, className = "" }) => {
  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`relative p-6 md:p-10 ${className}`}
    >
      {/* Background with blur and subtle gradient */}
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm border border-cyan-500/30 rounded-lg overflow-hidden clip-path-polygon">
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />

        {/* Scanning line animation */}
        <motion.div
          animate={{ top: ["0%", "100%", "0%"] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent shadow-[0_0_15px_rgba(6,182,212,0.2)]"
        />
      </div>

      {/* Corner Accents */}
      <div className="absolute -top-1 -left-1 w-6 h-6 border-l-2 border-t-2 border-cyan-400 rounded-tl-sm shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
      <div className="absolute -top-1 -right-1 w-6 h-6 border-r-2 border-t-2 border-cyan-400 rounded-tr-sm shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
      <div className="absolute -bottom-1 -left-1 w-6 h-6 border-l-2 border-b-2 border-cyan-400 rounded-bl-sm shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
      <div className="absolute -bottom-1 -right-1 w-6 h-6 border-r-2 border-b-2 border-cyan-400 rounded-br-sm shadow-[0_0_10px_rgba(34,211,238,0.5)]" />

      {/* Tech Labels */}
      <div className="absolute top-3 right-5 flex items-center gap-2">
        <div className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_5px_rgba(34,211,238,1)]" />
        <span className="text-[10px] text-cyan-400/80 font-mono tracking-widest uppercase">Identity_Core::Active</span>
      </div>

      <div className="absolute bottom-3 left-0 right-0 flex justify-center items-center">
        <CoordinatesDisplay />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  )
}

const Hero = () => {
  return (
    <section id="hero" className="h-screen flex items-center overflow-hidden select-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#112240] via-[#0a192f] to-[#020c1b]">
      {/* 3D Background - Static Stars */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 1] }}>
          <RotatingStars />
        </Canvas>
      </div>

      {/* 3D Foreground - Interactive Planet */}
      <div className="absolute inset-0 z-0">
        <Canvas
          dpr={[1, 2]}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.2
          }}
        >
          <Suspense fallback={null}>
            <CoreEffect />
            <OrbitControls
              makeDefault
              enableZoom={false}
              enablePan={false}
              enableDamping={true}
              dampingFactor={0.05}
              maxDistance={20}
              minDistance={3}
            />
          </Suspense>
        </Canvas>
      </div>

      {/* 内容 */}
      <div className="container mx-auto px-4 md:px-8 z-10 mt-16 pointer-events-none grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="pointer-events-auto max-w-2xl">
          <SciFiFrame>

            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-2xl md:text-4xl lg:text-5xl font-bold font-mono mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-500 drop-shadow-[0_0_15px_rgba(6,182,212,0.6)] tracking-wider"
            >
              Jacky Zhou | 周同学
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-2xl md:text-4xl lg:text-5xl font-bold mb-6 text-slate-300"
            >
              我打造<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">数字世界</span>的未来
            </motion.h2>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="relative"
            >
              <p className="text-slate-400 max-w-xl mb-10 text-base md:text-lg leading-relaxed border-l-2 border-cyan-500/30 pl-4">
                我是一名全栈开发者，专注于创建优雅、高效且用户友好的数字体验。
                我的技术栈包括前端、后端和人工智能，致力于将创新想法转化为现实。
              </p>
            </motion.div>
          </SciFiFrame>
        </div>

        {/* Right side spacer for 3D element */}
        <div className="hidden lg:block h-full"></div>
      </div>
    </section>
  )
}

export default Hero