import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import maquilaImg from '../assets/img/AGUA-MAQUILA.webp';
import maquilaBanner from '../assets/img/BANNER-WEB-MAQUILA-1.webp';
import { CheckCircle, Palette, Sparkles, Building2, UtensilsCrossed, Hotel, CalendarDays, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export const MaquilaSection: React.FC = () => {
  const maquilaRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from('.maquila-content', {
        scrollTrigger: {
          trigger: maquilaRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
      });

      gsap.from('.maquila-img-container', {
        scrollTrigger: {
          trigger: maquilaRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        scale: 0.95,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      });
    },
    { scope: maquilaRef }
  );

  const handleMaquilaQuote = () => {
    const text = encodeURIComponent(
      '¡Hola Jalsuri! 👋 Estoy interesado en el *Servicio de Maquila y Embotellado con mi propia marca*. Quisiera recibir información sobre cantidades mínimas, formatos de botellas y costos para mi empresa/evento.'
    );
    window.open(`https://wa.me/51987654321?text=${text}`, '_blank');
  };

  const industries = [
    { icon: <Building2 className="w-4 h-4 text-cyan-400" />, label: 'Empresas & Oficinas' },
    { icon: <Hotel className="w-4 h-4 text-sky-400" />, label: 'Hoteles & Hospedajes' },
    { icon: <UtensilsCrossed className="w-4 h-4 text-teal-400" />, label: 'Restaurantes & Cafés' },
    { icon: <CalendarDays className="w-4 h-4 text-indigo-400" />, label: 'Eventos & Congresos' },
  ];

  return (
    <section id="maquila" ref={maquilaRef} className="py-24 relative overflow-hidden bg-slate-950">
      {/* Background Lighting */}
      <div className="absolute top-1/3 -right-32 w-96 h-96 bg-cyan-500/10 rounded-full blur-[130px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Main Banner Visual */}
        <div className="mb-14 rounded-3xl overflow-hidden border border-cyan-500/20 shadow-2xl shadow-cyan-950/30 relative">
          <img
            src={maquilaBanner}
            alt="Banner Maquila Jalsuri Agua Personalizada"
            className="w-full h-44 sm:h-64 object-cover object-center"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/60 to-transparent flex items-center p-6 sm:p-12">
            <div className="max-w-xl space-y-2">
              <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 inline-block">
                Servicio B2B Corporativo
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white">
                Tu Marca en Cada Gota
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 hidden sm:block">
                Fortalece la identidad de tu empresa o evento con botellas de agua purificada con etiqueta personalizada de máxima calidad fotográfica.
              </p>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left: Interactive Details */}
          <div className="lg:col-span-7 space-y-7 maquila-content">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-badge text-cyan-400 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Personalización Premium</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              Convierte el agua purificada en un{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500">
                embajador de tu marca
              </span>
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              En Jalsuri producimos y embotellamos agua purificada de altísima calidad cumpliendo con las más estrictas normativas sanitarias DIGESA. Personalizamos el etiquetado y presentación para que sorprendas a tus clientes y colaboradores con un detalle elegante y saludable.
            </p>

            {/* Target Industries Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              {industries.map((ind, i) => (
                <div
                  key={i}
                  className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center gap-2.5"
                >
                  <div className="p-1.5 rounded-lg bg-slate-800 border border-slate-700/60">
                    {ind.icon}
                  </div>
                  <span className="text-xs font-semibold text-slate-200">{ind.label}</span>
                </div>
              ))}
            </div>

            {/* Value checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-300">
                <CheckCircle className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span>Etiquetas laminadas full color resistentes al agua</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-300">
                <CheckCircle className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span>Formatos desde 350ml, 500ml, 625ml hasta 1L</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-300">
                <CheckCircle className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span>Asesoría y ajuste de diseño de marca gratuito</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-300">
                <CheckCircle className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span>Despacho puntual a tus almacenes o locación</span>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-3">
              <button
                onClick={handleMaquilaQuote}
                className="px-8 py-4 bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm sm:text-base rounded-2xl shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all flex items-center gap-3 cursor-pointer group"
              >
                <Palette className="w-5 h-5 text-cyan-200" />
                <span>Solicitar Cotización de Maquila</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right: Realistic visual of maquila bottles */}
          <div className="lg:col-span-5 maquila-img-container flex items-center justify-center">
            <div className="relative group p-4 sm:p-6 rounded-3xl bg-slate-900/60 border border-cyan-500/30 backdrop-blur-xl shadow-2xl">
              <img
                src={maquilaImg}
                alt="Agua Maquila Jalsuri con etiqueta personalizada"
                className="w-full max-w-[420px] h-auto object-contain rounded-2xl drop-shadow-[0_15px_30px_rgba(6,182,212,0.3)] group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="mt-4 text-center">
                <span className="text-xs font-bold text-cyan-300 uppercase tracking-wider block">
                  Ejemplo de Embotellado
                </span>
                <p className="text-xs text-slate-400 mt-0.5">
                  Botellas ergonómicas con tapa hermética y etiqueta personalizada de máxima resolución.
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
