import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'
import spaceStationIcon from '../../assets/icons/universe/space-station.svg'

const Projects = () => {
  const [activeTab, setActiveTab] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [hoveredDesc, setHoveredDesc] = useState(null)
  const itemsPerPage = 6

  // 项目数据
  const projects = [
    {
      id: 1,
      title: 'AI塔罗助手',
      description: 'TarotHelper 是一个用于塔罗牌占卜的工具，通过大语言模型的语义理解能力进行占卜，旨在帮助用户快速查阅每一张牌的含义和关键词，用户可以将AI的占卜结果作为参考，进而更加专注于分析解决问题，从而节约时间。',
      image: 'tarot-helper.svg',
      technologies: ['Java', 'React', 'Spring AI', 'Ollama'],
      github: 'https://github.com/JackyZhou0227/tarot-helper',
      live: '',
      category: 'ai'
    },
    {
      id: 2,
      title: 'CareCode',
      description: 'A comprehensive Hospital Information Management System serving over 40 healthcare institutions since 2004. This open-source solution provides modules for all aspects of hospital management, from patient care to administrative functions.',
      image: '', // 占位图片名称
      technologies: ['Java EE', 'Mysql'],
      github: 'https://github.com/hmislk/hmis',
      live: 'https://github.com/hmislk/hmis/commits?author=JackyZhou0227',
      category: 'web'
    },
    {
      id: 3,
      title: '这是一个占位项目',
      description: '我一定会充实自己的项目经历的！！！',
      image: '', // 占位图片名称
      technologies: ['React', 'D3.js', 'Firebase', 'Tailwind CSS'],
      github: '',
      live: '',
      category: 'data'
    },
    {
      id: 4,
      title: '这是一个占位项目',
      description: '我一定会充实自己的项目经历的！！！',
      image: '', // 占位图片名称
      technologies: ['React', 'D3.js', 'Firebase', 'Tailwind CSS'],
      github: '',
      live: '',
      category: 'mobile'
    },
    {
      id: 5,
      title: '这是一个占位项目',
      description: '我一定会充实自己的项目经历的！！！',
      image: '', // 占位图片名称
      technologies: ['React', 'D3.js', 'Firebase', 'Tailwind CSS'],
      github: '',
      live: '',
      category: 'ai'
    },
    {
      id: 6,
      title: '这是一个占位项目',
      description: '我一定会充实自己的项目经历的！！！',
      image: '', // 占位图片名称
      technologies: ['React', 'D3.js', 'Firebase', 'Tailwind CSS'],
      github: '',
      live: '',
      category: 'web'
    },
    {
      id: 7,
      title: '这是一个占位项目',
      description: '我一定会充实自己的项目经历的！！！',
      image: '', // 占位图片名称
      technologies: ['React', 'D3.js', 'Firebase', 'Tailwind CSS'],
      github: '',
      live: '',
      category: 'web'
    }
  ]

  // 过滤项目
  const filteredProjects = activeTab === 'all'
    ? projects
    : projects.filter(project => project.category === activeTab)

  // 分页逻辑
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage)
  const currentProjects = filteredProjects.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handlePageChange = (page) => {
    setCurrentPage(page)
    // 滚动到容器顶部
    const container = document.getElementById('projects-scroll-container')
    if (container) {
      container.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleTabChange = (tabId) => {
    setActiveTab(tabId)
    setCurrentPage(1)
  }

  // 类别
  const categories = [
    { id: 'all', name: '全部' },
    { id: 'web', name: '网站' },
    { id: 'mobile', name: '移动应用' },
    { id: 'ai', name: '人工智能' },
    { id: 'data', name: '数据分析' }
  ]

  return (
    <section id="projects" className="section bg-dark h-screen flex flex-col overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-secondary rounded-full filter blur-3xl"></div>
        <div className="absolute top-1/2 -right-20 w-60 h-60 bg-secondary rounded-full filter blur-3xl"></div>
      </div>

      {/* 滚动内容区 */}
      <div id="projects-scroll-container" className="flex-grow overflow-y-auto overflow-x-hidden relative z-10 scrollbar-thin scrollbar-thumb-secondary scrollbar-track-transparent">
        <div className="container mx-auto max-w-7xl pb-16 pt-4 px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: false, margin: "-100px" }}
            className="mb-6 text-center"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-2 flex items-center justify-center gap-3">
              <img src={spaceStationIcon} alt="icon" className="w-8 h-8 md:w-10 md:h-10" />
              我的项目
            </h2>
            <div className="w-12 h-1 bg-secondary mx-auto mb-4"></div>
          </motion.div>

          {/* 项目分类标签 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: false, margin: "-100px" }}
            className="flex flex-wrap justify-center gap-3 mb-6"
          >
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => handleTabChange(category.id)}
                className={`px-3 py-1 rounded-full text-xs font-mono transition-all duration-300 ${activeTab === category.id ? 'bg-secondary text-primary' : 'bg-primary/30 text-light hover:bg-primary/50'}`}
              >
                {category.name}
              </button>
            ))}
          </motion.div>

          {/* 项目网格 */}
          <div id="projects-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-max">
            {currentProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: false, margin: "-50px" }}
                className="card group hover-effect h-full flex flex-col !p-5"
              >
                {/* 项目图片 */}
                <div className="relative w-full h-40 mb-4 overflow-hidden rounded bg-primary/50 shrink-0">
                  {project.image ? (
                    <img
                      src={`/project-img/${project.image}`}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    /* 图片占位符 */
                    <div className="absolute inset-0 flex items-center justify-center bg-primary/80 text-secondary">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}

                  {/* 悬停时显示的链接 */}
                  <div className="absolute inset-0 bg-secondary/90 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-primary text-secondary p-2 rounded-full hover:scale-110 transition-transform duration-300"
                        aria-label="GitHub 仓库"
                      >
                        <FaGithub size={20} />
                      </a>
                    )}
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-primary text-secondary p-2 rounded-full hover:scale-110 transition-transform duration-300"
                        aria-label="在线演示"
                      >
                        <FaExternalLinkAlt size={18} />
                      </a>
                    )}
                  </div>
                </div>

                {/* 项目信息 */}
                <div className="flex-1 flex flex-col relative">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-secondary transition-colors duration-300 truncate">
                    {project.title}
                  </h3>

                  <div
                    className="relative group/desc"
                    onMouseEnter={() => setHoveredDesc(project.id)}
                    onMouseLeave={() => setHoveredDesc(null)}
                  >
                    <p className="text-slate mb-3 text-sm line-clamp-2 cursor-help">
                      {project.description}
                    </p>

                    <AnimatePresence>
                      {hoveredDesc === project.id && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.15, ease: "easeOut" }}
                          className="absolute bottom-full left-0 w-full mb-2 p-3 rounded-lg bg-dark/95 backdrop-blur-md border border-cyan-500/30 text-xs text-slate-200 shadow-[0_0_15px_rgba(6,182,212,0.3)] z-50 pointer-events-none"
                        >
                          {project.description}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* 技术标签 */}
                  <div className="flex flex-wrap gap-1.5 mt-auto">
                    {project.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="text-xs font-mono py-1 px-2 rounded bg-primary/50 text-secondary"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* 分页控制 - 固定在底部 */}
      {totalPages > 1 && (
        <div className="w-full bg-dark/95 backdrop-blur-md py-2 z-30 flex-shrink-0">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex justify-center gap-2"
          >
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-md font-mono text-sm transition-colors ${currentPage === 1
                ? 'bg-primary/30 text-slate/50 cursor-not-allowed'
                : 'bg-primary/50 text-secondary hover:bg-secondary/10'
                }`}
            >
              &lt;
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`w-8 h-8 rounded-md font-mono text-sm transition-colors ${currentPage === page
                  ? 'bg-secondary text-primary font-bold'
                  : 'bg-primary/50 text-secondary hover:bg-secondary/10'
                  }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-md font-mono text-sm transition-colors ${currentPage === totalPages
                ? 'bg-primary/30 text-slate/50 cursor-not-allowed'
                : 'bg-primary/50 text-secondary hover:bg-secondary/10'
                }`}
            >
              &gt;
            </button>
          </motion.div>
        </div>
      )}
    </section>
  )
}

export default Projects