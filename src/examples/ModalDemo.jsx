import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import './ModalDemo.css'

function ModalDemo() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="modal-demo">
      <button type="button" className="modal-open-button" onClick={() => setIsOpen(true)}>
        Open modal
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="modal-backdrop"
            onClick={() => setIsOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="modal-dialog"
              onClick={(event) => event.stopPropagation()}
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            >
              <h3>Modal title</h3>
              <p>A spring-based pop-in and pop-out, independent of the card morph above.</p>
              <button type="button" onClick={() => setIsOpen(false)}>
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ModalDemo
