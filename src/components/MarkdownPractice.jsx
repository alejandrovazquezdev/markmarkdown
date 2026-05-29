import { useState, useEffect, useRef } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import anime from 'animejs'

const markdownLessons = [
  { 
    id: 1,
    title: 'Encabezados',
    content: '# Encabezados\n\nLos encabezados van del 1 al 6\n\n# H1 - Titulo Principal\n## H2 - Seccion\n### H3 - Subseccion\n#### H4\n##### H5\n###### H6'
  },
  { 
    id: 2,
    title: 'Formato de Texto',
    content: '# Formato de Texto\n\n**Negrita** - texto importante\n\n*Italica* - enfasis\n\n***Negrita e Italiana*** - maxima prioridad\n\n~~Tachado~~ - texto eliminado'
  },
  { 
    id: 3,
    title: 'Enlaces',
    content: '# Enlaces\n\n[Texto visible](https://ejemplo.com)\n\n[Con titulo](https://ejemplo.com "Descripcion")\n\n[Referencia][ref]\n\n[ref]: https://referencia.com'
  },
  { 
    id: 4,
    title: 'Listas',
    content: '# Listas\n\n## Desordenadas\n- Elemento uno\n- Elemento dos\n  - Sub elemento\n  - Otro mas\n\n## Ordenadas\n1. Primero\n2. Segundo\n3. Tercero'
  },
  { 
    id: 5,
    title: 'Codigo',
    content: '# Codigo\n\n`Codigo en linea`\n\n```javascript\nconst hola = "mundo";\nfunction saludar() {\n  console.log(hola);\n}\n```'
  },
  { 
    id: 6,
    title: 'Tablas',
    content: '# Tablas\n\n| Lenguaje | Tipo |\n|----------|-------|\n| JavaScript | Dinamico |\n| Python | Interpretado |\n| Rust | Compilado |'
  }
]

function MarkdownPractice() {
  const [selected, setSelected] = useState(0)
  const [content, setContent] = useState(markdownLessons[0].content)
  const [isEditing, setIsEditing] = useState(false)
  const containerRef = useRef(null)
  const textareaRef = useRef(null)

  useEffect(() => {
    if (containerRef.current) {
      anime({
        targets: containerRef.current,
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 600,
        easing: 'easeOutExpo'
      })
    }
  }, [selected])

  const handleLessonChange = (idx) => {
    setSelected(idx)
    setContent(markdownLessons[idx].content)
    setIsEditing(false)
  }

  return (
    <div className="markdown-practice" ref={containerRef}>
      <div className="section-header">
        <h2>MARKDOWN</h2>
        <p>Escribe y visualiza en tiempo real</p>
      </div>

      <div className="lessons-nav">
        {markdownLessons.map((lesson, i) => (
          <button
            key={lesson.id}
            className={`lesson-tab ${selected === i ? 'active' : ''}`}
            onClick={() => handleLessonChange(i)}
          >
            <span className="tab-number">{String(lesson.id).padStart(2, '0')}</span>
            <span className="tab-title">{lesson.title}</span>
          </button>
        ))}
      </div>

      <div className="editor-container">
        <div className="editor-panel">
          <div className="panel-header">
            <span className="panel-title">Editor</span>
            <button 
              className="edit-toggle"
              onClick={() => {
                setIsEditing(!isEditing)
                setTimeout(() => textareaRef.current?.focus(), 100)
              }}
            >
              {isEditing ? 'Bloquear' : 'Editar'}
            </button>
          </div>
          <textarea
            ref={textareaRef}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className={`markdown-editor ${isEditing ? 'editing' : ''}`}
            placeholder="Escribe tu markdown aqui..."
            readOnly={!isEditing}
            spellCheck={false}
          />
        </div>

        <div className="preview-panel">
          <div className="panel-header">
            <span className="panel-title">Vista Previa</span>
          </div>
          <div className="markdown-preview">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {content}
            </ReactMarkdown>
          </div>
        </div>
      </div>

      <div className="lesson-info">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/>
          <path d="M12 16v-4M12 8h.01"/>
        </svg>
        <p>Lección {markdownLessons[selected].id} de {markdownLessons.length}: {markdownLessons[selected].title}</p>
      </div>
    </div>
  )
}

export default MarkdownPractice