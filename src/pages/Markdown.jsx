import { useState, useEffect, useRef } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import anime from 'animejs'

const lessons = [
  { 
    id: 1,
    title: 'Encabezados',
    description: 'Estructura tu documento',
    content: '# Encabezados\n\nLos encabezados van del 1 al 6\n\n# H1 - Titulo Principal\n## H2 - Seccion\n### H3 - Subseccion\n#### H4 - Miniseccion\n##### H5\n###### H6'
  },
  { 
    id: 2,
    title: 'Formato de Texto',
    description: 'Dale estilo a tu texto',
    content: '# Formato de Texto\n\n**Negrita** - texto importante\n\n*Italica* - enfasis\n\n***Negrita e Italiana***\n\n~~Tachado~~ - texto eliminado'
  },
  { 
    id: 3,
    title: 'Enlaces',
    description: 'Conecta recursos',
    content: '# Enlaces\n\n[Texto visible](https://ejemplo.com)\n\n[Enlace con titulo](https://ejemplo.com "Descripcion")\n\n[Referencia][ref]\n\n[ref]: https://referencia.com'
  },
  { 
    id: 4,
    title: 'Listas',
    description: 'Organiza informacion',
    content: '# Listas\n\n## Desordenadas\n- Elemento uno\n- Elemento dos\n  - Sub elemento\n  - Otro mas\n\n## Ordenadas\n1. Primero\n2. Segundo\n3. Tercero'
  },
  { 
    id: 5,
    title: 'Codigo',
    description: 'Inserta codigo fuente',
    content: '# Codigo\n\n`Codigo en linea`\n\n```javascript\nconst saludar = (nombre) => {\n  return `Hola, ${nombre}!`;\n};\n\nconsole.log(saludar("Mundo"));\n```'
  },
  { 
    id: 6,
    title: 'Tablas',
    description: 'Tablas y mas',
    content: '# Tablas\n\n| Lenguaje | Tipo | Dificultad |\n|----------|------|------------|\n| JavaScript | Dinamico | Facil |\n| Python | Interpretado | Facil |\n| Rust | Compilado | Dificil |'
  }
]

function Markdown() {
  const [selected, setSelected] = useState(0)
  const [content, setContent] = useState(lessons[0].content)
  const [isEditing, setIsEditing] = useState(false)
  const containerRef = useRef(null)
  const textareaRef = useRef(null)

  useEffect(() => {
    anime({
      targets: containerRef.current,
      opacity: [0, 1],
      translateY: [40, 0],
      duration: 800,
      easing: 'easeOutExpo'
    })
  }, [])

  const handleLessonChange = (idx) => {
    setSelected(idx)
    setContent(lessons[idx].content)
    setIsEditing(false)
  }

  const toggleEdit = () => {
    setIsEditing(!isEditing)
    if (!isEditing) {
      setTimeout(() => textareaRef.current?.focus(), 100)
    }
  }

  return (
    <div className="page markdown-page" ref={containerRef}>
      <div className="page-header">
        <h1>Markdown</h1>
        <p>Aprende escribiendo y viendo el resultado</p>
      </div>

      <div className="lesson-tabs">
        {lessons.map((lesson, i) => (
          <button
            key={lesson.id}
            className={`lesson-btn ${selected === i ? 'active' : ''}`}
            onClick={() => handleLessonChange(i)}
          >
            <span className="btn-number">{String(lesson.id).padStart(2, '0')}</span>
            <span className="btn-text">{lesson.title}</span>
          </button>
        ))}
      </div>

      <div className="lesson-info">
        <div className="lesson-info-text">
          <h3>Lección {selected + 1} de {lessons.length}</h3>
          <p>{lessons[selected].description}</p>
        </div>
        <button className={`edit-btn ${isEditing ? 'locked' : ''}`} onClick={toggleEdit}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {isEditing ? (
              <>
                <rect x="3" y="11" width="18" height="11" rx="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </>
            ) : (
              <>
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
              </>
            )}
          </svg>
          {isEditing ? 'Bloqueado' : 'Editar'}
        </button>
      </div>

      <div className="editor-layout">
        <div className="editor-panel">
          <div className="panel-header">
            <span className="panel-title">Editor</span>
            <span className="panel-hint">{isEditing ? 'Escribiendo...' : 'Clic en Editar para modificar'}</span>
          </div>
          <textarea
            ref={textareaRef}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className={`code-editor ${isEditing ? 'editing' : ''}`}
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
    </div>
  )
}

export default Markdown