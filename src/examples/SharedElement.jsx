import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import './SharedElement.css'

const cards = [
  { id: 'a', title: 'Card A', detail: 'Expanded detail for Card A, morphed from the card you clicked.' },
  { id: 'b', title: 'Card B', detail: 'Expanded detail for Card B, morphed from the card you clicked.' },
  { id: 'c', title: 'Card C', detail: 'Expanded detail for Card C, morphed from the card you clicked.' },
]

function SharedElement() {
  const [selectedId, setSelectedId] = useState(null)
  const selectedCard = cards.find((card) => card.id === selectedId)

  return (
    <div className="shared-element-demo">
      <div className="shared-element-grid">
        {cards.map((card) => (
          <motion.div
            key={card.id}
            layoutId={`card-${card.id}`}
            className="shared-element-card"
            onClick={() => setSelectedId(card.id)}
          >
            {card.title}
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedCard && (
          <motion.div
            className="shared-element-backdrop"
            onClick={() => setSelectedId(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              layoutId={`card-${selectedCard.id}`}
              className="shared-element-detail"
              onClick={(event) => event.stopPropagation()}
            >
              <h3>{selectedCard.title}</h3>
              <p>{selectedCard.detail}</p>
              <button type="button" onClick={() => setSelectedId(null)}>
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default SharedElement
