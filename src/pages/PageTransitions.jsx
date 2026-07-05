import ExampleCard from '../components/ExampleCard.jsx'
import PageTransitionSource from '../components/PageTransition.jsx?raw'

function PageTransitions() {
  return (
    <div className="page">
      <h1>Page Transitions</h1>
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
    </div>
  )
}

export default PageTransitions
