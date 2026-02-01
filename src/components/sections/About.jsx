import React from 'react'
import { motion } from 'framer-motion'
import avatarImg from '../../assets/avatar.jpg'
import astronautIcon from '../../assets/icons/universe/astronaut.svg'


const About = () => {
  return (
    <section id="about" className="section bg-primary sticky top-0 h-screen z-10 overflow-y-auto overflow-x-hidden border-t border-cyan-500/30 shadow-[0_-5px_30px_rgba(6,182,212,0.4)] flex items-center">
      {/* 背景网格 */}
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
            <img src={astronautIcon} alt="icon" className="w-12 h-12 md:w-16 md:h-16" />
            关于我
          </h2>
          <div className="w-16 h-1 bg-secondary mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* 文本部分 */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: false, margin: "-100px" }}
          >
            <p className="text-light mb-4">
              你好！我是小明，一名充满激情的全栈开发者，拥有5年的专业经验。我热爱将创意转化为代码，并构建能够解决实际问题的应用程序。
            </p>
            <p className="text-light mb-4">
              我的技术之旅始于大学时期，当时我对计算机科学产生了浓厚的兴趣。毕业后，我有幸在多家科技公司工作，参与了从小型创业公司到大型企业的各种项目。
            </p>
            <p className="text-light mb-6">
              除了编程，我还热衷于学习新技术、参与开源社区，以及通过技术博客分享我的知识和经验。我相信技术的力量可以改变世界，而我希望成为这一变革的一部分。
            </p>

            <div className="mb-8">
              <h3 className="text-secondary font-mono text-lg mb-3">我的核心技能：</h3>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
                <li className="flex items-center">
                  <span className="text-secondary mr-2">▹</span> JavaScript (React, Vue)
                </li>
                <li className="flex items-center">
                  <span className="text-secondary mr-2">▹</span> Node.js & Express
                </li>
                <li className="flex items-center">
                  <span className="text-secondary mr-2">▹</span> Python & Django
                </li>
                <li className="flex items-center">
                  <span className="text-secondary mr-2">▹</span> 数据库设计
                </li>
                <li className="flex items-center">
                  <span className="text-secondary mr-2">▹</span> UI/UX 设计
                </li>
                <li className="flex items-center">
                  <span className="text-secondary mr-2">▹</span> DevOps & 云服务
                </li>
              </ul>
            </div>

            <a href="#contact" className="btn-primary inline-block hover-effect">
              联系我
            </a>
          </motion.div>

          {/* 图片部分 */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: false, margin: "-100px" }}
            className="relative group"
          >
            <div className="relative w-full max-w-md mx-auto aspect-square overflow-hidden rounded-md">
              <img
                src={avatarImg}
                alt="小明 - 全栈开发者"
                className="w-full h-full object-cover relative z-10"
              />

              {/* 装饰边框 */}
              <div className="absolute inset-0 border-2 border-secondary rounded-md transform translate-x-4 translate-y-4 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-300"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About