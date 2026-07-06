import './Marquee.css'

const items = ['Fade', 'Slide', 'Scale', 'Rotate', 'Blur', 'Spring']

function Marquee() {
  return (
    <div className="marquee">
      <div className="marquee-track">
        {[...items, ...items].map((item, index) => (
          <span key={index} className="marquee-item">
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

export default Marquee
