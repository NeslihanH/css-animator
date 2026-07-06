import ExampleCard from '../components/ExampleCard.jsx'
import HoverButton from '../examples/HoverButton.jsx'
import HoverButtonSource from '../examples/HoverButton.jsx?raw'
import HoverButtonStyles from '../examples/HoverButton.css?raw'
import ToggleSwitch from '../examples/ToggleSwitch.jsx'
import ToggleSwitchSource from '../examples/ToggleSwitch.jsx?raw'
import ToggleSwitchStyles from '../examples/ToggleSwitch.css?raw'
import FormFeedback from '../examples/FormFeedback.jsx'
import FormFeedbackSource from '../examples/FormFeedback.jsx?raw'
import FormFeedbackStyles from '../examples/FormFeedback.css?raw'
import LoadingStates from '../examples/LoadingStates.jsx'
import LoadingStatesSource from '../examples/LoadingStates.jsx?raw'
import LoadingStatesStyles from '../examples/LoadingStates.css?raw'

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
        files={[
          { fileName: 'HoverButton.jsx', code: HoverButtonSource },
          { fileName: 'HoverButton.css', code: HoverButtonStyles },
        ]}
      >
        <HoverButton />
      </ExampleCard>
      <ExampleCard
        title="Animated toggle/switch"
        description="Click to switch on/off: the thumb slides with a spring and the track color transitions."
        files={[
          { fileName: 'ToggleSwitch.jsx', code: ToggleSwitchSource },
          { fileName: 'ToggleSwitch.css', code: ToggleSwitchStyles },
        ]}
      >
        <ToggleSwitch />
      </ExampleCard>
      <ExampleCard
        title="Form input focus/error feedback"
        description="Focus the field to see the highlight ring. Type something without an @ and click away to see the shake + error message."
        files={[
          { fileName: 'FormFeedback.jsx', code: FormFeedbackSource },
          { fileName: 'FormFeedback.css', code: FormFeedbackStyles },
        ]}
      >
        <FormFeedback />
      </ExampleCard>
      <ExampleCard
        title="Loading spinner & skeleton loader"
        description="Two common loading patterns, both animating continuously."
        files={[
          { fileName: 'LoadingStates.jsx', code: LoadingStatesSource },
          { fileName: 'LoadingStates.css', code: LoadingStatesStyles },
        ]}
      >
        <LoadingStates />
      </ExampleCard>
    </div>
  )
}

export default MicroInteractions
