import ExampleCard from '../components/ExampleCard.jsx'
import FlipCard from '../examples/FlipCard.jsx'
import FlipCardSource from '../examples/FlipCard.jsx?raw'
import FlipCardStyles from '../examples/FlipCard.css?raw'
import ScrollDrivenReveal from '../examples/ScrollDrivenReveal.jsx'
import ScrollDrivenRevealSource from '../examples/ScrollDrivenReveal.jsx?raw'
import ScrollDrivenRevealStyles from '../examples/ScrollDrivenReveal.css?raw'
import Marquee from '../examples/Marquee.jsx'
import MarqueeSource from '../examples/Marquee.jsx?raw'
import MarqueeStyles from '../examples/Marquee.css?raw'
import GradientBorder from '../examples/GradientBorder.jsx'
import GradientBorderSource from '../examples/GradientBorder.jsx?raw'
import GradientBorderStyles from '../examples/GradientBorder.css?raw'
import GradientText from '../examples/GradientText.jsx'
import GradientTextSource from '../examples/GradientText.jsx?raw'
import GradientTextStyles from '../examples/GradientText.css?raw'

function PureCss() {
  return (
    <div className="page">
      <span className="page-eyebrow">Pure CSS</span>
      <h1>No JavaScript,<br />just CSS doing the work.</h1>
      <p className="page-subtitle">
        Everything on this page runs on CSS alone - no Framer Motion, no
        animation library, not even a line of animation-related JavaScript.
      </p>
      <ExampleCard
        title="3D flip card"
        description="Hover the card: it flips on its Y axis to reveal the back, using perspective and transform-style: preserve-3d."
        files={[
          { fileName: 'FlipCard.jsx', code: FlipCardSource },
          { fileName: 'FlipCard.css', code: FlipCardStyles },
        ]}
      >
        <FlipCard />
      </ExampleCard>
      <ExampleCard
        title="Native scroll-driven animation"
        description="Scroll the box into view: it fades and scales in, driven entirely by animation-timeline: view(), a browser-native scroll animation with no JavaScript at all."
        files={[
          { fileName: 'ScrollDrivenReveal.jsx', code: ScrollDrivenRevealSource },
          { fileName: 'ScrollDrivenReveal.css', code: ScrollDrivenRevealStyles },
        ]}
      >
        <ScrollDrivenReveal />
      </ExampleCard>
      <ExampleCard
        title="Marquee ticker"
        description="An infinitely scrolling strip, built with a duplicated track and a linear @keyframes loop."
        files={[
          { fileName: 'Marquee.jsx', code: MarqueeSource },
          { fileName: 'Marquee.css', code: MarqueeStyles },
        ]}
      >
        <Marquee />
      </ExampleCard>
      <ExampleCard
        title="Spinning gradient border"
        description="The border is a conic-gradient animated through a registered @property angle, masked down to a thin ring around the card."
        files={[
          { fileName: 'GradientBorder.jsx', code: GradientBorderSource },
          { fileName: 'GradientBorder.css', code: GradientBorderStyles },
        ]}
      >
        <GradientBorder />
      </ExampleCard>
      <ExampleCard
        title="Animated gradient text"
        description="A linear-gradient clipped to the text shape, then scrolled across itself with background-position."
        files={[
          { fileName: 'GradientText.jsx', code: GradientTextSource },
          { fileName: 'GradientText.css', code: GradientTextStyles },
        ]}
      >
        <GradientText />
      </ExampleCard>
    </div>
  )
}

export default PureCss
