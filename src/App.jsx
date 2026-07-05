import { AnimatePresence } from 'framer-motion'
import { Route, Routes, useLocation } from 'react-router-dom'
import Nav from './components/Nav.jsx'
import PageTransition from './components/PageTransition.jsx'
import Home from './pages/Home.jsx'
import ScrollAnimations from './pages/ScrollAnimations.jsx'
import PageTransitions from './pages/PageTransitions.jsx'
import MicroInteractions from './pages/MicroInteractions.jsx'
import './App.css'

function App() {
  const location = useLocation()

  return (
    <>
      <Nav />
      <main>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageTransition><Home /></PageTransition>} />
            <Route
              path="/scroll-animations"
              element={<PageTransition><ScrollAnimations /></PageTransition>}
            />
            <Route
              path="/page-transitions"
              element={<PageTransition><PageTransitions /></PageTransition>}
            />
            <Route
              path="/micro-interactions"
              element={<PageTransition><MicroInteractions /></PageTransition>}
            />
          </Routes>
        </AnimatePresence>
      </main>
    </>
  )
}

export default App
