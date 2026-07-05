import { motion } from 'framer-motion'
import './HoverButton.css'

function HoverButton() {
  return (
    <motion.button
      type="button"
      className="hover-button"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
    >
      Hover me
    </motion.button>
  )
}

export default HoverButton
