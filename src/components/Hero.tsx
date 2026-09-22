import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import heroBidonImg from '../assets/img/PORTADA-WEB-JALSURI-BIDON-8.5-LITROS_2.webp';
import { Sparkles, ShieldCheck, ArrowRight, Droplets, Award, Zap, Truck } from 'lucide-react';

// Register GSAP React plugin
gsap.registerPlugin(useGSAP);

interface HeroProps {
  onOpenOrderModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenOrderModal }) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Animate background glow
      tl.fromTo(
        '.hero-glow',
        { scale: 0.8, opacity: 0 },
        { scale: 1.1, opacity: 1, duration: 1.5 },
        0
      );

      // Animate badge
      tl.fromTo(
        '.hero-badge',
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        0.2
      );

      // Animate heading lines
      tl.fromTo(
        '.hero-title',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 },
        0.4
      );

      // Animate subtitle
      tl.fromTo(
        '.hero-subtitle',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9 },
        0.6
      );

      // Animate buttons and trust pills
      tl.fromTo(
        '.hero-actions',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        0.8
      );

      tl.fromTo(
        '.hero-pills',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        1.0
      );

      // Animate product image with 3D float
      tl.fromTo(
        imageContainerRef.current,
        { scale: 0.9, y: 50, opacity: 0, rotationY: -10 },
        { scale: 1, y: 0, opacity: 1, rotationY: 0, duration: 1.3, ease: 'back.out(1.2)' },
        0.5
      );

      // Floating ambient animation for the bottle
      gsap.to(imageContainerRef.current, {
        y: -14,
        rotationZ: 0.8,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });

      // Floating badges
      gsap.to('.floating-card-1', {
        y: -8,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
        delay: 0.5
      });

      gsap.to('.floating-card-2', {
        y: 8,
        duration: 3.8,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
        delay: 1
      });
    },
    { scope: heroRef }
  );

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-[92vh] pt-32 pb-20 overflow-hidden flex items-center justify-center bg-radial from-slate-900 via-slate-950 to-black"
    >

      {/* Background Decorative Lighting */}
      <div className="hero-glow absolute -top-40 left-1/2 -translate-x-1/2 w-[750px] h-[550px] bg-gradient-to-b from-cyan-500/25 via-blue-600/15 to-transparent blur-[120px] rounded-full pointer-events-none -z-0"></div>
      <div className="absolute top-1/3 -right-32 w-[450px] h-[450px] bg-sky-500/10 blur-[100px] rounded-full pointer-events-none -z-0"></div>
      <div className="absolute bottom-10 -left-32 w-[450px] h-[450px] bg-slate-500/10 blur-[100px] rounded-full pointer-events-none -z-0"></div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0284c708_1px,transparent_1px),linear-gradient(to_bottom,#0284c708_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] pointer-events-none -z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* Left Column: Value Proposition & Copy */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-7">

            {/* Top Pill / Badge */}
            <div className="hero-badge inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass-badge text-cyan-300 text-xs font-semibold tracking-wide shadow-sm shadow-cyan-500/10">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Agua de Mesa Ultra Purificada • 7 Fases de Filtración</span>
            </div>

            {/* Main Headline */}
            <h1 className="hero-title text-4xl sm:text-5xl xl:text-6xl font-black tracking-tight text-white leading-[1.12]">
              La pureza que tu <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-400 to-blue-500">
                cuerpo y familia
              </span>{' '}
              merecen todos los días.
            </h1>

            {/* Subtitle */}
            <p className="hero-subtitle text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Agua purificada de manantial con tecnología de <span className="text-cyan-300 font-semibold">Ósmosis Inversa</span>, <span className="text-cyan-300 font-semibold">Ozono</span> y <span className="text-cyan-300 font-semibold">Esterilización UV</span>. Cero sodio añadido, ligereza en cada sorbo y despacho inmediato a tu hogar u oficina.
            </p>

            {/* Call to Actions */}
            <div className="hero-actions flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onOpenOrderModal}
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm sm:text-base rounded-2xl shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 transform hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-3 group"
              >
                <span>Pedir Agua Ahora</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="#productos"
                className="w-full sm:w-auto px-7 py-4 glass-panel text-slate-200 hover:text-white hover:bg-slate-800/70 border border-slate-700/60 font-semibold text-sm sm:text-base rounded-2xl transition-all flex items-center justify-center gap-2 hover:border-cyan-500/40"
              >
                <Droplets className="w-4 h-4 text-cyan-400" />
                <span>Explorar Productos</span>
              </a>
            </div>

            {/* Trust Badges Bar */}
            <div className="hero-pills pt-4 border-t border-slate-800/60 grid grid-cols-3 gap-3 sm:gap-6 text-center sm:text-left">
              <div className="flex flex-col sm:flex-row items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 flex-shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">Registro DIGESA</p>
                  <p className="text-[11px] text-slate-400">100% Calidad Sanitaria</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 flex-shrink-0">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">Baja en Sodio</p>
                  <p className="text-[11px] text-slate-400">Salud cardiovascular</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-slate-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 flex-shrink-0">
                  <Truck className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">Envío Express</p>
                  <p className="text-[11px] text-slate-400">Entrega rápida en tu zona</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive 3D Product Visual */}
          <div className="lg:col-span-5 relative flex items-center justify-center">

            {/* Ambient Aura Glow */}
            <div className="absolute w-[360px] h-[360px] sm:w-[420px] sm:h-[420px] bg-gradient-to-tr from-cyan-500/30 via-sky-500/20 to-blue-600/30 rounded-full blur-[80px] -z-0"></div>

            {/* Product Card Container */}
            <div
              ref={imageContainerRef}
              className="relative z-10 w-full max-w-[420px] mx-auto p-4 sm:p-6"
            >
              <div className="relative group">
                <img
                  src={heroBidonImg}
                  alt="Bidón Ergonómico Jalsuri 8.5 Litros con Caño"
                  className="w-full h-auto object-contain drop-shadow-[0_20px_50px_rgba(6,182,212,0.35)] transform transition-transform duration-500 group-hover:scale-105"
                  loading="eager"
                  fetchPriority="high"
                />

                {/* Floating Badge 1: Product info */}
                <div className="floating-card-1 absolute -top-4 -left-4 sm:-left-6 glass-panel border border-cyan-500/30 p-3 rounded-2xl shadow-xl shadow-cyan-950/50 flex items-center gap-3 backdrop-blur-xl">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-md shadow-cyan-500/30">
                    <Droplets className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">Nuevo Formato</span>
                    <p className="text-xs font-bold text-white">Bidón 8.5L con Caño</p>
                    <p className="text-[10px] text-slate-400">Fácil de servir sin peso</p>
                  </div>
                </div>

                {/* Floating Badge 2: Purity seal */}
                <div className="floating-card-2 absolute -bottom-4 -right-4 sm:-right-6 glass-panel border border-sky-500/30 p-3 rounded-2xl shadow-xl shadow-sky-950/50 flex items-center gap-3 backdrop-blur-xl">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-md shadow-emerald-500/30">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">99.9% Pureza</span>
                    <p className="text-xs font-bold text-white">Ósmosis Inversa</p>
                    <p className="text-[10px] text-slate-400">Bacteriológicamente pura</p>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
