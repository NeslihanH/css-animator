import ExampleCard from '../components/ExampleCard.jsx'
import FadeSlideIn from '../examples/FadeSlideIn.jsx'
import FadeSlideInSource from '../examples/FadeSlideIn.jsx?raw'
import StaggerReveal from '../examples/StaggerReveal.jsx'
import StaggerRevealSource from '../examples/StaggerReveal.jsx?raw'
import ParallaxScroll from '../examples/ParallaxScroll.jsx'
import ParallaxScrollSource from '../examples/ParallaxScroll.jsx?raw'

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
        code={FadeSlideInSource}
      >
        <FadeSlideIn />
      </ExampleCard>
      <ExampleCard
        title="Staggered list reveal"
        description="The whole group animates in together, but each item is delayed slightly after the previous one."
        code={StaggerRevealSource}
      >
        <StaggerReveal />
      </ExampleCard>
      <ExampleCard
        title="Parallax scroll"
        description="Background layers move at different speeds than the foreground as you scroll past."
        code={ParallaxScrollSource}
      >
        <ParallaxScroll />
      </ExampleCard>
    </div>
  )
}

export default ScrollAnimations
