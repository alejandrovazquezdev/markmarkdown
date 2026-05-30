export const curriculum = {
  phases: [
    {
      id: 'basics',
      color: '#00ff9d',
      levels: [
        {
          id: 'headers',
          content: {
            en: '# Headers\n\nHeaders organize your content\n\n# Main Title\n\n## Section One\n\n### Subsection\n\n#### Detail\n\n##### Note\n\n###### Comment',
            es: '# Encabezados\n\nLos encabezados organizan tu contenido\n\n# Titulo Principal\n\n## Seccion Uno\n\n### Subseccion\n\n#### Detalle\n\n##### Nota\n\n###### Comentario'
          },
          focus: {
            en: 'Top row keys',
            es: 'Teclas de fila superior'
          }
        },
        {
          id: 'paragraphs',
          content: {
            en: 'Paragraphs are blocks of text.\n\nThis is another different paragraph.\n\nYou can write multiple lines.\n\nEach new line creates continuity.',
            es: 'Los parrafos son bloques de texto.\n\nEste es otro parrafo diferente.\n\nPuedes escribir varias lineas.\n\nCada linea nueva crea continuidad.'
          },
          focus: {
            en: 'Typing fluency',
            es: 'Fluidez de mecanografia'
          }
        },
        {
          id: 'emphasis',
          content: {
            en: 'The **bold** marks importance.\n\nThe *italic* indicates emphasis.\n\nYou can ***combine*** both styles.\n\nUse ~~strikethrough~~ for corrections.',
            es: 'El **negrita** marca importancia.\n\nLa *italica* indica enfasis.\n\nPuedes ***combinar*** ambos estilos.\n\nUsa ~~tachado~~ para correcciones.'
          },
          focus: {
            en: 'Special symbols',
            es: 'Simbolos especiales'
          }
        },
        {
          id: 'lists-basic',
          content: {
            en: '- First item\n- Second item\n- Third item\n- Last item\n\nLists keep things organized.',
            es: '- Elemento uno\n- Elemento dos\n- Elemento tres\n- Ultimo elemento\n\nLas listas mantienen orden.'
          },
          focus: {
            en: 'Dash and Enter',
            es: 'Guiones y Enter'
          }
        },
        {
          id: 'links-basic',
          content: {
            en: 'Visit [my github](https://github.com)\n\nExplore [documentation](https://docs.github.com)\n\nSearch on [google](https://google.com)',
            es: 'Visita [mi github](https://github.com)\n\nExplora [documentacion](https://docs.github.com)\n\nBusca en [google](https://google.com)'
          },
          focus: {
            en: 'Brackets and parentheses',
            es: 'Corchetes y parentesis'
          }
        },
        {
          id: 'autolinks',
          content: {
            en: 'Visit https://github.com directly.\n\nWrite to contact@example.com.\n\nCheck https://docs.python.org.\n\nReview <https://markdownguide.com>',
            es: 'Visita https://github.com directamente.\n\nEscribe a contacto@ejemplo.com.\n\nConsulta https://docs.python.org.\n\nRevisa <https://markdownguide.com>'
          },
          focus: {
            en: 'Direct URLs and email',
            es: 'URLs directas y email'
          }
        },
        {
          id: 'escaped-chars',
          content: {
            en: 'Escaping characters is useful:\n\n\\*asterisks\\*\n\\#hash\\#\n\\`backticks\\`\n\nThis shows \\*how\\* to write literal symbols.',
            es: 'Escapar caracteres es util:\n\n\\*asteriscos\\*\n\\#numeral\\#\n\\`backticks\\`\n\nEsto muestra \\*como\\* escribir simbolos literales.'
          },
          focus: {
            en: 'Backslash',
            es: 'Barra invertida'
          }
        }
      ]
    },
    {
      id: 'intermediate',
      color: '#ff9f43',
      levels: [
        {
          id: 'ordered-lists',
          content: {
            en: '1. First step\n2. Second step\n3. Third step\n4. Fourth step\n5. Fifth step',
            es: '1. Primer paso\n2. Segundo paso\n3. Tercer paso\n4. Cuarto paso\n5. Quinto paso'
          },
          focus: {
            en: 'Numbers and dot',
            es: 'Numeros y punto'
          }
        },
        {
          id: 'nested-lists',
          content: {
            en: '- Frontend\n  - React\n  - Vue\n  - Svelte\n- Backend\n  - Node\n  - Python\n  - Go',
            es: '- Frontend\n  - React\n  - Vue\n  - Svelte\n- Backend\n  - Node\n  - Python\n  - Go'
          },
          focus: {
            en: 'Indentation',
            es: 'Indentacion'
          }
        },
        {
          id: 'code-inline',
          content: {
            en: 'Use `const` for constants.\n\nDeclare with `let` variable.\n\nThe function `map()` transforms.\n\nThe method `filter()` cleans.',
            es: 'Usa `const` para constantes.\n\nDeclara con `let` variable.\n\nLa funcion `map()` transforma.\n\nEl metodo `filter()` limpia.'
          },
          focus: {
            en: 'Backticks',
            es: 'Backticks'
          }
        },
        {
          id: 'code-block',
          content: {
            en: '```javascript\nfunction greet(name) {\n  return `Hello, ${name}`;\n}\n\nconsole.log(greet("World"));\n```',
            es: '```javascript\nfunction saludar(nombre) {\n  return `Hola, ${nombre}`;\n}\n\nconsole.log(saludar("Mundo"));\n```'
          },
          focus: {
            en: 'Complete blocks',
            es: 'Bloques completos'
          }
        },
        {
          id: 'quotes',
          content: {
            en: '> Simplicity is the ultimate sophistication.\n\n> Clear code is better than confusing comments.\n\n> First make it work, then optimize.',
            es: '> La simplicidad es la maxima sofisticacion.\n\n> Codigo claro es mejor que comentarios confusos.\n\n> Primero hazlo funcionar, luego optimiza.'
          },
          focus: {
            en: 'Greater symbol',
            es: 'Simbolo mayor'
          }
        },
        {
          id: 'images',
          content: {
            en: '![Screenshot](https://example.com/img.png)\n\n![Logo](https://example.com/logo.svg)\n\n![Preview](https://example.com/preview.jpg)',
            es: '![Screenshot](https://ejemplo.com/img.png)\n\n![Logo](https://ejemplo.com/logo.svg)\n\n![Preview](https://ejemplo.com/preview.jpg)'
          },
          focus: {
            en: 'Exclamation + brackets',
            es: 'Exclamacion + corchetes'
          }
        },
        {
          id: 'emojis',
          content: {
            en: 'The project uses :rocket: for deploys.\n\nThe team is :sparkles: with the results.\n\nDo not forget the :warning: in critical cases.\n\nUse :bug: to report errors.\n\nThe button is :point_right: here.',
            es: 'El proyecto usa :rocket: para deploys.\n\nEl equipo esta :sparkles: con los resultados.\n\nNo olvides el :warning: en casos criticos.\n\nUsa :bug: para reportar errores.\n\nEl boton es :point_right: aqui.'
          },
          focus: {
            en: 'Colon and name',
            es: 'Dos puntos y nombre'
          }
        },
        {
          id: 'strikethrough',
          content: {
            en: 'This text ~~is no longer valid~~.\n\nThe old ~~has been~~ replaced.\n\nThe ~~deprecated~~ function was removed.\n\nThe ~~previous~~ plan completely changed.',
            es: 'Este texto ~~ya no es valido~~.\n\nLo viejo ~~ha sido~~ reemplazado.\n\nLa funcion ~~deprecated~~ fue removida.\n\nEl plan ~~anterior~~ cambio completamente.'
          },
          focus: {
            en: 'Double tilde',
            es: 'Doble virgulilla'
          }
        }
      ]
    },
    {
      id: 'advanced',
      color: '#c44dff',
      levels: [
        {
          id: 'tables',
          content: {
            en: '| Language | Typing | Popularity |\n|----------|--------|------------|\n| JavaScript | Dynamic | Very high |\n| Python | Dynamic | High |\n| Rust | Static | Growing |',
            es: '| Lenguaje | Tipado | Popular |\n|----------|--------|---------|\n| JavaScript | Dinamico | Muy alta |\n| Python | Dinamico | Alta |\n| Rust | Estatico | Creciente |'
          },
          focus: {
            en: 'Bars and dashes',
            es: 'Barras y guiones'
          }
        },
        {
          id: 'task-lists',
          content: {
            en: '- [x] Finish tutorial\n- [x] Practice exercises\n- [ ] Create project\n- [ ] Deploy application\n- [ ] Document code',
            es: '- [x] Terminar tutorial\n- [x] Practicar ejercicios\n- [ ] Crear proyecto\n- [ ] Desplegar aplicacion\n- [ ] Documentar codigo'
          },
          focus: {
            en: 'Brackets with x',
            es: 'Corchetes con x'
          }
        },
        {
          id: 'horizontal-rules',
          content: {
            en: 'First section of the document.\n\n---\n\nSecond section starts here.\n\n***\n\nThird visual block.',
            es: 'Primera seccion del documento.\n\n---\n\nSegunda seccion comienza aqui.\n\n***\n\nTercer bloque visual.'
          },
          focus: {
            en: 'Dashes and asterisks',
            es: 'Guiones y asteriscos'
          }
        },
        {
          id: 'definition-lists',
          content: {
            en: 'API\n: Application Programming Interface\n\nHTML\n: HyperText Markup Language\n\nCSS\n: Cascading Style Sheets',
            es: 'API\n: Interfaz de Programacion\n\nHTML\n: Lenguaje de Marcado\n\nCSS\n: Estilos en Cascada'
          },
          focus: {
            en: 'Indented colon',
            es: 'Dos puntos indentado'
          }
        },
        {
          id: 'footnotes',
          content: {
            en: 'This is a sentence with a note.[^1]\n\nAnother reference here.[^2]\n\n[^1]: First explanatory note\n[^2]: Second detailed note',
            es: 'Esta es una oracion con nota.[^1]\n\nOtra referencia aqui.[^2]\n\n[^1]: Primera nota explicativa\n[^2]: Segunda nota detallada'
          },
          focus: {
            en: 'Brackets with num',
            es: 'Corchetes con num'
          }
        },
        {
          id: 'complex-links',
          content: {
            en: 'Visit [documentation][doc] for details.\n\nReview [examples][ex] available.\n\nCheck [api reference][api] always.\n\n[doc]: https://docs.example.com\n[ex]: https://examples.example.com\n[api]: https://api.example.com',
            es: 'Visita [documentacion][doc] para detalles.\n\nRevisa [ejemplos][ejem] disponibles.\n\nConsulta [api reference][api] siempre.\n\n[doc]: https://docs.ejemplo.com\n[ejem]: https://ejemplos.ejemplo.com\n[api]: https://api.ejemplo.com'
          },
          focus: {
            en: 'Multiple references',
            es: 'Multiples referencias'
          }
        },
        {
          id: 'callouts',
          content: {
            en: '> [!NOTE]\n> Important information for the reader.\n\n> [!WARNING]\n> Something that requires special attention.\n\n> [!TIP]\n> A useful tip to improve.\n\n> [!DANGER]\n> Avoid this common error.',
            es: '> [!NOTE]\n> Informacion importante para el lector.\n\n> [!WARNING]\n> Algo que requiere atencion especial.\n\n> [!TIP]\n> Un consejo util para mejorar.\n\n> [!DANGER]\n> Evita este error comunmente.'
          },
          focus: {
            en: 'Special syntax',
            es: 'Sintaxis especial'
          }
        },
        {
          id: 'mermaid',
          content: {
            en: '```mermaid\ngraph TD\n    A[Start] --> B{Decision}\n    B -->|Yes| C[Process]\n    B -->|No| D[End]\n    C --> D\n```',
            es: '```mermaid\ngraph TD\n    A[Inicio] --> B{Decision}\n    B -->|Si| C[Proceso]\n    B -->|No| D[Fin]\n    C --> D\n```'
          },
          focus: {
            en: 'Mermaid syntax',
            es: 'Sintaxis Mermaid'
          }
        }
      ]
    },
    {
      id: 'master',
      color: '#ff6b9d',
      levels: [
        {
          id: 'readme',
          content: {
            en: '# My Project\n\nBrief description of the project.\n\n## Installation\n\n```bash\nnpm install my-project\n```\n\n## Usage\n\n```javascript\nimport { create } from "my-project";\ncreate();\n```\n\n## License\n\nMIT © 2024',
            es: '# Mi Proyecto\n\nBreve descripcion del proyecto.\n\n## Instalacion\n\n```bash\nnpm install mi-proyecto\n```\n\n## Uso\n\n```javascript\nimport { crear } from "mi-proyecto";\ncrear();\n```\n\n## Licencia\n\nMIT © 2024'
          },
          focus: {
            en: 'Complete documentation',
            es: 'Documentacion completa'
          }
        },
        {
          id: 'blog-post',
          content: {
            en: '# How I Learned to Program\n\nAfter months of practice...\n\n## The Beginning\n\nEverything started with curiosity...\n\n> The only path is to practice.\n\n## Conclusion\n\nToday I can say I mastered the basics.',
            es: '# Como aprendi a programar\n\nDespues de meses de practica...\n\n## El comienzo\n\nTodo empezo con curiosidad...\n\n> El unico camino es practicar.\n\n## Conclusion\n\nHoy puedo decir que domine las bases.'
          },
          focus: {
            en: 'Reflective writing',
            es: 'Escritura reflexiva'
          }
        },
        {
          id: 'api-docs',
          content: {
            en: '## GET /users\n\nGets list of users.\n\n**Parameters:**\n- `id` - User ID\n- `limit` - Maximum number\n\n**Response:**\n\n```json\n{\n  "users": [],\n  "total": 0\n}\n```',
            es: '## GET /usuarios\n\nObtiene lista de usuarios.\n\n**Parametros:**\n- `id` - ID del usuario\n- `limit` - Numero maximo\n\n**Respuesta:**\n\n```json\n{\n  "usuarios": [],\n  "total": 0\n}\n```'
          },
          focus: {
            en: 'Technical documentation',
            es: 'Documentacion tecnica'
          }
        },
        {
          id: 'changelog',
          content: {
            en: '## [1.2.0] - 2024-01-15\n\n### Added\n- New export functionality\n- Custom themes\n\n### Fixed\n- Performance bugs\n\n---\n\n## [1.1.0] - 2024-01-01\n\n### Added\n- Dark mode',
            es: '## [1.2.0] - 2024-01-15\n\n### Agregado\n- Nueva funcionalidad de export\n- Temas personalizados\n\n### Corregido\n- Bugs de rendimiento\n\n---\n\n## [1.1.0] - 2024-01-01\n\n### Agregado\n- Modo oscuro'
          },
          focus: {
            en: 'Structured format',
            es: 'Formato estructurado'
          }
        }
      ]
    },
    {
      id: 'professional',
      color: '#00d4ff',
      levels: [
        {
          id: 'email-template',
          content: {
            en: '# Subject: Project Update\n\nHello [Name],\n\nI am writing to inform you about the progress.\n\n## Important Points\n\n- The project is advancing as planned\n- We have a new :calendar: for delivery\n- Any questions, reply to this email\n\nBest regards,\nYour Team',
            es: '# Asunto: Actualizacion del Proyecto\n\nHola [Nombre],\n\nTe escribo para informarte sobre el progreso.\n\n## Puntos Importantes\n\n- El proyecto avanza segun lo planeado\n- Tenemos un nuevo :calendar: para la entrega\n- Cualquier duda, responde a este email\n\nSaludos cordiales,\nTu Equipo'
          },
          focus: {
            en: 'Email structure',
            es: 'Estructura de emails'
          }
        },
        {
          id: 'html-inline',
          content: {
            en: 'You can use inline HTML:\n\n<span style="color:red">Red text</span>\n\n<kbd>Ctrl</kbd> + <kbd>C</kbd> to copy\n\n<mark>Highlighted text</mark> with mark\n\n<details>\n<summary>Click to expand</summary>\nHidden content here.\n</details>',
            es: 'Puedes usar HTML inline:\n\n<span style="color:red">Texto en rojo</span>\n\n<kbd>Ctrl</kbd> + <kbd>C</kbd> para copiar\n\n<mark>Texto resaltado</mark> con mark\n\n<details>\n<summary>Click para expandir</summary>\nContenido oculto aqui.\n</details>'
          },
          focus: {
            en: 'HTML tags',
            es: 'Etiquetas HTML'
          }
        },
        {
          id: 'math-latex',
          content: {
            en: 'Inline formulas use $:\n\nThe area is $A = \\pi r^2$.\n\nBlock formulas:\n\n$$\\sum_{i=1}^{n} x_i = x_1 + x_2 + ...$$\n\nEuler formula: $e^{i\\pi} + 1 = 0$',
            es: 'Las formulas en linea usan $:\n\nEl area es $A = \\pi r^2$.\n\nFormulas en bloque:\n\n$$\\sum_{i=1}^{n} x_i = x_1 + x_2 + ...$$\n\nLa formula de Euler: $e^{i\\pi} + 1 = 0$'
          },
          focus: {
            en: 'Math syntax',
            es: 'Sintaxis matematica'
          }
        },
        {
          id: 'frontmatter',
          content: {
            en: '---\ntitle: My Document\nauthor: Name\ndate: 2024-01-15\ntags:\n  - tutorial\n  - markdown\n---\n\n# Content of the document\n\nThe frontmatter goes at the start of the file.',
            es: '---\ntitle: Mi Documento\nauthor: Nombre\ndate: 2024-01-15\ntags:\n  - tutorial\n  - markdown\n---\n\n# Contenido del documento\n\nEl frontmatter va al inicio del archivo.'
          },
          focus: {
            en: 'YAML in markdown',
            es: 'YAML en markdown'
          }
        },
        {
          id: 'table-advanced',
          content: {
            en: '| Left | Center | Right |\n|:------|:------:|------:|\n| Data 1 | Data 2 | Data 3 |\n| Data A | Data B | Data C |\n\nTables with Footnotes:\n\n| A | B | C |\n|:-:|:-:|:-:|\n| 1 | 2 | 3 | [^1]\n\n[^1]: Table note',
            es: '| Izquierda | Centro | Derecha |\n|:----------|:------:|--------:|\n| Dato 1 | Dato 2 | Dato 3 |\n| Dato A | Dato B | Dato C |\n\nTablas con Footnotes:\n\n| A | B | C |\n|:-:|:-:|:-:|\n| 1 | 2 | 3 | [^1]\n\n[^1]: Nota de la tabla'
          },
          focus: {
            en: 'Alignment and extensions',
            es: 'Alineacion y extensiones'
          }
        },
        {
          id: 'task-advanced',
          content: {
            en: '- [x] Phase 1: Planning\n  - [x] Create documentation\n  - [x] Design architecture\n- [ ] Phase 2: Development\n  - [ ] Implement API\n  - [ ] Create frontend\n  - [ ] Write tests\n- [ ] Phase 3: Deployment',
            es: '- [x] Fase 1: Planejamento\n  - [x] Crear documentacion\n  - [x] Disenar arquitectura\n- [ ] Fase 2: Desarrollo\n  - [ ] Implementar API\n  - [ ] Crear frontend\n  - [ ] Escribir tests\n- [ ] Fase 3: Despliegue'
          },
          focus: {
            en: 'Task hierarchy',
            es: 'Jerarquia de tareas'
          }
        },
        {
          id: 'comparison',
          content: {
            en: '| Feature | Option A | Option B |\n|:---------|:--------:|:--------:|\n| Speed | :green_circle: | :red_circle: |\n| Ease | :green_circle: | :green_circle: |\n| Cost | :red_circle: | :green_circle: |\n| Scalability | :yellow_circle: | :green_circle: |',
            es: '| Caracteristica | Opcion A | Opcion B |\n|:---------------|:--------:|:--------:|\n| Velocidad | :green_circle: | :red_circle: |\n| Facilidad | :green_circle: | :green_circle: |\n| Costo | :red_circle: | :green_circle: |\n| Escalabilidad | :yellow_circle: | :green_circle: |'
          },
          focus: {
            en: 'Emojis in tables',
            es: 'Emojis en tablas'
          }
        }
      ]
    }
  ]
}

export const getTotalLevels = () => {
  return curriculum.phases.reduce((total, phase) => total + phase.levels.length, 0)
}

export const getLevelByIndex = (globalIndex, lang = 'en') => {
  let currentIndex = 0
  for (const phase of curriculum.phases) {
    for (const level of phase.levels) {
      if (currentIndex === globalIndex) {
        return {
          ...level,
          content: level.content[lang] || level.content.en,
          focus: level.focus[lang] || level.focus.en,
          phase
        }
      }
      currentIndex++
    }
  }
  return null
}

export const getProgress = (completedLevels) => {
  const total = getTotalLevels()
  return Math.round((completedLevels.length / total) * 100)
}
