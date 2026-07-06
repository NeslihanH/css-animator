import './ScrollDrivenReveal.css'

function ScrollDrivenReveal() {
  return (
    <div className="scroll-driven-wrap">
      <p className="scroll-driven-note">
        Chrome/Edge only for now - this browser feature is not yet supported in
        Safari or Firefox. If the box below does not animate, that is why.
      </p>
      <div className="scroll-driven-track">
        <div className="scroll-driven-box">Scroll me into view</div>
      </div>
    </div>
  )
}

export default ScrollDrivenReveal
