import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import avatarImg from '../../assets/avatar.jpg'

const Navbar = ({ activeSection }) => {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  // 监听滚动事件以改变导航栏样式
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [scrolled])

  // 导航链接
  const navLinks = [
    { name: '首页', id: 'hero' },
    { name: '关于', id: 'about' },
    { name: '项目', id: 'projects' },
    { name: '技能', id: 'skills' },
    { name: '联系', id: 'contact' },
  ]

  // 平滑滚动到指定部分
  const scrollToSection = (id) => {
    setMenuOpen(false)
    const element = document.getElementById(id)
    if (element) {
      const yOffset = -80 // 导航栏高度的偏移量
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'py-3 bg-primary/90 backdrop-blur-md shadow-lg' : 'py-5 bg-transparent'}`}
    >
      <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
        {/* Logo Area (Empty) */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center min-w-[40px]"
        >
          {/* Logo removed per user request */}
        </motion.div>

        <div className="flex items-center gap-4 md:gap-8">
          {/* 桌面导航 */}
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              {navLinks.map((link, index) => (
                <motion.li
                  key={link.id}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <a
                    href={`#${link.id}`}
                    onClick={(e) => {
                      e.preventDefault()
                      scrollToSection(link.id)
                    }}
                    className={`relative font-mono text-sm hover:text-secondary transition-colors duration-300 ${activeSection === link.id ? 'text-secondary' : 'text-light'}`}
                  >
                    {link.name}
                    {activeSection === link.id && (
                      <motion.span
                        className="absolute -bottom-1 left-0 w-full h-0.5 bg-secondary"
                        layoutId="navbar-underline"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                  </a>
                </motion.li>
              ))}
            </ul>
          </nav>

          {/* 头像 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center"
          >
            <div className="w-10 h-10 rounded-full border-2 border-secondary overflow-hidden shadow-[0_0_10px_rgba(6,182,212,0.5)]">
              <img
                src={avatarImg}
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* 移动端菜单按钮 */}
          <button
            className="md:hidden text-light hover:text-secondary transition-colors duration-300"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* 移动端菜单 */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 top-[70px] bg-primary/95 backdrop-blur-md z-40 md:hidden"
            >
              <nav className="flex flex-col items-center justify-center h-full">
                <ul className="flex flex-col space-y-8 text-center">
                  {navLinks.map((link, index) => (
                    <motion.li
                      key={link.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <a
                        href={`#${link.id}`}
                        onClick={(e) => {
                          e.preventDefault()
                          scrollToSection(link.id)
                        }}
                        className={`text-xl font-mono hover:text-secondary transition-colors duration-300 ${activeSection === link.id ? 'text-secondary' : 'text-light'}`}
                      >
                        {link.name}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}

export default Navbar