import { Route, Routes } from 'react-router-dom'
import Nav from './components/Nav.jsx'
import Home from './pages/Home.jsx'
import ScrollAnimations from './pages/ScrollAnimations.jsx'
import PageTransitions from './pages/PageTransitions.jsx'
import MicroInteractions from './pages/MicroInteractions.jsx'
import './App.css'

function App() {
  return (
    <>
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/scroll-animations" element={<ScrollAnimations />} />
          <Route path="/page-transitions" element={<PageTransitions />} />
          <Route path="/micro-interactions" element={<MicroInteractions />} />
        </Routes>
      </main>
    </>
  )
}

export default App
