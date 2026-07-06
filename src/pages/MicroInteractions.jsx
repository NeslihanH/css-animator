import ExampleCard from '../components/ExampleCard.jsx'
import HoverButton from '../examples/HoverButton.jsx'
import HoverButtonSource from '../examples/HoverButton.jsx?raw'
import ToggleSwitch from '../examples/ToggleSwitch.jsx'
import ToggleSwitchSource from '../examples/ToggleSwitch.jsx?raw'
import FormFeedback from '../examples/FormFeedback.jsx'
import FormFeedbackSource from '../examples/FormFeedback.jsx?raw'
import LoadingStates from '../examples/LoadingStates.jsx'
import LoadingStatesSource from '../examples/LoadingStates.jsx?raw'

function MicroInteractions() {
  return (
    <div className="page">
      <span className="page-eyebrow">Micro-interactions</span>
      <h1>Details you feel<br />more than see.</h1>
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
      <ExampleCard
        title="Loading spinner & skeleton loader"
        description="Two common loading patterns, both animating continuously."
        code={LoadingStatesSource}
        fileName="LoadingStates.jsx"
      >
        <LoadingStates />
      </ExampleCard>
    </div>
  )
}

export default MicroInteractions
