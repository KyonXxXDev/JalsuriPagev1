import gsap from 'gsap'
import { useEffect, useRef, useState } from 'react'

function App() {
  const containerRef = useRef<HTMLDivElement>(null)
  const displacementMapRef = useRef<SVGFEDisplacementMapElement>(null)
  const feImageRef = useRef<SVGFEImageElement>(null)
  const [count, setCount] = useState(0)

  useEffect(() => {
    // gsap.context asegura que la animación se limpie correctamente al desmontar el componente
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 })
      
      tl.fromTo(
        feImageRef.current,
        // Usamos valores numéricos alineados con el viewBox (500x500)
        { attr: { width: 0, height: 0, x: 250, y: 250 } },
        { attr: { width: 500, height: 500, x: 0, y: 0 }, duration: 2, ease: 'power2.out' }
      ).fromTo(
        displacementMapRef.current,
        { attr: { scale: 60 } },
        { attr: { scale: 0 }, duration: 2, ease: 'power2.out' },
        '<' // El '<' hace que esta animación inicie exactamente al mismo tiempo que la anterior
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="min-h-screen bg-black text-white flex flex-col items-center justify-center font-sans">
      
      <section id="center" className="mb-10 text-center space-y-4 z-100">
        <div>
          <h1 className="text-3xl font-bold">Efecto Ripple con GSAP</h1>
        </div>
        <button
          type="button"
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
      </section>

      {/* Contenedor del SVG */}
      <div className="relative flex items-center justify-center w-full max-w-[500px]">
        <svg 
          width="100%" 
          height="100%" 
          viewBox="0 0 500 500" 
          className="rounded-xl overflow-hidden shadow-2xl"
        >
          <defs>
            <filter id="ripple-filter">
              <feImage
                ref={feImageRef}
                x="250" 
                y="250" 
                width="0" 
                height="0"
                href="https://i.imgur.com/8K59X4c.png"
                result="rippleImage"
                preserveAspectRatio="none"
              />
              <feDisplacementMap
                ref={displacementMapRef}
                id="displacement-map"
                xChannelSelector="R"
                yChannelSelector="G"
                in="SourceGraphic"
                in2="rippleImage"
                result="displacementMap"
                colorInterpolationFilters="sRGB"
                scale="0"
              />
              <feComposite operator="in" in2="rippleImage" />
            </filter>
          </defs>
          
          <g id="logo">
            {/* Imagen de fondo base */}
            <image
              width="500"
              height="500"
              href="https://aguademesajalsuri.com/wp-content/uploads/2025/10/CIERRE.jpg"
              preserveAspectRatio="xMidYMid slice"
            />
            {/* Imagen superpuesta a la que se le aplica la distorsión del mapa */}
            <image
              width="500"
              height="500"
              href="https://aguademesajalsuri.com/wp-content/uploads/2025/10/CIERRE.jpg"
              filter="url(#ripple-filter)"
              preserveAspectRatio="xMidYMid slice"
            />
          </g>
        </svg>
      </div>
    </div>
  )
}

export default App