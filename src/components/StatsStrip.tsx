import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { TRUST_STATS } from '../data/productsData';
import { Users, Filter, CheckCircle2, Clock } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export const StatsStrip: React.FC = () => {
  const stripRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Stagger entrance of the stat cards
      gsap.from('.stat-card', {
        scrollTrigger: {
          trigger: stripRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out',
      });

      // Animate numerical counters
      const statNumbers = document.querySelectorAll('.stat-number');
      statNumbers.forEach((el) => {
        const targetVal = parseFloat(el.getAttribute('data-target') || '0');
        const isDecimal = targetVal % 1 !== 0;

        const obj = { val: 0 };
        gsap.to(obj, {
          scrollTrigger: {
            trigger: stripRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
          val: targetVal,
          duration: 2,
          ease: 'power2.out',
          onUpdate: () => {
            if (el) {
              el.textContent = isDecimal ? obj.val.toFixed(1) : Math.floor(obj.val).toString();
            }
          },
        });
      });
    },
    { scope: stripRef }
  );

  const getIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Users className="w-6 h-6 text-cyan-400" />;
      case 1:
        return <Filter className="w-6 h-6 text-sky-400" />;
      case 2:
        return <CheckCircle2 className="w-6 h-6 text-emerald-400" />;
      case 3:
        return <Clock className="w-6 h-6 text-blue-400" />;
      default:
        return <CheckCircle2 className="w-6 h-6 text-cyan-400" />;
    }
  };

  return (
    <section
      ref={stripRef}
      className="relative z-20 -mt-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-700/60 shadow-2xl shadow-cyan-950/40 bg-slate-900/90 backdrop-blur-2xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-slate-800/80">
          {TRUST_STATS.map((stat, i) => (
            <div
              key={stat.label}
              className={`stat-card flex items-center gap-4 ${i !== 0 ? 'pt-5 sm:pt-0 sm:pl-6' : ''
                }`}
            >
              <div className="w-13 h-13 rounded-2xl bg-slate-800/80 border border-slate-700/80 flex items-center justify-center flex-shrink-0 shadow-inner">
                {getIcon(i)}
              </div>
              <div>
                <div className="flex items-baseline gap-0.5">
                  <span
                    className="stat-number text-3xl sm:text-4xl font-black text-white tracking-tight"
                    data-target={stat.value}
                  >
                    0
                  </span>
                  <span className="text-2xl sm:text-3xl font-bold text-cyan-400">
                    {stat.suffix}
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-slate-200 mt-0.5">
                  {stat.label}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5 leading-snug">
                  {stat.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
