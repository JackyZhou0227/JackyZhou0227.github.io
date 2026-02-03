import { useState, useCallback, useEffect, createContext, useContext } from 'react'

// 首页专用特效
const HERO_TRANSITION = 'wormhole'

// 其他页面循环使用的特效
const OTHER_TRANSITIONS = ['particle', '3d-flip', 'scanline', 'shutter']

// 创建 Context 供 Navbar 等组件使用
export const PaginationContext = createContext(null)

export const usePaginationContext = () => {
    const context = useContext(PaginationContext)
    if (!context) {
        throw new Error('usePaginationContext must be used within PaginationProvider')
    }
    return context
}

/**
 * 翻页状态管理 Hook
 * @param {number} totalPages - 总页数
 * @returns {object} 翻页状态和控制方法
 */
export function usePagination(totalPages) {
    const [currentPage, setCurrentPage] = useState(0)
    const [targetPage, setTargetPage] = useState(0) // 目标页面
    const [isAnimating, setIsAnimating] = useState(false)
    const [transitionType, setTransitionType] = useState(HERO_TRANSITION)
    const [direction, setDirection] = useState('next')

    // 获取目标页面的特效类型
    // 首页(index=0)固定使用 wormhole，其他页面循环使用其他4种特效
    const getTransitionType = useCallback((pageIndex) => {
        if (pageIndex === 0) {
            return HERO_TRANSITION
        }
        // 非首页：使用 pageIndex-1 作为索引，循环使用其他4种特效
        return OTHER_TRANSITIONS[(pageIndex - 1) % OTHER_TRANSITIONS.length]
    }, [])

    // 跳转到指定页面
    const goToPage = useCallback((targetIndex, animationDuration = 1000) => {
        if (isAnimating) return false
        if (targetIndex < 0 || targetIndex >= totalPages) return false
        if (targetIndex === currentPage) return false

        const newDirection = targetIndex > currentPage ? 'next' : 'prev'
        const newTransitionType = getTransitionType(targetIndex)

        setDirection(newDirection)
        setTransitionType(newTransitionType)
        setTargetPage(targetIndex) // 设置目标页面
        setIsAnimating(true)

        return true
    }, [currentPage, isAnimating, totalPages, getTransitionType])

    // 下一页
    const goNext = useCallback((animationDuration = 1000) => {
        return goToPage(currentPage + 1, animationDuration)
    }, [currentPage, goToPage])

    // 上一页
    const goPrev = useCallback((animationDuration = 1000) => {
        return goToPage(currentPage - 1, animationDuration)
    }, [currentPage, goToPage])

    // 键盘导航
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (isAnimating) return

            switch (e.key) {
                case 'ArrowDown':
                case 'ArrowRight':
                case ' ':
                    e.preventDefault()
                    goNext()
                    break
                case 'ArrowUp':
                case 'ArrowLeft':
                    e.preventDefault()
                    goPrev()
                    break
                case 'Home':
                    e.preventDefault()
                    goToPage(0)
                    break
                case 'End':
                    e.preventDefault()
                    goToPage(totalPages - 1)
                    break
                default:
                    break
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [isAnimating, goNext, goPrev, goToPage, totalPages])

    // 滚轮导航（带防抖）
    useEffect(() => {
        let lastWheelTime = 0
        const WHEEL_DEBOUNCE = 1000 // 1秒防抖

        const handleWheel = (e) => {
            const now = Date.now()
            if (now - lastWheelTime < WHEEL_DEBOUNCE) return
            if (isAnimating) return

            lastWheelTime = now

            if (e.deltaY > 0) {
                goNext()
            } else if (e.deltaY < 0) {
                goPrev()
            }
        }

        window.addEventListener('wheel', handleWheel, { passive: true })
        return () => window.removeEventListener('wheel', handleWheel)
    }, [isAnimating, goNext, goPrev])

    // 触摸导航
    useEffect(() => {
        let touchStartY = 0
        const TOUCH_THRESHOLD = 50 // 50px 阈值

        const handleTouchStart = (e) => {
            touchStartY = e.touches[0].clientY
        }

        const handleTouchEnd = (e) => {
            if (isAnimating) return

            const touchEndY = e.changedTouches[0].clientY
            const diff = touchStartY - touchEndY

            if (Math.abs(diff) > TOUCH_THRESHOLD) {
                if (diff > 0) {
                    goNext()
                } else {
                    goPrev()
                }
            }
        }

        window.addEventListener('touchstart', handleTouchStart, { passive: true })
        window.addEventListener('touchend', handleTouchEnd, { passive: true })

        return () => {
            window.removeEventListener('touchstart', handleTouchStart)
            window.removeEventListener('touchend', handleTouchEnd)
        }
    }, [isAnimating, goNext, goPrev])

    return {
        currentPage,
        targetPage, // 目标页面
        totalPages,
        isAnimating,
        transitionType,
        direction,
        goToPage,
        goNext,
        goPrev,
        getTransitionType,
        setCurrentPage, // 供动画完成后直接设置
        setIsAnimating, // 供动画控制
    }
}

export default usePagination
