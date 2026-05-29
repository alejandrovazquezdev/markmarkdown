export const curriculum = {
  phases: [
    {
      id: 'basics',
      title: 'Fundamentos',
      description: 'Aprende la estructura basica de markdown mientras practicas mecanografia',
      color: '#00f0ff',
      levels: [
        {
          id: 'headers',
          title: 'Encabezados',
          description: 'La estructura de todo documento',
          content: '# Encabezados\n\nLos encabezados organizan tu contenido\n\n# Titulo Principal\n\n## Seccion Uno\n\n### Subseccion\n\n#### Detalle\n\n##### Nota\n\n######Comentario',
          focus: 'Teclas de fila superior'
        },
        {
          id: 'paragraphs',
          title: 'Parrafos',
          description: 'Escribe texto fluido',
          content: 'Los parrafos son bloques de texto.\n\nEste es otro parrafo diferente.\n\nPuedes escribir varias lineas.\n\nCada linea nueva crea continuidad.',
          focus: 'Fluidez de mecanografia'
        },
        {
          id: 'emphasis',
          title: 'Enfasis',
          description: 'Resalta lo importante',
          content: 'El **negrita** marca importancia.\n\nLa *italica* indica enfasis.\n\nPuedes ***combinar*** ambos estilos.\n\nUsa ~~tachado~~ para correcciones.',
          focus: 'Simbolos especiales'
        },
        {
          id: 'lists-basic',
          title: 'Listas Simples',
          description: 'Organiza con viñetas',
          content: '- Elemento uno\n- Elemento dos\n- Elemento tres\n- Ultimo elemento\n\nLas listas mantienen orden.',
          focus: 'Guiones y Enter'
        },
        {
          id: 'links-basic',
          title: 'Enlaces',
          description: 'Conecta recursos',
          content: 'Visita [mi github](https://github.com) \n\nExplora [documentacion](https://docs.github.com)\n\nBusca en [google](https://google.com)',
          focus: 'Corchetes y parentesis'
        }
      ]
    },
    {
      id: 'intermediate',
      title: 'Intermedio',
      description: 'Amplia tu repertorio de markdown',
      color: '#ff00aa',
      levels: [
        {
          id: 'ordered-lists',
          title: 'Listas Ordenadas',
          description: 'Numeracion automatica',
          content: '1. Primer paso\n2. Segundo paso\n3. Tercer paso\n4. Cuarto paso\n5. Quinto paso',
          focus: 'Numeros y punto'
        },
        {
          id: 'nested-lists',
          title: 'Listas Anidadas',
          description: 'Jerarquia visual',
          content: '- Frontend\n  - React\n  - Vue\n  - Svelte\n- Backend\n  - Node\n  - Python\n  - Go',
          focus: 'Indentacion'
        },
        {
          id: 'code-inline',
          title: 'Codigo en Linea',
          description: 'Inline para variables',
          content: 'Usa `const` para constantes.\n\nDeclara con `let` variable.\n\nLa funcion `map()` transforma.\n\nEl metodo `filter()` limpia.',
          focus: 'Backticks'
        },
        {
          id: 'code-block',
          title: 'Bloques de Codigo',
          description: 'Multiples lineas de codigo',
          content: '```javascript\nfunction saludar(nombre) {\n  return `Hola, ${nombre}`;\n}\n\nconsole.log(saludar("Mundo"));\n```',
          focus: 'Bloques completos'
        },
        {
          id: 'quotes',
          title: 'Citas',
          description: 'Destaca quotations',
          content: '> La simplicidad es la maxima sofisticacion.\n\n> Codigo claro es mejor que comentarios confusos.\n\n> Primero hazlo funcionar, luego optimiza.',
          focus: 'Simbolo mayor'
        },
        {
          id: 'images',
          title: 'Imagenes',
          description: 'Visualiza contenido',
          content: '![Screenshot](https://ejemplo.com/img.png)\n\n![Logo](https://ejemplo.com/logo.svg)\n\n![Preview](https://ejemplo.com/preview.jpg)',
          focus: 'Exclamacion + corchetes'
        }
      ]
    },
    {
      id: 'advanced',
      title: 'Avanzado',
      description: 'Domina markdown como un pro',
      color: '#8855ff',
      levels: [
        {
          id: 'tables',
          title: 'Tablas',
          description: 'Datos estructurados',
          content: '| Lenguaje | Tipado | Popular |\n|----------|--------|---------|\n| JavaScript | Dinamico | Muy alta |\n| Python | Dinamico | Alta |\n| Rust | Estatico | Creciente |',
          focus: 'Barras y guiones'
        },
        {
          id: 'task-lists',
          title: 'Listas de Tareas',
          description: 'Checkboxes integrados',
          content: '- [x] Terminar tutorial\n- [x] Practicar ejercicios\n- [ ] Crear proyecto\n- [ ] Desplegar aplicacion\n- [ ] Documentar codigo',
          focus: 'Corchetes con x'
        },
        {
          id: 'horizontal-rules',
          title: 'Separadores',
          description: 'Divide secciones',
          content: 'Primera seccion del documento.\n\n---\n\nSegunda seccion comienza aqui.\n\n***\n\nTercer bloque visual.',
          focus: 'Guiones y asteriscos'
        },
        {
          id: 'definition-lists',
          title: 'Listas de Definicion',
          description: 'Terminos y significados',
          content: 'API\n: Interfaz de Programacion\n\nHTML\n: Lenguaje de Marcado\n\nCSS\n: Estilos en Cascada',
          focus: 'Dos puntos indentado'
        },
        {
          id: 'footnotes',
          title: 'Notas al Pie',
          description: 'Referencias sutiles',
          content: 'Esta es una oracion con nota.[^1]\n\nOtra referencia aqui.[^2]\n\n[^1]: Primera nota explicativa\n[^2]: Segunda nota detallada',
          focus: 'Corchetes con num'
        },
        {
          id: 'complex-links',
          title: 'Enlaces Avanzados',
          description: 'Referencias reutilizables',
          content: 'Visita [documentacion][doc] para detalles.\n\nRevisa [ejemplos][ejem] disponibles.\n\nConsulta [api reference][api] siempre.\n\n[doc]: https://docs.ejemplo.com\n[ejem]: https://ejemplos.ejemplo.com\n[api]: https://api.ejemplo.com',
          focus: 'Multiples referencias'
        }
      ]
    },
    {
      id: 'master',
      title: 'Master',
      description: 'Proyectos reales completos',
      color: '#ffaa00',
      levels: [
        {
          id: 'readme',
          title: 'README Completo',
          description: 'Documenta tu proyecto',
          content: '# Mi Proyecto\n\nBreve descripcion del proyecto.\n\n## Instalacion\n\n```bash\nnpm install mi-proyecto\n```\n\n## Uso\n\n```javascript\nimport { crear } from "mi-proyecto";\ncrear();\n```\n\n## Licencia\n\nMIT © 2024',
          focus: 'Documentacion completa'
        },
        {
          id: 'blog-post',
          title: 'Entrada de Blog',
          description: 'Contenido editorial',
          content: '# Como aprendi a programar\n\nDespues de meses de practica...\n\n## El comienzo\n\nTodo empezo con curiosidad...\n\n> El unico camino es practicar.\n\n## Conclusion\n\nHoy puedo decir que domine las bases.',
          focus: 'Escritura reflexiva'
        },
        {
          id: 'api-docs',
          title: 'Documentacion API',
          description: 'Referencia tecnica',
          content: '## GET /usuarios\n\nObtiene lista de usuarios.\n\n**Parametros:**\n- `id` - ID del usuario\n- `limit` - Numero maximo\n\n**Respuesta:**\n\n```json\n{\n  "usuarios": [],\n  "total": 0\n}\n```',
          focus: 'Documentacion tecnica'
        },
        {
          id: 'changelog',
          title: 'Historial de Cambios',
          description: 'Versionado semantico',
          content: '## [1.2.0] - 2024-01-15\n\n### Agregado\n- Nueva funcionalidad de export\n- Temas personalizados\n\n### Corregido\n- Bugs de rendimiento\n\n---\n\n## [1.1.0] - 2024-01-01\n\n### Agregado\n- Modo oscuro',
          focus: 'Formato estructurado'
        }
      ]
    }
  ]
}

export const getTotalLevels = () => {
  return curriculum.phases.reduce((total, phase) => total + phase.levels.length, 0)
}

export const getLevelByIndex = (globalIndex) => {
  let currentIndex = 0
  for (const phase of curriculum.phases) {
    for (const level of phase.levels) {
      if (currentIndex === globalIndex) {
        return { ...level, phase }
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