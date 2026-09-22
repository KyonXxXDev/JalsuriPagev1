import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { PURIFICATION_STEPS } from '../data/productsData';
import elem1 from '../assets/img/produc-y-element-1-1024x867.webp';
import elem4 from '../assets/img/produc-y-element-4-1024x867.webp';
import elem8 from '../assets/img/produc-y-element-8-1024x867.webp';
import elem10 from '../assets/img/produc-y-element-10-1024x867.webp';
import { Droplet, Sparkles, Waves, Sun, CheckCircle, ShieldCheck } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export const PurificationSteps: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Animate timeline line progress
      gsap.from('.timeline-line', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
          end: 'bottom 80%',
          scrub: 1,
        },
        scaleY: 0,
        transformOrigin: 'top center',
        ease: 'none',
      });

      // Animate each step card
      const stepCards = gsap.utils.toArray<HTMLElement>('.step-card');
      stepCards.forEach((card, index) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
          x: index % 2 === 0 ? -40 : 40,
          opacity: 0,
          duration: 0.8,
          ease: 'power2.out',
        });
      });
    },
    { scope: containerRef }
  );

  const getStepIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Waves className="w-5 h-5 text-cyan-400" />;
      case 1:
        return <ShieldCheck className="w-5 h-5 text-sky-400" />;
      case 2:
        return <Droplet className="w-5 h-5 text-blue-400" />;
      case 3:
        return <Sparkles className="w-5 h-5 text-indigo-400" />;
      case 4:
        return <CheckCircle className="w-5 h-5 text-teal-400" />;
      case 5:
        return <Droplet className="w-5 h-5 text-cyan-300" />;
      case 6:
        return <Sun className="w-5 h-5 text-amber-300" />;
      default:
        return <Sparkles className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <section id="pureza" ref={containerRef} className="py-24 relative overflow-hidden bg-slate-900/60">
      {/* Subtle Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-600/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-badge text-cyan-400 text-xs font-semibold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Estándares de Calidad Internacional</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            El camino hacia la{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500">
              pureza absoluta
            </span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Conoce nuestro riguroso proceso de 7 etapas donde transformamos el agua de manantial en el recurso más saludable, cristalino y ligero para tu organismo.
          </p>
        </div>

        {/* Visual Badge Elements Showcase Strip */}
        <div className="mb-16 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          <div className="glass-panel p-4 rounded-2xl border border-cyan-500/20 flex flex-col items-center text-center">
            <img src={elem1} alt="Filtro Sedimentos" className="w-14 h-14 object-contain mb-2" />
            <span className="text-xs font-bold text-white">Microfiltración</span>
            <span className="text-[10px] text-slate-400">Retención de partículas</span>
          </div>
          <div className="glass-panel p-4 rounded-2xl border border-cyan-500/20 flex flex-col items-center text-center">
            <img src={elem4} alt="Ósmosis Inversa" className="w-14 h-14 object-contain mb-2" />
            <span className="text-xs font-bold text-white">Ósmosis Inversa</span>
            <span className="text-[10px] text-slate-400">99.9% Pureza Molecular</span>
          </div>
          <div className="glass-panel p-4 rounded-2xl border border-cyan-500/20 flex flex-col items-center text-center">
            <img src={elem8} alt="Ozonización" className="w-14 h-14 object-contain mb-2" />
            <span className="text-xs font-bold text-white">Ozonización O3</span>
            <span className="text-[10px] text-slate-400">Desinfección activa</span>
          </div>
          <div className="glass-panel p-4 rounded-2xl border border-cyan-500/20 flex flex-col items-center text-center">
            <img src={elem10} alt="Luz Ultravioleta" className="w-14 h-14 object-contain mb-2" />
            <span className="text-xs font-bold text-white">Esterilización UV</span>
            <span className="text-[10px] text-slate-400">Barrera bacteriológica</span>
          </div>
        </div>

        {/* 7-Step Timeline Process */}
        <div className="relative">
          {/* Vertical Center Line */}
          <div className="hidden lg:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-0.5 bg-slate-800">
            <div className="timeline-line w-full h-full bg-gradient-to-b from-cyan-400 via-sky-500 to-blue-600"></div>
          </div>

          <div className="space-y-8 lg:space-y-12">
            {PURIFICATION_STEPS.map((step, index) => {
              const isEven = index % 2 === 0;
              return (
                <div
                  key={step.step}
                  className={`step-card relative flex flex-col lg:flex-row items-center ${isEven ? 'lg:flex-row-reverse' : ''
                    }`}
                >
                  {/* Content Box */}
                  <div className="w-full lg:w-[calc(50%-40px)]">
                    <div className="p-6 sm:p-7 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 backdrop-blur-md shadow-xl transition-all duration-300 hover:-translate-y-1 group">
                      <div className="flex items-center justify-between gap-4 mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
                            {getStepIcon(index)}
                          </div>
                          <div>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 block">
                              {step.subtitle}
                            </span>
                            <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                              {step.title}
                            </h3>
                          </div>
                        </div>
                        <span className="text-3xl font-black text-slate-700/80 group-hover:text-cyan-500/40 transition-colors">
                          {step.step}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>

                  {/* Center Node Circle on large screens */}
                  <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-slate-950 border-2 border-cyan-400 items-center justify-center text-cyan-300 text-xs font-bold shadow-lg shadow-cyan-500/30 z-20">
                    {step.step}
                  </div>

                  {/* Empty side for layout balance */}
                  <div className="hidden lg:block w-[calc(50%-40px)]"></div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
