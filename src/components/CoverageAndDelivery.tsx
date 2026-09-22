import { useState } from 'react';
import { MapPin, Clock, CreditCard, ChevronDown, Sparkles, CheckCircle2, ShieldQuestion } from 'lucide-react';
import { FAQS } from '../data/productsData';

export const CoverageAndDelivery: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [selectedDistrict, setSelectedDistrict] = useState<string>('central');

  const coverageZones = [
    {
      id: 'central',
      zone: 'Zona Lima Centro & Residencial',
      districts: 'Miraflores, San Isidro, Surco, San Borja, Magdalena, Jesús María, Lince, Pueblo Libre, Barranco',
      frequency: 'Lunes a Sábado (Entregas diarias en 24h)',
      minOrder: 'Desde 1 bidón (Sin monto mínimo para empresas)',
    },
    {
      id: 'sur',
      zone: 'Zona Sur',
      districts: 'Chorrillos, San Juan de Miraflores, Villa El Salvador, Villa María del Triunfo, Lurín',
      frequency: 'Martes, Jueves y Sábados',
      minOrder: 'Desde 2 bidones',
    },
    {
      id: 'este',
      zone: 'Zona Este & Oficinas',
      districts: 'La Molina, Ate (Salamanca / Mayorazgo), San Luis, Santa Anita',
      frequency: 'Lunes, Miércoles y Viernes',
      minOrder: 'Desde 2 bidones',
    },
    {
      id: 'norte',
      zone: 'Zona Norte & Corporativa',
      districts: 'Los Olivos, San Martín de Porres, Independencia, Comas',
      frequency: 'Martes y Viernes (Rutas programadas)',
      minOrder: 'Desde 2 bidones',
    },
  ];

  const currentZone = coverageZones.find((z) => z.id === selectedDistrict) || coverageZones[0];

  return (
    <section id="cobertura" className="py-24 relative overflow-hidden bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-badge text-cyan-400 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Despacho Confiable</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Cobertura y Delivery{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-sky-400">
              en tu zona
            </span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Llevamos el agua más pura directamente hasta la puerta de tu hogar, departamento u oficina con transportistas identificados.
          </p>
        </div>

        {/* Coverage Grid & Interactive Zone Checker */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-20">

          {/* Left: Zone selector */}
          <div className="lg:col-span-7 glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-white">Consulta la Ruta de tu Distrito</h3>
                <p className="text-xs text-slate-400">Selecciona tu zona para ver días y condiciones de entrega</p>
              </div>
            </div>

            {/* Zone Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {coverageZones.map((zone) => (
                <button
                  key={zone.id}
                  onClick={() => setSelectedDistrict(zone.id)}
                  className={`p-3 rounded-2xl text-xs font-semibold transition-all text-center cursor-pointer ${selectedDistrict === zone.id
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20'
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
                    }`}
                >
                  {zone.zone.split(' ')[1] || zone.zone}
                </button>
              ))}
            </div>

            {/* Active Zone Detail Card */}
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-cyan-500/30 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-base font-bold text-cyan-300">{currentZone.zone}</h4>
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                  Ruta Activa
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                <strong className="text-white">Distritos comprendidos:</strong> {currentZone.districts}.
              </p>
              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 border-t border-slate-800 text-xs">
                <div className="flex items-center gap-2 text-slate-300">
                  <Clock className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                  <span><strong>Frecuencia:</strong> {currentZone.frequency}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span><strong>Pedido mínimo:</strong> {currentZone.minOrder}</span>
                </div>
              </div>
            </div>

            {/* Methods of Payment accepted */}
            <div className="pt-4 border-t border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider">
                <CreditCard className="w-4 h-4 text-cyan-400" />
                <span>Medios de Pago Contraentrega</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {['Yape', 'Plin', 'Transferencia BCP / BBVA', 'Efectivo', 'Tarjetas POS'].map((method) => (
                  <span
                    key={method}
                    className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-medium text-slate-200"
                  >
                    ✓ {method}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Quick Delivery Highlights */}
          <div className="lg:col-span-5 space-y-4">
            <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-3">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">¿Vives en edificio?</span>
              <h4 className="text-base font-bold text-white">Subimos el agua hasta tu departamento</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Nuestros repartidores llevan los bidones y productos directamente hasta tu puerta o cocina, sin recargos sorpresa y con la mayor cordialidad.
              </p>
            </div>

            <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-3">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Suscripción Automática</span>
              <h4 className="text-base font-bold text-white">Nunca te quedes sin agua en casa</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Programa tus recargas semanales o quincenales por WhatsApp y recibe recordatorios automáticos el día previo a tu entrega.
              </p>
            </div>

            <div className="glass-panel p-6 rounded-3xl border border-cyan-500/30 bg-gradient-to-br from-slate-900 to-cyan-950/40 p-6 space-y-3">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Garantía Sanitaria</span>
              <h4 className="text-base font-bold text-white">Envases Sanitizados</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Cada bidón pasa por una cabina de lavado automático con agua ozonizada a alta presión antes de cada recarga.
              </p>
            </div>
          </div>

        </div>

        {/* FAQs Accordion */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-2">
              <ShieldQuestion className="w-4 h-4" />
              <span>Resolvemos tus Dudas</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white">Preguntas Frecuentes</h3>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div
                  key={i}
                  className="rounded-2xl bg-slate-900/80 border border-slate-800 overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 text-sm sm:text-base font-semibold text-white hover:text-cyan-300 transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-cyan-400 transition-transform duration-200 flex-shrink-0 ${isOpen ? 'rotate-180' : ''
                        }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
