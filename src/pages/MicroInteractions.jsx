import ExampleCard from '../components/ExampleCard.jsx'
import HoverButton from '../examples/HoverButton.jsx'
import HoverButtonSource from '../examples/HoverButton.jsx?raw'
import ToggleSwitch from '../examples/ToggleSwitch.jsx'
import ToggleSwitchSource from '../examples/ToggleSwitch.jsx?raw'
import FormFeedback from '../examples/FormFeedback.jsx'
import FormFeedbackSource from '../examples/FormFeedback.jsx?raw'

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
      <ExampleCard
        title="Animated toggle/switch"
        description="Click to switch on/off: the thumb slides with a spring and the track color transitions."
        code={ToggleSwitchSource}
        fileName="ToggleSwitch.jsx"
      >
        <ToggleSwitch />
      </ExampleCard>
      <ExampleCard
        title="Form input focus/error feedback"
        description="Focus the field to see the highlight ring. Type something without an @ and click away to see the shake + error message."
        code={FormFeedbackSource}
        fileName="FormFeedback.jsx"
      >
        <FormFeedback />
      </ExampleCard>
    </div>
  )
}

export default MicroInteractions
