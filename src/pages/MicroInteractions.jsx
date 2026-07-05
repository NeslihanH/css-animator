import ExampleCard from '../components/ExampleCard.jsx'
import HoverButton from '../examples/HoverButton.jsx'
import HoverButtonSource from '../examples/HoverButton.jsx?raw'

function MicroInteractions() {
  return (
    <div className="page">
      <h1>Micro-interactions</h1>
      <p className="page-subtitle">
        Small feedback animations that make an interface feel responsive.
      </p>
      <ExampleCard
        title="Button hover/tap feedback"
        description="Hover to see it grow slightly, click to see it shrink - both with a quick spring."
        code={HoverButtonSource}
        fileName="HoverButton.jsx"
      >
        <HoverButton />
      </ExampleCard>
    </div>
  )
}

export default MicroInteractions
