import { motion } from 'framer-motion'

/**
 * 页面指示器组件
 * @param {Array} pages - 页面配置数组
 * @param {number} currentPage - 当前页面索引
 * @param {function} onPageClick - 点击页面时的回调
 */
function PageIndicator({ pages, currentPage, onPageClick }) {
    return (
        <div className="page-indicator">
            {pages.map((page, index) => (
                <motion.button
                    key={page.id}
                    className={`indicator-dot ${index === currentPage ? 'active' : ''}`}
                    onClick={() => onPageClick(index)}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    title={page.name}
                    aria-label={`跳转到${page.name}页面`}
                    aria-current={index === currentPage ? 'page' : undefined}
                />
            ))}
        </div>
    )
}

export default PageIndicator
