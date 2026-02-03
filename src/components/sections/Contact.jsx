import React from 'react'
import { motion } from 'framer-motion'
import roverIcon from '../../assets/icons/universe/rover.svg'
import ElectricStrings from '../3d/ElectricStrings'

const Contact = () => {
  return (
    <section id="contact" className="section bg-dark h-screen overflow-hidden">
      {/* 背景特效 */}
      <ElectricStrings />

      {/* 备用背景装饰 */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-secondary rounded-full filter blur-3xl"></div>
        <div className="absolute top-1/3 -left-20 w-60 h-60 bg-secondary rounded-full filter blur-3xl"></div>
      </div>

      <div className="container mx-auto h-full flex items-center justify-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: false, margin: "-100px" }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 flex items-center justify-center gap-4">
            <img src={roverIcon} alt="icon" className="w-12 h-12 md:w-20 md:h-20" />
            联系我
          </h2>
          <div className="w-20 h-1 bg-secondary mx-auto"></div>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact