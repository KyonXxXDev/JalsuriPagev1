import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import elem3 from '../assets/img/produc-y-element-3-1024x867.webp';
import elem7 from '../assets/img/produc-y-element-7-1024x867.webp';
import elem9 from '../assets/img/produc-y-element-9-1024x867.webp';
import { HeartPulse, Recycle, ShieldCheck, Truck, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export const ValueProps: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from('.value-card', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        y: 40,

        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out',
      });
    },
    { scope: containerRef }
  );

  const pillars = [
    {
      icon: <HeartPulse className="w-6 h-6 text-rose-400" />,
      title: 'Salud y Cero Sodio Añadido',
      badge: 'Bienestar Cardiovascular',
      desc: 'Nuestra agua es naturalmente equilibrada y libre de sales pesadas, ideal para hipertensos, niños, deportistas y personas mayores.',
      img: elem7,
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-cyan-400" />,
      title: 'Sellos de Seguridad Inviolables',
      badge: 'Garantía Higiénica',
      desc: 'Cada bidón cuenta con capuchón termo-encogido de seguridad y precinto de inviolabilidad. Nadie toca tu agua hasta que llega a tu mesa.',
      img: elem3,
    },
    {
      icon: <Recycle className="w-6 h-6 text-emerald-400" />,
      title: 'Compromiso Eco-Amigable',
      badge: 'Envases Retornables',
      desc: 'Fomentamos la economía circular a través de nuestro sistema de recambio de bidones de 20L y botellas 100% reciclables libres de BPA.',
      img: elem9,
    },
    {
      icon: <Truck className="w-6 h-6 text-sky-400" />,
      title: 'Puntualidad en tu Puerta',
      badge: 'Logística Confiable',
      desc: 'Reparto rápido y eficiente en tu distrito. Puedes programar tus recargas semanales o quincenales para que nunca te falte agua en casa.',
      img: null,
    },
  ];

  return (
    <section id="beneficios" ref={containerRef} className="py-24 relative overflow-hidden bg-slate-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-badge text-cyan-400 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>La Diferencia Jalsuri</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            ¿Por qué elegir{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-sky-400">
              Agua de Mesa Jalsuri?
            </span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Combinamos tecnología de grado farmacéutico con servicio cálido y confiable para que disfrutes de una experiencia de hidratación superior.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((pillar, idx) => (
            <div
              key={idx}
              className="value-card group p-7 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-cyan-950/30 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-slate-800/90 border border-slate-700/80 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {pillar.icon}
                  </div>
                  {pillar.img && (
                    <img
                      src={pillar.img}
                      alt={pillar.title}
                      className="w-12 h-12 object-contain opacity-80 group-hover:opacity-100 transition-opacity"
                    />
                  )}
                </div>

                <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 block mb-1">
                  {pillar.badge}
                </span>
                <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-2.5 leading-relaxed">
                  {pillar.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center text-xs font-semibold text-cyan-400 group-hover:translate-x-1 transition-transform">
                <span>Garantía de Satisfacción 100%</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
