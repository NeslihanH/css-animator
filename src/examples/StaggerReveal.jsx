import { motion } from 'framer-motion'
import './StaggerReveal.css'

const features = ['Fast', 'Accessible', 'Responsive', 'Themeable', 'Reusable']

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
}

const item = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
}

function StaggerReveal() {
  return (
    <motion.ul
      className="stagger-grid"
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {features.map((label) => (
        <motion.li key={label} className="stagger-item" variants={item}>
          {label}
        </motion.li>
      ))}
    </motion.ul>
  )
}

export default StaggerReveal
