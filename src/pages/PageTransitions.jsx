import { Link } from 'react-router-dom'
import ExampleCard from '../components/ExampleCard.jsx'
import PageTransitionSource from '../components/PageTransition.jsx?raw'
import SharedElement from '../examples/SharedElement.jsx'
import SharedElementSource from '../examples/SharedElement.jsx?raw'
import SharedElementStyles from '../examples/SharedElement.css?raw'
import ModalDemo from '../examples/ModalDemo.jsx'
import ModalDemoSource from '../examples/ModalDemo.jsx?raw'
import ModalDemoStyles from '../examples/ModalDemo.css?raw'

function PageTransitions() {
  return (
    <div className="page">
      <span className="page-eyebrow">Page Transitions</span>
      <h1>Every click,<br />a small scene change.</h1>
      <p className="page-subtitle">
        Animations that play when navigating between routes.
      </p>
      <ExampleCard
        title="Route fade/slide transition"
        description="This is already happening: every navigation on this site fades and slides between pages using AnimatePresence. Try it right here:"
        files={[{ fileName: 'PageTransition.jsx', code: PageTransitionSource }]}
      >
        <div className="transition-links">
          <Link to="/">Home</Link>
          <Link to="/scroll-animations">Scroll Animations</Link>
          <Link to="/micro-interactions">Micro-interactions</Link>
        </div>
      </ExampleCard>
      <ExampleCard
        title="Shared element transition"
        description="Click a card: it morphs directly into the expanded detail view using a shared layoutId, instead of just fading between two states."
        files={[
          { fileName: 'SharedElement.jsx', code: SharedElementSource },
          { fileName: 'SharedElement.css', code: SharedElementStyles },
        ]}
      >
        <SharedElement />
      </ExampleCard>
      <ExampleCard
        title="Modal open/close"
        description="A dialog pops in and out with a spring, over a backdrop that fades independently."
        files={[
          { fileName: 'ModalDemo.jsx', code: ModalDemoSource },
          { fileName: 'ModalDemo.css', code: ModalDemoStyles },
        ]}
      >
        <ModalDemo />
      </ExampleCard>
    </div>
  )
}

export default PageTransitions
