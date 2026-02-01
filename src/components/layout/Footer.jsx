import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaEnvelope } from 'react-icons/fa'
import xIcon from '../../assets/icons/social-media/X.svg'
import githubIcon from '../../assets/icons/social-media/github.svg'
import rednoteIcon from '../../assets/icons/social-media/rednote.svg'
import steamIcon from '../../assets/icons/social-media/steam.svg'
import tiktokIcon from '../../assets/icons/social-media/tiktok.svg'

const Footer = () => {
  const [copySuccess, setCopySuccess] = useState(false)

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('jackyzhou0227@foxmail.com')
    setCopySuccess(true)
    setTimeout(() => setCopySuccess(false), 600)
  }

  const socialLinks = [
    { name: 'GitHub', icon: githubIcon, url: 'https://github.com/JackyZhou0227', invert: false },
    { name: 'X', icon: xIcon, url: 'https://x.com/JackyZhou0227', invert: false },
    { name: 'Steam', icon: steamIcon, url: 'https://steamcommunity.com/profiles/76561199028359241/', invert: true },
    { name: 'TikTok', icon: tiktokIcon, url: 'https://www.douyin.com/user/MS4wLjABAAAAzfZTBpLTUjNyFzPpdpLdQPAGmFQY-nU6yu-FLNKsCI6OdNV9R2A3KxOd3qZyzxOv', invert: false },
    { name: 'RedNote', icon: rednoteIcon, url: 'https://www.xiaohongshu.com/user/profile/5f1846ed0000000001000c54', invert: false },
  ]

  return (
    <footer className="bg-dark py-8">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col items-center">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <a href="#hero" className="text-xl font-mono font-bold text-secondary">
              &lt;Code. Create. Repeat. /&gt;
            </a>
          </motion.div>

          {/* 社交媒体图标 (替换原导航链接) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-8 mb-8"
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
                    className="absolute bottom-full mb-3 left-1/2 whitespace-nowrap bg-white text-primary text-xs px-3 py-1 rounded-full font-chinese font-bold shadow-lg z-50"
                  >
                    复制成功
                  </motion.div>
                )}
              </AnimatePresence>
              <motion.button
                onClick={handleCopyEmail}
                className="w-8 h-8 relative group flex items-center justify-center"
                whileHover={{ y: -5, scale: 1.1 }}
              >
                <FaEnvelope className="w-full h-full text-white opacity-60 group-hover:opacity-100 group-hover:text-secondary group-hover:drop-shadow-[0_0_5px_rgba(6,182,212,0.8)] transition-all duration-300" />
              </motion.button>
            </div>

            {socialLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 relative group"
                whileHover={{ y: -5, scale: 1.1 }}
              >
                <img
                  src={link.icon}
                  alt={link.name}
                  className={`w-full h-full object-contain opacity-60 group-hover:opacity-100 group-hover:drop-shadow-[0_0_5px_rgba(6,182,212,0.8)] transition-all duration-300 ${link.invert ? 'filter invert' : ''}`}
                />
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
