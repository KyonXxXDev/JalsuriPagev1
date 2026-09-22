import { useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { PRODUCTS_DATA } from '../data/productsData';
import type { Product } from '../data/productsData';
import { ShoppingCart, Check, Star, MessageSquare, Sparkles, ArrowUpRight, ShieldCheck } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface ProductsSectionProps {
  onSelectProductForOrder: (product: Product) => void;
}

export const ProductsSection: React.FC<ProductsSectionProps> = ({ onSelectProductForOrder }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const sectionRef = useRef<HTMLDivElement>(null);

  const categories = [
    { id: 'all', label: 'Todos los Formatos' },
    { id: 'bidones', label: 'Bidones Institucionales' },
    { id: 'dispensadores', label: 'Dispensadores & Racks' },
    { id: 'botellas', label: 'Botellas & Packs' },
    { id: 'maquila', label: 'Maquila B2B' },
  ];

  const filteredProducts = activeCategory === 'all'
    ? PRODUCTS_DATA
    : PRODUCTS_DATA.filter((p) => p.category === activeCategory);

  useGSAP(
    () => {
      gsap.from('.product-card', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        y: 40,

        duration: 0.6,
        stagger: 0.08,
        ease: 'power2.out',
      });
    },
    { scope: sectionRef, dependencies: [activeCategory], revertOnUpdate: true }
  );

  const handleWhatsAppOrder = (product: Product) => {
    const text = encodeURIComponent(
      `¡Hola Agua Jalsuri! 👋 Deseo solicitar una cotización formal de: *${product.name}* (Presentación: ${product.unit}). ¿Podrían indicarme disponibilidad y condiciones para mi empresa/hogar?`
    );
    window.open(`https://wa.me/51960695747?text=${text}`, '_blank');
  };

  return (
    <section id="productos" ref={sectionRef} className="py-24 relative overflow-hidden bg-corporate-950">
      {/* Background Ambience */}
      <div className="absolute top-1/4 -left-40 w-96 h-96 bg-cyanbrand-500/10 rounded-full blur-[130px] pointer-events-none"></div>
      <div className="absolute bottom-10 -right-40 w-96 h-96 bg-corporate-700/15 rounded-full blur-[130px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyanbrand-500/15 border border-cyanbrand-500/30 text-cyanbrand-400 text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Catálogo Corporativo & Institucional</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Agua pura en el formato perfecto{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyanbrand-400 to-ice-200">
              para tu organización
            </span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Abastecimiento continuo con registro sanitario DIGESA. Diseñado para oficinas, industrias, centros de salud y eventos. Cotizaciones personalizadas sin montos fijos arbitrarios.
          </p>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-gradient-to-r from-cyanbrand-500 to-corporate-700 text-white shadow-lg shadow-cyanbrand-500/25 scale-105'
                    : 'bg-corporate-900/80 hover:bg-corporate-800 text-slate-300 hover:text-white border border-corporate-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="product-card group relative flex flex-col bg-corporate-900/70 border border-corporate-800 hover:border-cyanbrand-500/50 rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-cyanbrand-950/40 backdrop-blur-md"
            >
              {/* Product Badge */}
              {product.badge && (
                <div className="absolute top-4 left-4 z-20">
                  <span className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider rounded-full bg-cyanbrand-500 text-corporate-950 shadow-md shadow-cyanbrand-500/30">
                    {product.badge}
                  </span>
                </div>
              )}

              {/* Popular Tag */}
              {product.popular && (
                <div className="absolute top-4 right-4 z-20 flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 text-[11px] font-semibold">
                  <Star className="w-3 h-3 fill-amber-300" />
                  <span>Favorito B2B</span>
                </div>
              )}

              {/* Product Image Container */}
              <div className="relative h-64 sm:h-72 w-full p-6 flex items-center justify-center bg-gradient-to-b from-corporate-800/30 to-corporate-900/50 overflow-hidden">
                <div className="absolute inset-0 bg-radial from-cyanbrand-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <img
                  src={product.image}
                  alt={product.name}
                  className="max-h-full max-w-full object-contain filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)] group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>

              {/* Product Info */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                <div>
                  <div className="flex items-center justify-between text-[11px] font-semibold text-cyanbrand-400 uppercase tracking-wider">
                    <span>{product.tagline}</span>
                    <span className="text-slate-400 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-emerald-400" /> DIGESA
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mt-1 group-hover:text-cyanbrand-300 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                    {product.description}
                  </p>

                  {/* Features list */}
                  <ul className="mt-4 space-y-1.5 pt-3 border-t border-corporate-800">
                    {product.features.map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                        <Check className="w-3.5 h-3.5 text-cyanbrand-400 flex-shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Supply Specs & Quote Actions (No numeric prices) */}
                <div className="pt-4 border-t border-corporate-800 flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase block font-semibold">
                      Presentación
                    </span>
                    <span className="text-sm font-bold text-white block">
                      {product.unit}
                    </span>
                    <span className="text-[10px] text-cyanbrand-400 font-medium">
                      {product.supplyType || 'Suministro B2B'}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onSelectProductForOrder(product)}
                      className="px-3.5 py-2.5 rounded-xl bg-corporate-800 hover:bg-corporate-700 text-slate-200 hover:text-white text-xs font-semibold flex items-center gap-1.5 border border-corporate-700 transition-colors cursor-pointer"
                      title="Armar solicitud de cotización"
                    >
                      <ShoppingCart className="w-3.5 h-3.5 text-cyanbrand-400" />
                      <span className="hidden sm:inline">Cotizar</span>
                    </button>

                    <button
                      onClick={() => handleWhatsAppOrder(product)}
                      className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold shadow-md shadow-emerald-500/20 hover:shadow-emerald-500/35 transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Consultar</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Callout Banner */}
        <div className="mt-16 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-corporate-900 to-corporate-950 border border-cyanbrand-500/30 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="text-center sm:text-left space-y-1">
            <h4 className="text-lg sm:text-xl font-bold text-white">
              ¿Requieres un plan de abastecimiento mayorista o personalizado?
            </h4>
            <p className="text-sm text-slate-300">
              Ofrecemos dispensadores en comodato sin costo inicial, entrega programada en cada piso y facturación con crédito corporativo.
            </p>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <a
              href="#calculadora"
              className="px-6 py-3 rounded-2xl bg-corporate-800 hover:bg-corporate-700 text-white border border-corporate-700 text-xs sm:text-sm font-bold transition-all flex items-center gap-2"
            >
              <span>Calcular Consumo</span>
            </a>
            <button
              onClick={() => {
                const text = encodeURIComponent('¡Hola Jalsuri! Deseo solicitar una propuesta corporativa personalizada para mi empresa.');
                window.open(`https://wa.me/51960695747?text=${text}`, '_blank');
              }}
              className="px-6 py-3 rounded-2xl water-gradient-btn text-white text-xs sm:text-sm font-bold shadow-lg shadow-cyanbrand-500/25 transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Solicitar Asesoría B2B</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
