import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import './ParallaxScroll.css'

function ParallaxScroll() {
  const ref = useRef(null)
  const prefersReducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const slowLayerY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? ['0px', '0px'] : ['-160px', '160px'],
  )
  const fastLayerY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? ['0px', '0px'] : ['220px', '-220px'],
  )

  return (
    <div ref={ref} className="parallax-section">
      <motion.div className="parallax-blob parallax-blob-slow" style={{ y: slowLayerY }} />
      <motion.div className="parallax-blob parallax-blob-fast" style={{ y: fastLayerY }} />
      <div className="parallax-content">Foreground stays still, layers move at different speeds</div>
    </div>
  )
}

export default ParallaxScroll
