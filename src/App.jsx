import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import './App.css'

// Pagination System
import PageContainer from './components/pagination/PageContainer'

// Section Components
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Projects from './components/sections/Projects'
import Skills from './components/sections/Skills'
import Contact from './components/sections/Contact'

function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 模拟加载过程
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
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
    <PageContainer>
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Contact />
    </PageContainer>
  )
}

export default App
