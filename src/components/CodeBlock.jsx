import { useState } from 'react'
import { Highlight, themes } from 'prism-react-renderer'
import './CodeBlock.css'

function CopyIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="9" y="9" width="12" height="12" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}

function DownloadIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 3v12" />
      <path d="M7 10l5 5 5-5" />
      <path d="M5 21h14" />
    </svg>
  )
}

function CodeBlock({ code, language = 'jsx', fileName = 'example.jsx' }) {
  const [copied, setCopied] = useState(false)
  const trimmedCode = code.trim()

  const handleCopy = async () => {
    await navigator.clipboard.writeText(trimmedCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  const handleDownload = () => {
    const blob = new Blob([trimmedCode], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = fileName
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="code-block-wrapper">
      <div className="code-block-actions">
        <button
          type="button"
          className="code-action-button"
          onClick={handleDownload}
          aria-label="Download code"
        >
          <DownloadIcon />
        </button>
        <button
          type="button"
          className="code-action-button"
          onClick={handleCopy}
          aria-label="Copy code"
        >
          {copied ? <CheckIcon /> : <CopyIcon />}
        </button>
      </div>
      <Highlight theme={themes.nightOwl} code={trimmedCode} language={language}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={`code-block ${className}`} style={style}>
            {tokens.map((line, lineIndex) => (
              <div key={lineIndex} {...getLineProps({ line })}>
                {line.map((token, tokenIndex) => (
                  <span key={tokenIndex} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  )
}

export default CodeBlock
