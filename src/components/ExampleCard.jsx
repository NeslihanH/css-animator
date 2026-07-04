import './ExampleCard.css'

function ExampleCard({ title, description, children }) {
  return (
    <section className="example-card">
      <h2>{title}</h2>
      {description && <p className="example-description">{description}</p>}
      <div className="example-demo">{children}</div>
    </section>
  )
}

export default ExampleCard
