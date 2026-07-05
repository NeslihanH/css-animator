import { useState } from 'react'
import CodeBlock from './CodeBlock.jsx'
import './ExampleCard.css'

function ExampleCard({ title, description, code, fileName, children }) {
  const [showCode, setShowCode] = useState(false)

  return (
    <section className="example-card">
      <div className="example-header">
        <div>
          <h2>{title}</h2>
          {description && <p className="example-description">{description}</p>}
        </div>
        {code && (
          <button
            type="button"
            className="example-code-toggle"
            onClick={() => setShowCode((value) => !value)}
          >
            {showCode ? 'Hide code' : 'Show code'}
          </button>
        )}
      </div>
      {code && showCode && <CodeBlock code={code} fileName={fileName} />}
      <div className="example-demo">{children}</div>
    </section>
  )
}

export default ExampleCard
