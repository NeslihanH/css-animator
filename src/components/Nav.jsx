import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link, NavLink, useLocation } from 'react-router-dom'
import './Nav.css'

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/scroll-animations', label: 'Scroll Animations' },
  { to: '/page-transitions', label: 'Page Transitions' },
  { to: '/micro-interactions', label: 'Micro-interactions' },
]

function Nav() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setIsOpen(false)
  }, [location.pathname])

  return (
    <nav className="nav">
      <div className="nav-bar">
        <span className="nav-brand">CSS Animator</span>
        <div className="nav-mobile-actions">
          {location.pathname !== '/' && (
            <motion.div whileTap={{ scale: 0.9 }}>
              <Link to="/" className="nav-back" aria-label="Back to home">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </Link>
            </motion.div>
          )}
          <button
            type="button"
            className={`nav-toggle ${isOpen ? 'is-open' : ''}`}
            onClick={() => setIsOpen((value) => !value)}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
        <ul className="nav-links">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.end}
                className={({ isActive }) => (isActive ? 'active' : undefined)}
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            className="nav-mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
          >
            {links.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.end}
                  className={({ isActive }) => (isActive ? 'active' : undefined)}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Nav
