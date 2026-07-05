import { useState } from 'react'
import { motion } from 'framer-motion'
import './ToggleSwitch.css'

function ToggleSwitch() {
  const [isOn, setIsOn] = useState(false)

  return (
    <button
      type="button"
      className={`toggle-track ${isOn ? 'is-on' : ''}`}
      onClick={() => setIsOn((value) => !value)}
      aria-pressed={isOn}
    >
      <motion.div
        className="toggle-thumb"
        animate={{ x: isOn ? 24 : 0 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      />
    </button>
  )
}

export default ToggleSwitch
