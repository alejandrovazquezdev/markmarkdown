const roadmapSections = [
  {
    title: 'Mecanografia',
    items: [
      'Postura y posicion de manos',
      'Fila inicio: asdf jkl',
      'Fila superior: qwer uio',
      'Fila inferior: zxcv m,.',
      'Numeros y simbolos',
      'Practica de velocidad',
      'Practica de precision'
    ]
  },
  {
    title: 'Markdown',
    items: [
      'Encabezados',
      'Formato de texto',
      'Enlaces e imagenes',
      'Listas',
      'Tablas',
      'Codigo inline y bloques',
      'Blockquotes',
      'GMF extensions'
    ]
  },
  {
    title: 'Vim',
    items: [
      'Modos: normal, insert, visual',
      'Movimiento: h,j,k,l,w,b',
      'Edicion: i,a,x,r,d,y,p',
      'Busqueda: /,n,N',
      'Comandos: :,w,q',
      'Registers y macros',
      'Splits y tabs',
      'Plugins esenciales'
    ]
  }
]

function Roadmap() {
  return (
    <section className="roadmap">
      <h2>Roadmap</h2>
      <div className="roadmap-grid">
        {roadmapSections.map((section, i) => (
          <div key={i} className="roadmap-card">
            <h3>{section.title}</h3>
            <ul>
              {section.items.map((item, j) => (
                <li key={j}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Roadmap