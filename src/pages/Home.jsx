import { Link } from 'react-router-dom'

const categories = [
  {
    to: '/scroll-animations',
    title: 'Scroll Animations',
    description: 'Fade-ins, staggered reveals, parallax and scroll progress.',
  },
  {
    to: '/page-transitions',
    title: 'Page Transitions',
    description: 'Route transitions, shared elements, modal open/close.',
  },
  {
    to: '/micro-interactions',
    title: 'Micro-interactions',
    description: 'Buttons, toggles, form feedback, loading states.',
  },
]

function Home() {
  return (
    <div className="page">
      <h1>CSS Animator</h1>
      <p className="page-subtitle">
        Interactive examples of scroll animations, page transitions, and
        micro-interactions built with CSS and Framer Motion.
      </p>
      <div className="category-grid">
        {categories.map((category) => (
          <Link key={category.to} to={category.to} className="category-card">
            <h2>{category.title}</h2>
            <p>{category.description}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Home
