import { motion } from 'framer-motion'
import './FadeSlideIn.css'

const boxes = ['One', 'Two', 'Three']

function FadeSlideIn() {
  return (
    <div className="fade-slide-stack">
      {boxes.map((label) => (
        <motion.div
          key={label}
          className="fade-slide-box"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.3, ease: 'easeOut' }}
        >
          {label}
        </motion.div>
      ))}
    </div>
  )
}

export default FadeSlideIn
