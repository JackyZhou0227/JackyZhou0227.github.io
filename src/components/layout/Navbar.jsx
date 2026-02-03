import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaEnvelope } from 'react-icons/fa'
import avatarImg from '../../assets/avatar.jpg'
import { usePaginationContext } from '../../hooks/usePagination'
import xIcon from '../../assets/icons/social-media/X.svg'
import githubIcon from '../../assets/icons/social-media/github.svg'
import rednoteIcon from '../../assets/icons/social-media/rednote.svg'
import steamIcon from '../../assets/icons/social-media/steam.svg'
import tiktokIcon from '../../assets/icons/social-media/tiktok.svg'

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [copySuccess, setCopySuccess] = useState(false)

  // 从 PaginationContext 获取状态和方法
  let pagination = null
  try {
    pagination = usePaginationContext()
  } catch (e) {
    // Context 未就绪时的后备
  }

  const currentPage = pagination?.currentPage ?? 0
  const goToPage = pagination?.goToPage

  // 导航链接
  const navLinks = [
    { name: '首页', id: 'hero', index: 0 },
    { name: '关于', id: 'about', index: 1 },
    { name: '项目', id: 'projects', index: 2 },
    { name: '技能', id: 'skills', index: 3 },
    { name: '联系', id: 'contact', index: 4 },
  ]

  // 社交链接
  const socialLinks = [
    { name: 'GitHub', icon: githubIcon, url: 'https://github.com/JackyZhou0227', invert: false },
    { name: 'X', icon: xIcon, url: 'https://x.com/JackyZhou0227', invert: false },
    { name: 'Steam', icon: steamIcon, url: 'https://steamcommunity.com/profiles/76561199028359241/', invert: true },
    { name: 'TikTok', icon: tiktokIcon, url: 'https://www.douyin.com/user/MS4wLjABAAAAzfZTBpLTUjNyFzPpdpLdQPAGmFQY-nU6yu-FLNKsCI6OdNV9R2A3KxOd3qZyzxOv', invert: false },
    { name: 'RedNote', icon: rednoteIcon, url: 'https://www.xiaohongshu.com/user/profile/5f1846ed0000000001000c54', invert: false },
  ]

  // 跳转到指定页面
  const handleNavClick = (index) => {
    setMenuOpen(false)
    if (goToPage) {
      goToPage(index)
    }
  }

  // 复制邮箱
  const handleCopyEmail = () => {
    navigator.clipboard.writeText('jackyzhou0227@foxmail.com')
    setCopySuccess(true)
    setTimeout(() => setCopySuccess(false), 600)
  }

  return (
    <header
      className="fixed top-0 w-full z-[300] transition-all duration-300 py-3 bg-primary/90 backdrop-blur-md shadow-lg"
    >
      <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
        {/* 左侧: 社交链接 */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="hidden md:flex items-center gap-4"
        >
          {/* 邮箱复制图标 */}
          <div className="relative">
            <AnimatePresence>
              {copySuccess && (
                <motion.div
                  initial={{ opacity: 0, y: 10, x: "-50%" }}
                  animate={{ opacity: 1, y: 0, x: "-50%" }}
                  exit={{ opacity: 0, y: 10, x: "-50%" }}
                  transition={{ duration: 0.2 }}
                  className="absolute bottom-full mb-2 left-1/2 whitespace-nowrap bg-white text-primary text-xs px-2 py-0.5 rounded-full font-chinese font-bold shadow-lg z-50"
                >
                  复制成功
                </motion.div>
              )}
            </AnimatePresence>
            <motion.button
              onClick={handleCopyEmail}
              className="w-5 h-5 relative group flex items-center justify-center"
              whileHover={{ y: -2, scale: 1.1 }}
            >
              <FaEnvelope className="w-full h-full text-white opacity-60 group-hover:opacity-100 group-hover:text-secondary group-hover:drop-shadow-[0_0_5px_rgba(6,182,212,0.8)] transition-all duration-300" />
            </motion.button>
          </div>

          {socialLinks.map((link, index) => (
            <motion.a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-5 h-5 relative group"
              whileHover={{ y: -2, scale: 1.1 }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <img
                src={link.icon}
                alt={link.name}
                className={`w-full h-full object-contain opacity-60 group-hover:opacity-100 group-hover:drop-shadow-[0_0_5px_rgba(6,182,212,0.8)] transition-all duration-300 ${link.invert ? 'filter invert' : ''}`}
              />
            </motion.a>
          ))}
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
                  <button
                    onClick={() => handleNavClick(link.index)}
                    className={`relative font-mono text-sm hover:text-secondary transition-colors duration-300 ${currentPage === link.index ? 'text-secondary' : 'text-light'}`}
                  >
                    {link.name}
                    {currentPage === link.index && (
                      <motion.span
                        className="absolute -bottom-1 left-0 w-full h-0.5 bg-secondary"
                        layoutId="navbar-underline"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                  </button>
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
                {/* 移动端社交链接 */}
                <div className="flex gap-6 mb-8">
                  <button
                    onClick={handleCopyEmail}
                    className="w-6 h-6 relative group"
                  >
                    <FaEnvelope className="w-full h-full text-white opacity-60 group-hover:opacity-100 group-hover:text-secondary transition-all duration-300" />
                  </button>
                  {socialLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-6 h-6 relative group"
                    >
                      <img
                        src={link.icon}
                        alt={link.name}
                        className={`w-full h-full object-contain opacity-60 group-hover:opacity-100 transition-all duration-300 ${link.invert ? 'filter invert' : ''}`}
                      />
                    </a>
                  ))}
                </div>

                <ul className="flex flex-col space-y-8 text-center">
                  {navLinks.map((link, index) => (
                    <motion.li
                      key={link.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <button
                        onClick={() => handleNavClick(link.index)}
                        className={`text-xl font-mono hover:text-secondary transition-colors duration-300 ${currentPage === link.index ? 'text-secondary' : 'text-light'}`}
                      >
                        {link.name}
                      </button>
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
