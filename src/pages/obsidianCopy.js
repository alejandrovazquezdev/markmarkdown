// Copy bilingue de /obsidian.

export const obsidianCopy = {
  es: {
    back: '← markmarkdown',
    label: '// obsidian',
    heroKicker: 'apartado · segundo cerebro',
    heroTitleA: 'Tu baúl,',
    heroTitleB: 'enlace por enlace.',
    heroSub:
      'Obsidian usa markdown con superpoderes: [[enlaces]] entre notas, ![[incrustados]] de imágenes y fragmentos, citas exactas de bloques y una vista gráfica viva. Aquí lo aprendes tocando todo.',
    startCta: 'Empezar ↓',
    graphCta: 'Ir al grafo ↓',
    explorerTitle: 'Explorador',
    viewerTitle: 'Nota',
    lessonsKicker: '// lecciones',
    lessonsTitle: 'Siete ideas, de la más simple a la más viva.',
    lessons: [
      {
        id: 'links',
        title: '01 · Enlazar notas con [[ ]]',
        intro: [
          'En markdown normal un enlace necesita URL. En Obsidian basta el nombre de la nota entre corchetes dobles: [[Proyectos]]. Al escribirlo la nota destino se ilumina en el explorador y el grafo dibuja una arista nueva.',
          'Escríbelo abajo: cuando completes el enlace verás el chip violeta y la mini vista gráfica conectando tu nota actual.',
        ],
        tips: ['Funciona con el nombre exacto de la nota.', 'Puedes enlazar notas que aún no existen.'],
        drill: 'Conecta con [[Proyectos]] hoy.',
      },
      {
        id: 'image',
        title: '02 · Incrustar imágenes con ![[ ]]',
        intro: [
          'El signo ! convierte el enlace en incrustado: en vez de un chip, el contenido aparece dentro de tu nota. Con imágenes es mágico: ![[imagenejemplo.png]] muestra la foto ya precargada con animación de aparición.',
          'La imagen vive en 999-Imagenes del explorador. Selecciónala para verla sola.',
        ],
        tips: ['El archivo debe existir en el baúl.', 'Formatos: png, jpg, gif, svg, webp.'],
        drill: 'Mira el boceto:\n\n![[imagenejemplo.png]]',
      },
      {
        id: 'resize',
        title: '03 · Tamaño dinámico con |px',
        intro: [
          'Una barra vertical y un número controlan el ancho: ![[imagenejemplo.png|400]] la deja en 400px. En esta página el cambio es animado: la imagen se encoge y crece con una transición suave.',
          'Mueve el deslizador y mira la sintaxis generarse sola. Luego escríbela tú en el drill.',
        ],
        tips: ['Solo el ancho: la altura se ajusta sola.', 'Máximo razonable: 900px.'],
        drill: '![[imagenejemplo.png|400]]',
        sliderLabel: 'Ancho de la imagen',
      },
      {
        id: 'transclude',
        title: '04 · Incrustar otra nota entera',
        intro: [
          'Lo mismo funciona con notas: ![[Proyectos]] vuelca el contenido de esa nota dentro de la tuya, en paralelo. Cambia el original y el fragmento se actualiza solo: una sola fuente de verdad.',
          'Pulsa «ver original» para abrir Proyectos en el visor y comparar lado a lado.',
        ],
        tips: ['Ideal para índices y mapas de contenido.', 'No dupliques: incrusta.'],
        drill: '![[Proyectos]]',
        seeOriginal: 'Ver original en el visor →',
      },
      {
        id: 'blockref',
        title: '05 · Citar una frase exacta con #^id',
        intro: [
          '¿Y si solo quieres UNA frase de otra nota? Cada bloque puede llevar un id: la nota Ideas guarda «Toda nota es una semilla. ^semilla». La sintaxis ![[Ideas#^semilla]] plasma exactamente esa frase al lado de la tuya.',
          'Es la cita de precisión quirúrgica del segundo cerebro.',
        ],
        tips: ['El ^id vive al final del bloque citado.', 'Si el bloque no existe, verás un aviso.'],
        drill: '![[Ideas#^semilla]]',
      },
      {
        id: 'alias',
        title: '06 · Alias y secciones',
        intro: [
          'El texto visible no tiene que ser el nombre del archivo: [[Proyectos|mi trabajo]] muestra «mi trabajo» pero enlaza Proyectos. Y [[Ideas#Metas]] salta directo a una sección con ›.',
          'Así el texto fluye natural y los enlaces siguen exactos.',
        ],
        tips: ['Formato: [[nota|texto visible]].', 'Formato: [[nota#Sección]].'],
        drill: 'Abre [[Proyectos|mi trabajo]] y [[Ideas#Metas]].',
      },
      {
        id: 'graph',
        title: '07 · La vista gráfica, de verdad',
        intro: [
          'Este de abajo no es un adorno: es el grafo real de este mini baúl, con física. Arrastra los nodos, haz zoom, pasa el cursor para ver vecinos. Cada arista nace de un [[enlace]] que escribiste en las lecciones.',
          'Pulsa «recorrer conexiones» para iluminarlas una por una, en el orden en que las aprendiste.',
        ],
        tips: ['Los nodos huérfanos también cuentan: enlázalos.', 'El centro verde eres tú: esta nota.'],
        tourNext: 'Recorrer conexiones →',
        tourReset: 'Reiniciar',
        tourDone: 'Grafo completo ✓',
      },
    ],
    ctaTitle: '¿Dominado el baúl?',
    ctaSub: 'Vuelve al trainer y rompe tu récord de PPM.',
    ctaBtn: 'Abrir trainer →',
  },
  en: {
    back: '← markmarkdown',
    label: '// obsidian',
    heroKicker: 'section · second brain',
    heroTitleA: 'Your vault,',
    heroTitleB: 'link by link.',
    heroSub:
      'Obsidian is markdown with superpowers: [[links]] between notes, ![[embeds]] of images and fragments, exact block quotes and a living graph view. Here you learn by touching everything.',
    startCta: 'Start ↓',
    graphCta: 'Go to graph ↓',
    explorerTitle: 'Explorer',
    viewerTitle: 'Note',
    lessonsKicker: '// lessons',
    lessonsTitle: 'Seven ideas, from simplest to liveliest.',
    lessons: [
      {
        id: 'links',
        title: '01 · Link notes with [[ ]]',
        intro: [
          'Plain markdown links need a URL. In Obsidian the note name in double brackets is enough: [[Projects]]. As you type it, the target note lights up in the explorer and the graph draws a new edge.',
          'Type it below: when the link completes you will see the violet chip and the mini graph connecting your current note.',
        ],
        tips: ['It matches the exact note name.', 'You can link notes that do not exist yet.'],
        drill: 'Connect with [[Projects]] today.',
      },
      {
        id: 'image',
        title: '02 · Embed images with ![[ ]]',
        intro: [
          'The ! turns a link into an embed: instead of a chip, the content appears inside your note. With images it feels magic: ![[imagenejemplo.png]] shows the preloaded photo with an appear animation.',
          'The image lives in 999-Images in the explorer. Select it to view it alone.',
        ],
        tips: ['The file must exist in the vault.', 'Formats: png, jpg, gif, svg, webp.'],
        drill: 'Look at the sketch:\n\n![[imagenejemplo.png]]',
      },
      {
        id: 'resize',
        title: '03 · Dynamic size with |px',
        intro: [
          'A pipe and a number control the width: ![[imagenejemplo.png|400]] pins it to 400px. On this page the change is animated: the image shrinks and grows with a smooth transition.',
          'Drag the slider and watch the syntax generate itself. Then type it yourself in the drill.',
        ],
        tips: ['Width only: height follows along.', 'Sane maximum: 900px.'],
        drill: '![[imagenejemplo.png|400]]',
        sliderLabel: 'Image width',
      },
      {
        id: 'transclude',
        title: '04 · Embed a whole note',
        intro: [
          'The same works with notes: ![[Projects]] pours that note content inside yours, side by side. Edit the original and the fragment updates itself: a single source of truth.',
          'Hit “see original” to open Projects in the viewer and compare side by side.',
        ],
        tips: ['Perfect for indexes and maps of content.', 'Do not duplicate: transclude.'],
        drill: '![[Projects]]',
        seeOriginal: 'See original in the viewer →',
      },
      {
        id: 'blockref',
        title: '05 · Quote one exact phrase with #^id',
        intro: [
          'What if you want just ONE phrase from another note? Every block can carry an id: the Ideas note keeps “Every note is a seed. ^seed”. The syntax ![[Ideas#^seed]] lays exactly that phrase next to yours.',
          'It is the surgical quote of the second brain.',
        ],
        tips: ['The ^id lives at the end of the quoted block.', 'If the block is missing, you will see a warning.'],
        drill: '![[Ideas#^seed]]',
      },
      {
        id: 'alias',
        title: '06 · Aliases and headings',
        intro: [
          'Visible text does not have to be the file name: [[Projects|my work]] shows “my work” but links Projects. And [[Ideas#Goals]] jumps straight to a section with ›.',
          'Text flows naturally while links stay exact.',
        ],
        tips: ['Format: [[note|visible text]].', 'Format: [[note#Heading]].'],
        drill: 'Open [[Projects|my work]] and [[Ideas#Goals]].',
      },
      {
        id: 'graph',
        title: '07 · The graph view, for real',
        intro: [
          'The one below is no decoration: it is the real graph of this tiny vault, with physics. Drag nodes, zoom, hover to see neighbors. Every edge is born from a [[link]] you typed in the lessons.',
          'Hit “walk the connections” to light them up one by one, in the order you learned them.',
        ],
        tips: ['Orphan nodes count too: link them.', 'The green center is you: this note.'],
        tourNext: 'Walk the connections →',
        tourReset: 'Reset',
        tourDone: 'Full graph ✓',
      },
    ],
    ctaTitle: 'Vault mastered?',
    ctaSub: 'Head back to the trainer and break your WPM record.',
    ctaBtn: 'Open trainer →',
  },
}
