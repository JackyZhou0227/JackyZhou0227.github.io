import { useRef, useEffect, useCallback } from 'react'
import { gsap } from 'gsap'
import { usePagination, PaginationContext } from '../../hooks/usePagination'
import PageIndicator from './PageIndicator'
import Navbar from '../layout/Navbar'
import './transitions.css'

// 页面配置，新增页面只需在此添加
const PAGE_CONFIG = [
    { id: 'hero', name: '首页' },
    { id: 'about', name: '关于' },
    { id: 'projects', name: '项目' },
    { id: 'skills', name: '技能' },
    { id: 'contact', name: '联系' },
]

/**
 * 翻页容器组件
 * @param {ReactNode} children - 页面组件数组
 */
function PageContainer({ children }) {
    const pagesRef = useRef([])
    const containerRef = useRef(null)
    const effectContainerRef = useRef(null)

    const pagination = usePagination(PAGE_CONFIG.length)
    const { currentPage, targetPage, isAnimating, transitionType, direction, setCurrentPage, setIsAnimating } = pagination

    // 执行翻页动画
    const executeTransition = useCallback((fromIndex, toIndex, type, dir) => {
        const currentEl = pagesRef.current[fromIndex]
        const nextEl = pagesRef.current[toIndex]
        const effectContainer = effectContainerRef.current

        if (!currentEl || !nextEl) {
            setIsAnimating(false)
            setCurrentPage(toIndex)
            return
        }

        const tl = gsap.timeline({
            onComplete: () => {
                // 动画完成后清理样式
                gsap.set([currentEl, nextEl], { clearProps: 'all' })
                // 确保当前页面显示
                pagesRef.current.forEach((page, i) => {
                    if (page) {
                        page.style.opacity = i === toIndex ? '1' : '0'
                        page.style.pointerEvents = i === toIndex ? 'auto' : 'none'
                        page.style.zIndex = i === toIndex ? '10' : String(i)
                    }
                })
                setCurrentPage(toIndex)
                setIsAnimating(false)
                // 清理特效容器
                if (effectContainer) {
                    effectContainer.innerHTML = ''
                }
            }
        })

        // 确保下一页可见以便动画
        gsap.set(nextEl, { opacity: 1, zIndex: 10 })

        switch (type) {
            case '3d-flip':
                execute3DFlip(tl, currentEl, nextEl, dir)
                break
            case 'particle':
                executeParticle(tl, currentEl, nextEl, effectContainer)
                break
            case 'wormhole':
                executeWormhole(tl, currentEl, nextEl, dir, effectContainer)
                break
            case 'scanline':
                executeScanline(tl, currentEl, nextEl, effectContainer)
                break
            case 'shutter':
                executeShutter(tl, currentEl, nextEl, effectContainer)
                break
            default:
                // 默认淡入淡出
                tl.to(currentEl, { opacity: 0, duration: 0.5 }, 0)
                tl.to(nextEl, { opacity: 1, duration: 0.5 }, 0.3)
        }
    }, [setCurrentPage, setIsAnimating])

    // 3D翻转特效
    const execute3DFlip = (tl, currentEl, nextEl, dir) => {
        gsap.set(nextEl, {
            rotateY: dir === 'next' ? 90 : -90,
            zIndex: 10
        })

        tl.to(currentEl, {
            rotateY: dir === 'next' ? -90 : 90,
            duration: 0.8,
            ease: 'power3.inOut'
        }, 0)

        tl.to(nextEl, {
            rotateY: 0,
            duration: 0.8,
            ease: 'power3.inOut'
        }, 0)
    }

    // 粒子特效
    const executeParticle = (tl, currentEl, nextEl, effectContainer) => {
        // 创建粒子
        const particles = []
        for (let i = 0; i < 100; i++) {
            const particle = document.createElement('div')
            particle.className = 'particle'
            particle.style.left = `${Math.random() * 100}%`
            particle.style.top = `${Math.random() * 100}%`
            particle.style.opacity = `${Math.random()}`
            effectContainer.appendChild(particle)
            particles.push(particle)

            // 粒子动画
            gsap.to(particle, {
                x: (Math.random() - 0.5) * 500,
                y: (Math.random() - 0.5) * 500,
                opacity: 0,
                duration: 1 + Math.random(),
                ease: 'power2.out',
                onComplete: () => particle.remove()
            })
        }

        // 页面切换动画
        tl.to(currentEl, {
            scale: 0.8,
            opacity: 0,
            duration: 0.6,
            ease: 'power2.in'
        }, 0)

        tl.fromTo(nextEl,
            { scale: 1.2, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.6, ease: 'power2.out' },
            0.4
        )
    }

    // 虫洞特效
    const executeWormhole = (tl, currentEl, nextEl, dir, effectContainer) => {
        // 创建虫洞圆环
        for (let i = 0; i < 8; i++) {
            setTimeout(() => {
                const ring = document.createElement('div')
                ring.className = 'wormhole-ring'
                ring.style.borderColor = i % 2 === 0 ? '#0ff' : '#f0f'
                effectContainer.appendChild(ring)
                setTimeout(() => ring.remove(), 1500)
            }, i * 100)
        }

        // 页面切换动画
        tl.to(currentEl, {
            scale: 0,
            rotate: dir === 'next' ? 180 : -180,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.in'
        }, 0)

        tl.fromTo(nextEl,
            { scale: 3, rotate: dir === 'next' ? -180 : 180, opacity: 0 },
            { scale: 1, rotate: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
            0.3
        )
    }

    // 扫描线特效
    const executeScanline = (tl, currentEl, nextEl, effectContainer) => {
        // 创建扫描线
        const scanline = document.createElement('div')
        scanline.className = 'scanline'
        effectContainer.appendChild(scanline)

        // 扫描线动画
        gsap.fromTo(scanline,
            { top: '-10%' },
            {
                top: '110%',
                duration: 0.8,
                ease: 'power2.inOut',
                onComplete: () => scanline.remove()
            }
        )

        // 页面切换动画
        tl.to(currentEl, {
            filter: 'brightness(2)',
            duration: 0.2
        }, 0)

        tl.to(currentEl, {
            opacity: 0,
            duration: 0.3
        }, 0.4)

        tl.fromTo(nextEl,
            { opacity: 0, filter: 'brightness(2)' },
            { opacity: 1, filter: 'brightness(1)', duration: 0.5 },
            0.5
        )
    }

    // 百叶窗特效
    const executeShutter = (tl, currentEl, nextEl, effectContainer) => {
        // 创建百叶窗条带
        const shutters = []
        for (let i = 0; i < 6; i++) {
            const shutter = document.createElement('div')
            shutter.className = 'shutter-blade'
            shutter.style.top = `${(i / 6) * 100}%`
            shutter.style.height = `${100 / 6}%`
            shutter.style.transform = 'scaleY(0)'
            effectContainer.appendChild(shutter)
            shutters.push(shutter)
        }

        // 关闭百叶窗
        tl.to(shutters, {
            scaleY: 1,
            duration: 0.4,
            ease: 'power3.inOut',
            stagger: 0.05
        }, 0)

        // 在百叶窗关闭时切换页面
        tl.to(currentEl, {
            opacity: 0,
            duration: 0.1
        }, 0.4)

        tl.set(nextEl, { opacity: 1 }, 0.45)

        // 打开百叶窗
        tl.to(shutters, {
            scaleY: 0,
            duration: 0.4,
            ease: 'power3.inOut',
            stagger: 0.05,
            onComplete: () => {
                shutters.forEach(s => s.remove())
            }
        }, 0.5)
    }

    // 当动画状态变化时执行动画
    useEffect(() => {
        if (isAnimating && currentPage !== targetPage) {
            executeTransition(currentPage, targetPage, transitionType, direction)
        }
    }, [isAnimating, targetPage, transitionType, direction, executeTransition, currentPage])

    // 初始化页面状态
    useEffect(() => {
        pagesRef.current.forEach((page, i) => {
            if (page) {
                page.style.opacity = i === 0 ? '1' : '0'
                page.style.pointerEvents = i === 0 ? 'auto' : 'none'
                page.style.zIndex = i === 0 ? '10' : String(i)
            }
        })
    }, [])

    // 将 children 转换为数组
    const pages = Array.isArray(children) ? children : [children]

    return (
        <PaginationContext.Provider value={pagination}>
            {/* 导航栏 - 在 Provider 内部，可访问 Context */}
            <Navbar />

            <div
                ref={containerRef}
                className="page-container"
            >
                {/* 页面层 */}
                {pages.map((child, index) => (
                    <div
                        key={PAGE_CONFIG[index]?.id || index}
                        ref={el => { pagesRef.current[index] = el }}
                        className="page-3d"
                        id={PAGE_CONFIG[index]?.id}
                        style={{
                            position: 'absolute',
                            inset: 0,
                            opacity: index === 0 ? 1 : 0,
                            pointerEvents: index === 0 ? 'auto' : 'none',
                            zIndex: index === 0 ? 10 : index,
                        }}
                    >
                        {child}
                    </div>
                ))}

                {/* 特效层 */}
                <div
                    ref={effectContainerRef}
                    className="effect-container"
                />

                {/* 页面指示器 */}
                <PageIndicator
                    pages={PAGE_CONFIG}
                    currentPage={currentPage}
                    onPageClick={(index) => pagination.goToPage(index)}
                />

                {/* 当前特效类型显示（调试用，可删除） */}
                <div className="transition-indicator">
                    {transitionType.replace('-', ' ').toUpperCase()}
                </div>
            </div>
        </PaginationContext.Provider>
    )
}

export default PageContainer
