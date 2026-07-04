import { NavLink } from 'react-router-dom'
import './Nav.css'

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/scroll-animations', label: 'Scroll Animations' },
  { to: '/page-transitions', label: 'Page Transitions' },
  { to: '/micro-interactions', label: 'Micro-interactions' },
]

function Nav() {
  return (
    <nav className="nav">
      <span className="nav-brand">CSS Animator</span>
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
    </nav>
  )
}

export default Nav
