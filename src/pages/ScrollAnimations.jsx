import ExampleCard from '../components/ExampleCard.jsx'
import FadeSlideIn from '../examples/FadeSlideIn.jsx'
import FadeSlideInSource from '../examples/FadeSlideIn.jsx?raw'
import FadeSlideInStyles from '../examples/FadeSlideIn.css?raw'
import StaggerReveal from '../examples/StaggerReveal.jsx'
import StaggerRevealSource from '../examples/StaggerReveal.jsx?raw'
import StaggerRevealStyles from '../examples/StaggerReveal.css?raw'
import ParallaxScroll from '../examples/ParallaxScroll.jsx'
import ParallaxScrollSource from '../examples/ParallaxScroll.jsx?raw'
import ParallaxScrollStyles from '../examples/ParallaxScroll.css?raw'
import ScrollProgressBar from '../examples/ScrollProgressBar.jsx'
import ScrollProgressBarSource from '../examples/ScrollProgressBar.jsx?raw'
import ScrollProgressBarStyles from '../examples/ScrollProgressBar.css?raw'

function ScrollAnimations() {
  return (
    <div className="page">
      <span className="page-eyebrow">Scroll Animations</span>
      <h1>Things that move<br />when you do.</h1>
      <p className="page-subtitle">
        Animations that trigger as elements enter the viewport while scrolling.
      </p>
      <ExampleCard
        title="Fade & slide-in on scroll"
        description="Each box animates in independently the first time it enters the viewport. Scroll down to see all three."
        files={[
          { fileName: 'FadeSlideIn.jsx', code: FadeSlideInSource },
          { fileName: 'FadeSlideIn.css', code: FadeSlideInStyles },
        ]}
      >
        <FadeSlideIn />
      </ExampleCard>
      <ExampleCard
        title="Staggered list reveal"
        description="The whole group animates in together, but each item is delayed slightly after the previous one."
        files={[
          { fileName: 'StaggerReveal.jsx', code: StaggerRevealSource },
          { fileName: 'StaggerReveal.css', code: StaggerRevealStyles },
        ]}
      >
        <StaggerReveal />
      </ExampleCard>
      <ExampleCard
        title="Parallax scroll"
        description="Background layers move at different speeds than the foreground as you scroll past."
        files={[
          { fileName: 'ParallaxScroll.jsx', code: ParallaxScrollSource },
          { fileName: 'ParallaxScroll.css', code: ParallaxScrollStyles },
        ]}
      >
        <ParallaxScroll />
      </ExampleCard>
      <ExampleCard
        title="Scroll progress bar"
        description="A bar fills up in sync with scroll position, tracked independently for this box."
        files={[
          { fileName: 'ScrollProgressBar.jsx', code: ScrollProgressBarSource },
          { fileName: 'ScrollProgressBar.css', code: ScrollProgressBarStyles },
        ]}
      >
        <ScrollProgressBar />
      </ExampleCard>
    </div>
  )
}

export default ScrollAnimations
