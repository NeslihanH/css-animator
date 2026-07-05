import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import './FormFeedback.css'

function FormFeedback() {
  const [value, setValue] = useState('')
  const [error, setError] = useState(false)
  const [shakeKey, setShakeKey] = useState(0)

  const handleChange = (event) => {
    setValue(event.target.value)
    setError(false)
  }

  const handleBlur = () => {
    const isValid = value.includes('@') && value.length > 3
    setError(!isValid)
    if (!isValid) setShakeKey((key) => key + 1)
  }

  return (
    <div className="form-feedback-demo">
      <motion.input
        key={shakeKey}
        type="email"
        placeholder="you@example.com"
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        className={`form-input ${error ? 'has-error' : ''}`}
        animate={error ? { x: [0, -8, 8, -6, 6, 0] } : {}}
        transition={{ duration: 0.4 }}
      />
      <AnimatePresence>
        {error && (
          <motion.p
            className="form-error"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
          >
            Please enter a valid email.
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

export default FormFeedback
