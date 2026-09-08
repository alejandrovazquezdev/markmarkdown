import { useMemo } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeRaw from 'rehype-raw'
import rehypeKatex from 'rehype-katex'
import 'katex/dist/katex.min.css'
import { preprocessMarkdown } from '../lib/markdown'

function CodeBlock({ node, inline, className, children, ...props }) {
  const lang = /language-([\w-]+)/.exec(className || '')?.[1]

  if (lang === 'mermaid') {
    return (
      <div className="md-mermaid" role="img" aria-label="Diagrama mermaid (vista previa simplificada)">
        <div className="md-mermaid-label">mermaid · diagrama</div>
        <pre>{String(children).trim()}</pre>
      </div>
    )
  }

  if (inline) {
    return (
      <code className="md-inline-code" {...props}>
        {children}
      </code>
    )
  }

  return (
    <pre className="md-codeblock">
      <code className={className} {...props}>
        {children}
      </code>
    </pre>
  )
}

export default function MarkdownPreview({ source = '', className = '' }) {
  const { body, meta } = useMemo(() => preprocessMarkdown(source), [source])

  return (
    <div className={`markdown-preview md-root ${className}`}>
      {meta && (
        <div className="md-frontmatter" aria-label="Frontmatter del documento">
          <div className="md-frontmatter-label">frontmatter</div>
          <pre>{meta}</pre>
        </div>
      )}
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeRaw, rehypeKatex]}
        components={{ code: CodeBlock }}
      >
        {body || '...'}
      </ReactMarkdown>
    </div>
  )
}
