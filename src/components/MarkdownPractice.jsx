import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

const markdownLessons = [
  { title: 'Encabezados', content: '# H1\n## H2\n### H3' },
  { title: 'Negrita y Cursiva', content: '**texto en negrita**\n*texto en cursiva*' },
  { title: 'Enlaces', content: '[Texto del enlace](https://ejemplo.com)' },
  { title: 'Listas', content: '- Item 1\n- Item 2\n  - Subitem\n1. Numerado\n2. Segundo' },
  { title: 'Codigo', content: '`codigo inline`\n\n```js\nconst x = 1;\n```' },
  { title: 'Tablas', content: '| Col1 | Col2 |\n|----|----|\n| a | b |' },
]

function MarkdownPractice() {
  const [selected, setSelected] = useState(0)
  const [content, setContent] = useState(markdownLessons[0].content)

  return (
    <div className="practice-section">
      <h2>Markdown</h2>
      <div className="markdown-container">
        <nav className="lesson-nav">
          {markdownLessons.map((lesson, i) => (
            <button
              key={i}
              className={selected === i ? 'active' : ''}
              onClick={() => {
                setSelected(i)
                setContent(lesson.content)
              }}
            >
              {lesson.title}
            </button>
          ))}
        </nav>
        <div className="editor-preview">
          <div className="editor">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Escribe Markdown aqui..."
            />
          </div>
          <div className="preview">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {content}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MarkdownPractice