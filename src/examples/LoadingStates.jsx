import { motion } from 'framer-motion'
import './LoadingStates.css'

const skeletonLines = [100, 80, 60]

function LoadingStates() {
  return (
    <div className="loading-states-demo">
      <div className="loading-block">
        <motion.div
          className="spinner"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
        <span>Spinner</span>
      </div>
      <div className="loading-block">
        <div className="skeleton-group">
          {skeletonLines.map((width, index) => (
            <motion.div
              key={width}
              className="skeleton-line"
              style={{ width: `${width}%` }}
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{
                duration: 1.4,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: index * 0.15,
              }}
            />
          ))}
        </div>
        <span>Skeleton</span>
      </div>
    </div>
  )
}

export default LoadingStates
