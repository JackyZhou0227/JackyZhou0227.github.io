import React, { useState } from 'react'
import { motion } from 'framer-motion'
import capsuleIcon from '../../assets/icons/universe/capsule.svg'

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState('frontend')

  // 技能数据
  const skillCategories = [
    {
      id: 'frontend',
      title: '前端开发',
      skills: [
        { name: 'HTML5 & CSS3', level: 95 },
        { name: 'JavaScript (ES6+)', level: 90 },
        { name: 'React', level: 88 },
        { name: 'Vue.js', level: 85 },
        { name: 'TypeScript', level: 80 },
        { name: 'Tailwind CSS', level: 92 },
        { name: 'Webpack/Vite', level: 78 },
        { name: 'Three.js', level: 70 },
      ]
    },
    {
      id: 'backend',
      title: '后端开发',
      skills: [
        { name: 'Node.js', level: 85 },
        { name: 'Express', level: 88 },
        { name: 'Python', level: 82 },
        { name: 'Django', level: 75 },
        { name: 'RESTful API', level: 90 },
        { name: 'GraphQL', level: 72 },
        { name: 'MongoDB', level: 80 },
        { name: 'PostgreSQL', level: 78 },
      ]
    },
    {
      id: 'tools',
      title: '工具与方法',
      skills: [
        { name: 'Git & GitHub', level: 92 },
        { name: 'Docker', level: 75 },
        { name: 'CI/CD', level: 70 },
        { name: 'AWS', level: 65 },
        { name: 'Agile/Scrum', level: 85 },
        { name: 'Jest/Testing', level: 78 },
        { name: 'Figma/UI设计', level: 80 },
        { name: 'SEO优化', level: 72 },
      ]
    },
    {
      id: 'other',
      title: '其他技能',
      skills: [
        { name: '机器学习基础', level: 60 },
        { name: '数据分析', level: 65 },
        { name: '技术写作', level: 85 },
        { name: '项目管理', level: 80 },
        { name: '问题解决', level: 90 },
        { name: '沟通协作', level: 88 },
        { name: '持续学习', level: 95 },
        { name: '创新思维', level: 85 },
      ]
    }
  ]

  // 获取当前活动类别的技能
  const activeSkills = skillCategories.find(category => category.id === activeCategory)?.skills || []

  return (
    <section id="skills" className="section bg-primary h-screen overflow-y-auto overflow-x-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 grid-bg opacity-20" />

      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: false, margin: "-100px" }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center justify-center gap-4">
            <img src={capsuleIcon} alt="icon" className="w-12 h-12 md:w-16 md:h-16" />
            我的技能
          </h2>
          <div className="w-16 h-1 bg-secondary mx-auto mb-6"></div>
          <p className="text-slate max-w-2xl mx-auto">
            这些是我在多年开发经验中掌握的技术和工具。我不断学习和提升，以保持技术的前沿性。
          </p>
        </motion.div>

        {/* 技能类别选择器 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: false, margin: "-100px" }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {skillCategories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 rounded-md text-sm font-mono transition-all duration-300 ${activeCategory === category.id ? 'bg-secondary text-primary' : 'bg-dark text-light hover:bg-dark/80'}`}
            >
              {category.title}
            </button>
          ))}
        </motion.div>

        {/* 技能进度条 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          {activeSkills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="mb-6"
            >
              <div className="flex justify-between mb-2">
                <span className="text-light font-mono">{skill.name}</span>
                <span className="text-secondary font-mono">{skill.level}%</span>
              </div>
              <div className="h-2 bg-dark rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-secondary"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  transition={{ duration: 1, delay: 0.2 }}
                  viewport={{ once: false }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* 技能云 - 装饰元素 */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: false, margin: "-100px" }}
          className="mt-16 relative h-40 md:h-60 overflow-hidden"
        >
          {skillCategories.flatMap(category => category.skills).map((skill, index) => {
            // 随机位置
            const randomX = Math.floor(Math.random() * 100)
            const randomY = Math.floor(Math.random() * 100)
            const randomSize = Math.floor(Math.random() * 16) + 12 // 12px - 28px
            const randomOpacity = Math.random() * 0.7 + 0.3 // 0.3 - 1.0

            return (
              <div
                key={`${skill.name}-${index}`}
                className="absolute text-secondary font-mono"
                style={{
                  left: `${randomX}%`,
                  top: `${randomY}%`,
                  fontSize: `${randomSize}px`,
                  opacity: randomOpacity,
                  transform: `rotate(${Math.random() * 20 - 10}deg)`,
                }}
              >
                {skill.name}
              </div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

export default Skills