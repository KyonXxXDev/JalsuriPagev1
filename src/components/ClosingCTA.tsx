import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import cierreBg from '../assets/img/CIERRE.webp';
import { MessageSquare, ArrowRight, ShieldCheck, Sparkles, Droplets } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface ClosingCTAProps {
  onOpenOrderModal: () => void;
}

export const ClosingCTA: React.FC<ClosingCTAProps> = ({ onOpenOrderModal }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from('.cta-card', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        scale: 0.95,
        opacity: 0,
        y: 30,
        duration: 0.9,
        ease: 'power3.out',
      });
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="py-20 relative overflow-hidden bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <div className="cta-card relative rounded-3xl overflow-hidden border border-cyan-500/30 shadow-2xl shadow-cyan-950/50">

          {/* Background Image with parallax overlay */}
          <div className="absolute inset-0 -z-0">
            <img
              src={cierreBg}
              alt="Agua de Mesa Jalsuri Cierre de Pureza"
              className="w-full h-full object-cover object-center"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-cyan-950/70"></div>
          </div>

          {/* Card Content */}
          <div className="relative z-10 p-8 sm:p-14 lg:p-20 max-w-3xl space-y-6">

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-badge text-cyan-300 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Calidad Garantizada DIGESA</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              ¿Listo para sentir la{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400">
                verdadera pureza
              </span>{' '}
              en cada vaso?
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Haz tu primer pedido hoy y comprueba la diferencia en sabor, ligereza y servicio puntual. Atendemos pedidos familiares, corporativos y eventos especiales con la máxima garantía.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
              <button
                onClick={onOpenOrderModal}
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm sm:text-base rounded-2xl shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all flex items-center justify-center gap-3 cursor-pointer group"
              >
                <span>Hacer Pedido Inmediato</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="https://wa.me/51987654321?text=%C2%A1Hola%20Agua%20Jalsuri!%20Deseo%20hacer%20una%20consulta%20directa%20por%20WhatsApp."
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-7 py-4 glass-panel text-slate-200 hover:text-white hover:bg-slate-800/80 border border-slate-700/60 font-semibold text-sm sm:text-base rounded-2xl transition-all flex items-center justify-center gap-2.5 hover:border-emerald-500/50"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>Chat con un Asesor</span>
              </a>
            </div>

            {/* Trust points */}
            <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span>Pago contraentrega seguro</span>
              </div>
              <div className="flex items-center gap-2">
                <Droplets className="w-4 h-4 text-sky-400" />
                <span>Envases 100% esterilizados</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
