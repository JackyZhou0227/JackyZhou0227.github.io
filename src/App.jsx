import { useState, useEffect, Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa'
import './App.css'

// Layout Components
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'

// Section Components
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Projects from './components/sections/Projects'
import Skills from './components/sections/Skills'
import Contact from './components/sections/Contact'

function App() {
  const [loading, setLoading] = useState(true)
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    // 模拟加载过程
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  // 监听滚动以更新当前活动部分
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section')
      const scrollPosition = window.scrollY + 300

      sections.forEach(section => {
        const sectionTop = section.offsetTop
        const sectionHeight = section.offsetHeight
        const sectionId = section.getAttribute('id')

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(sectionId)
        }
      })
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (loading) {
    return (
      <div className="fixed inset-0 bg-primary flex items-center justify-center z-50">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <motion.div
            className="w-24 h-24 border-4 border-t-secondary rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
          <motion.h2
            className="mt-6 text-2xl font-mono text-secondary"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Loading...
          </motion.h2>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen bg-primary overflow-x-hidden">

      {/* Content */}
      <div className="relative z-10">
        <Navbar activeSection={activeSection} />

        <main>
          <Hero />
          <About />
          <Projects />
          <Skills />
          <Contact />
        </main>

        <Footer />




      </div>
    </div>
  )
}

export default App
