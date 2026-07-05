import { useRef } from 'react'
import { motion, useScroll } from 'framer-motion'
import './ScrollProgressBar.css'

const paragraphs = [
  'This box has its own scroll area, separate from the page.',
  'The bar above tracks progress through this box only, using Framer Motion\'s useScroll with a container ref.',
  'Keep scrolling to watch the bar fill up.',
  'scaleX is driven directly by scrollYProgress, so the fill is perfectly in sync with the scroll position.',
  'Almost there.',
  'You reached the end - the bar should be fully filled now.',
]

function ScrollProgressBar() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({ container: containerRef })

  return (
    <div className="progress-demo">
      <motion.div className="progress-bar" style={{ scaleX: scrollYProgress }} />
      <div ref={containerRef} className="progress-scroll-area">
        {paragraphs.map((text, index) => (
          <p key={index}>{text}</p>
        ))}
      </div>
    </div>
  )
}

export default ScrollProgressBar
