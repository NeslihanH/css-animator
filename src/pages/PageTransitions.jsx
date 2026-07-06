import ExampleCard from '../components/ExampleCard.jsx'
import PageTransitionSource from '../components/PageTransition.jsx?raw'
import SharedElement from '../examples/SharedElement.jsx'
import SharedElementSource from '../examples/SharedElement.jsx?raw'
import ModalDemo from '../examples/ModalDemo.jsx'
import ModalDemoSource from '../examples/ModalDemo.jsx?raw'

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
        description="This is already happening: every navigation on this site (try the nav links above) fades and slides between pages using AnimatePresence."
        code={PageTransitionSource}
        fileName="PageTransition.jsx"
      >
        <p className="transition-hint">↑ Click a nav link above to see it in action ↑</p>
      </ExampleCard>
      <ExampleCard
        title="Shared element transition"
        description="Click a card: it morphs directly into the expanded detail view using a shared layoutId, instead of just fading between two states."
        code={SharedElementSource}
        fileName="SharedElement.jsx"
      >
        <SharedElement />
      </ExampleCard>
      <ExampleCard
        title="Modal open/close"
        description="A dialog pops in and out with a spring, over a backdrop that fades independently."
        code={ModalDemoSource}
        fileName="ModalDemo.jsx"
      >
        <ModalDemo />
      </ExampleCard>
    </div>
  )
}

export default PageTransitions
