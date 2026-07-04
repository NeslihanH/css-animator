import ExampleCard from '../components/ExampleCard.jsx'
import FadeSlideIn from '../examples/FadeSlideIn.jsx'

function ScrollAnimations() {
  return (
    <div className="page">
      <h1>Scroll Animations</h1>
      <p className="page-subtitle">
        Animations that trigger as elements enter the viewport while scrolling.
      </p>
      <ExampleCard
        title="Fade & slide-in on scroll"
        description="Each box animates in independently the first time it enters the viewport. Scroll down to see all three."
      >
        <FadeSlideIn />
      </ExampleCard>
    </div>
  )
}

export default ScrollAnimations
