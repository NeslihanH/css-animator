import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import './ParallaxScroll.css'

function ParallaxScroll() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const slowLayerY = useTransform(scrollYProgress, [0, 1], ['-15%', '15%'])
  const fastLayerY = useTransform(scrollYProgress, [0, 1], ['20%', '-20%'])

  return (
    <div ref={ref} className="parallax-section">
      <motion.div className="parallax-blob parallax-blob-slow" style={{ y: slowLayerY }} />
      <motion.div className="parallax-blob parallax-blob-fast" style={{ y: fastLayerY }} />
      <div className="parallax-content">Foreground stays still, layers move at different speeds</div>
    </div>
  )
}

export default ParallaxScroll
