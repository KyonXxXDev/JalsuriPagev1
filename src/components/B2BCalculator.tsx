import React, { useState } from 'react';
import {
  Users,
  Building2,
  Factory,
  Hospital,
  Store,
  Layers,
  CheckCircle2,
  Droplets,
  Send,
  Sparkles,
  Leaf,
  Calendar,
  HelpCircle
} from 'lucide-react';

interface B2BCalculatorProps {
  onOpenOrderModal?: () => void;
}

export const B2BCalculator: React.FC<B2BCalculatorProps> = () => {
  const [employees, setEmployees] = useState<number>(35);
  const [industry, setIndustry] = useState<'office' | 'industrial' | 'medical' | 'commercial'>('office');
  const [areasCount, setAreasCount] = useState<number>(2);
  const [includeDispensers, setIncludeDispensers] = useState<boolean>(true);
  const [includeInternalDelivery, setIncludeInternalDelivery] = useState<boolean>(true);
  const [includeMaintenance, setIncludeMaintenance] = useState<boolean>(true);

  // Industry daily water consumption multipliers (Liters/person/working day)
  const industryRates = {
    office: { rate: 1.0, label: 'Oficina / Administrativo', icon: Building2 },
    industrial: { rate: 1.6, label: 'Planta / Almacén / Obra', icon: Factory },
    medical: { rate: 1.3, label: 'Salud / Clínica / Educativo', icon: Hospital },
    commercial: { rate: 1.1, label: 'Retail / Tiendas / Comercial', icon: Store },
  };

  const selectedRate = industryRates[industry].rate;
  const workingDays = 22;

  // Calculations
  const totalLitersMonth = Math.round(employees * selectedRate * workingDays);
  const bidonesMonth = Math.ceil(totalLitersMonth / 20);
  const suggestedDispensers = Math.max(areasCount, Math.ceil(employees / 18));
  
  // Suggested frequency
  let suggestedFrequency = 'Quincenal (2 despachos/mes)';
  if (bidonesMonth <= 12) {
    suggestedFrequency = 'Mensual (1 despacho/mes)';
  } else if (bidonesMonth > 30) {
    suggestedFrequency = 'Semanal (4 despachos/mes)';
  }

  // Ecological impact metrics
  const bottlesSaved = bidonesMonth * 40; // 1 bidón de 20L = 40 botellas de 500ml
  const plasticKgSaved = (bottlesSaved * 0.025).toFixed(1); // approx 25g plastic per single-use bottle

  const handleWhatsAppQuote = () => {
    const message = `*SOLICITUD DE PROPUESTA B2B - AGUA JALSURI*
────────────────────────
🏢 *Entorno:* ${industryRates[industry].label}
👥 *Colaboradores:* ${employees} personas
📍 *Puntos / Áreas de Consumo:* ${areasCount} estaciones
💧 *Consumo Estimado:* ${totalLitersMonth} Litros/mes
📦 *Bidones 20L Sugeridos:* ${bidonesMonth} bidones/mes
🧊 *Dispensadores Sugeridos:* ${suggestedDispensers} unidades (${includeDispensers ? 'En comodato' : 'No requerido'})
🚚 *Frecuencia Recomendada:* ${suggestedFrequency}
${includeInternalDelivery ? '✅ Requiere distribución interna por piso/área\n' : ''}${includeMaintenance ? '✅ Requiere sanitización periódica\n' : ''}
🌱 *Ahorro Ecológico:* ${bottlesSaved.toLocaleString()} botellas PET evitadas (${plasticKgSaved} kg plástico)

_Agradeceré me envíen la cotización formal con factura y condiciones corporativas._`;

    window.open(`https://wa.me/51960695747?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <section id="calculadora" className="py-24 relative overflow-hidden bg-corporate-900 border-t border-b border-corporate-800/80">
      {/* Background Ambient Lighting */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-cyanbrand-500/10 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-corporate-700/20 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyanbrand-500/15 border border-cyanbrand-500/30 text-cyanbrand-400 text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Optimizador de Suministro Corporativo</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Calculadora B2B de{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyanbrand-400 to-ice-200">
              Consumo Hídrico por Área
            </span>
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            Estima instantáneamente los bidones de 20L necesarios, dispensadores recomendados y el impacto ecológico según la cantidad de personal y áreas de tu empresa.
          </p>
        </div>

        {/* Calculator Split Layout */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Side: Parameters and Controls (Col 7) */}
          <div className="lg:col-span-7 bg-corporate-950/70 border border-slate-700/80 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl flex flex-col justify-between space-y-8">
            
            <div className="space-y-7">
              
              {/* Slider: Employee Count */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-xs sm:text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
                    <Users className="w-4 h-4 text-cyanbrand-400" />
                    <span>Cantidad de Colaboradores / Trabajadores</span>
                  </label>
                  <span className="bg-gradient-to-r from-cyanbrand-500 to-corporate-700 text-white font-extrabold text-base sm:text-lg px-4 py-1 rounded-xl shadow-md border border-cyanbrand-400/30">
                    {employees} personas
                  </span>
                </div>

                <input
                  type="range"
                  min="5"
                  max="350"
                  step="5"
                  value={employees}
                  onChange={(e) => setEmployees(Number(e.target.value))}
                  className="w-full h-3 bg-corporate-800 rounded-lg appearance-none cursor-pointer accent-cyanbrand-500 focus:outline-none"
                />

                <div className="flex justify-between text-[11px] text-slate-400 font-medium">
                  <span>5 pers. (PyME)</span>
                  <span>50 pers.</span>
                  <span>150 pers.</span>
                  <span>350+ pers. (Corporación)</span>
                </div>
              </div>

              {/* Selector: Industry / Work Area Type */}
              <div className="space-y-3">
                <label className="text-xs sm:text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-cyanbrand-400" />
                  <span>Tipo de Entorno Laboral / Actividad</span>
                </label>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {(Object.keys(industryRates) as Array<keyof typeof industryRates>).map((key) => {
                    const item = industryRates[key];
                    const Icon = item.icon;
                    const isActive = industry === key;

                    return (
                      <button
                        key={key}
                        onClick={() => setIndustry(key)}
                        className={`p-3 rounded-2xl border text-left flex flex-col gap-2 transition-all cursor-pointer ${
                          isActive
                            ? 'bg-cyanbrand-500/20 border-cyanbrand-400 text-white shadow-lg shadow-cyanbrand-500/10'
                            : 'bg-corporate-900/60 border-slate-700 hover:border-slate-500 text-slate-300'
                        }`}
                      >
                        <div className={`p-2 rounded-xl w-fit ${isActive ? 'bg-cyanbrand-500 text-corporate-950' : 'bg-corporate-800 text-cyanbrand-400'}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs font-bold leading-snug">{item.label.split('/')[0]}</p>
                          <span className="text-[10px] text-slate-400">{item.rate}L / día / pers.</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Selector: Consumption Areas / Stations */}
              <div className="space-y-3">
                <label className="text-xs sm:text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
                  <Layers className="w-4 h-4 text-cyanbrand-400" />
                  <span>Estaciones de Hidratación / Áreas Distribuidas</span>
                </label>

                <div className="grid grid-cols-3 gap-3">
                  {[
                    { count: 1, label: '1 Punto Central', desc: 'Cocina / Cafetería' },
                    { count: 2, label: '2 a 3 Pisos/Áreas', desc: 'Administración + Operaciones' },
                    { count: 4, label: '4+ Estaciones', desc: 'Múltiples salas y plantas' },
                  ].map((area) => (
                    <button
                      key={area.count}
                      onClick={() => setAreasCount(area.count)}
                      className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                        areasCount === area.count
                          ? 'bg-corporate-800 border-cyanbrand-400 text-white'
                          : 'bg-corporate-900/40 border-slate-700/80 text-slate-300 hover:border-slate-600'
                      }`}
                    >
                      <p className="text-xs font-bold text-white">{area.label}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">{area.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Checkboxes: Included Corporate Services */}
              <div className="space-y-3 pt-2">
                <label className="text-xs sm:text-sm font-bold text-slate-200 uppercase tracking-wider block">
                  Servicios y Beneficios Incluidos en tu Plan
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                  <label className="flex items-center gap-2.5 p-3 rounded-2xl bg-corporate-900/70 border border-slate-700/80 cursor-pointer hover:border-cyanbrand-500/50 transition-colors">
                    <input
                      type="checkbox"
                      checked={includeDispensers}
                      onChange={(e) => setIncludeDispensers(e.target.checked)}
                      className="rounded accent-cyanbrand-500 w-4 h-4"
                    />
                    <span className="text-slate-200 font-medium">Dispensadores Frío/Calor</span>
                  </label>

                  <label className="flex items-center gap-2.5 p-3 rounded-2xl bg-corporate-900/70 border border-slate-700/80 cursor-pointer hover:border-cyanbrand-500/50 transition-colors">
                    <input
                      type="checkbox"
                      checked={includeInternalDelivery}
                      onChange={(e) => setIncludeInternalDelivery(e.target.checked)}
                      className="rounded accent-cyanbrand-500 w-4 h-4"
                    />
                    <span className="text-slate-200 font-medium">Entrega Directa por Piso</span>
                  </label>

                  <label className="flex items-center gap-2.5 p-3 rounded-2xl bg-corporate-900/70 border border-slate-700/80 cursor-pointer hover:border-cyanbrand-500/50 transition-colors">
                    <input
                      type="checkbox"
                      checked={includeMaintenance}
                      onChange={(e) => setIncludeMaintenance(e.target.checked)}
                      className="rounded accent-cyanbrand-500 w-4 h-4"
                    />
                    <span className="text-slate-200 font-medium">Sanitización Periódica</span>
                  </label>
                </div>
              </div>

            </div>

            {/* Note info footer */}
            <div className="text-xs text-slate-400 pt-4 border-t border-slate-800 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-cyanbrand-400 flex-shrink-0" />
              <span>Estándar basado en recomendaciones de salud ocupacional de 1.0L a 1.6L diarios por jornada laboral de 8h.</span>
            </div>

          </div>

          {/* Right Side: Results & Proposal Output (Col 5) */}
          <div className="lg:col-span-5 bg-gradient-to-b from-corporate-900 via-corporate-950 to-corporate-950 border border-cyanbrand-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col justify-between relative overflow-hidden">
            
            {/* Top decorative glow */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-cyanbrand-500/15 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative z-10 space-y-6">
              
              <div className="flex justify-between items-center border-b border-corporate-800 pb-4">
                <div>
                  <h3 className="font-extrabold text-lg text-white flex items-center gap-2">
                    <Droplets className="w-5 h-5 text-cyanbrand-400" />
                    <span>Propuesta de Suministro</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">Plan corporativo calculado a la medida</p>
                </div>
                <span className="text-[11px] bg-cyanbrand-500/20 text-cyanbrand-300 font-bold px-3 py-1 rounded-full border border-cyanbrand-500/30">
                  B2B Personalizado
                </span>
              </div>

              {/* Big Metrics Display */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-corporate-950/80 p-4 rounded-2xl border border-corporate-800 text-center relative overflow-hidden group hover:border-cyanbrand-500/40 transition-colors">
                  <div className="text-3xl sm:text-4xl font-black text-cyanbrand-400">
                    {bidonesMonth}
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-300 block mt-1">
                    Bidones 20L / Mes
                  </span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">
                    ({totalLitersMonth.toLocaleString()} litros)
                  </span>
                </div>

                <div className="bg-corporate-950/80 p-4 rounded-2xl border border-corporate-800 text-center relative overflow-hidden group hover:border-cyanbrand-500/40 transition-colors">
                  <div className="text-3xl sm:text-4xl font-black text-ice-200">
                    {suggestedDispensers}
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-300 block mt-1">
                    Dispensadores Sug.
                  </span>
                  <span className="text-[10px] text-cyanbrand-400 block mt-0.5 font-medium">
                    {includeDispensers ? 'En comodato incluido' : 'Venta / Recambio'}
                  </span>
                </div>
              </div>

              {/* Suggested Logistics */}
              <div className="bg-corporate-950/60 p-4 rounded-2xl border border-corporate-800/80 space-y-2.5 text-xs">
                <div className="flex items-center justify-between text-slate-300">
                  <span className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-cyanbrand-400" />
                    <span>Frecuencia Óptima:</span>
                  </span>
                  <strong className="text-white font-bold">{suggestedFrequency}</strong>
                </div>

                <div className="flex items-center justify-between text-slate-300">
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Distribución Interna:</span>
                  </span>
                  <strong className="text-white font-bold">{includeInternalDelivery ? 'A cada piso' : 'Recepción central'}</strong>
                </div>

                <div className="flex items-center justify-between text-slate-300">
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Facturación Electrónica:</span>
                  </span>
                  <strong className="text-white font-bold">Factura con crédito 15/30 días</strong>
                </div>
              </div>

              {/* Ecological Impact Card */}
              <div className="bg-gradient-to-r from-emerald-950/40 to-corporate-950/60 p-4 rounded-2xl border border-emerald-500/30 space-y-2">
                <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Leaf className="w-4 h-4 text-emerald-400" />
                  <span>Impacto Ecológico y RSE para tu Empresa</span>
                </h4>
                <div className="flex justify-between items-center text-xs text-slate-300">
                  <span>Botellas PET 500ml evitadas:</span>
                  <strong className="text-white font-extrabold">{bottlesSaved.toLocaleString()} un. / mes</strong>
                </div>
                <div className="flex justify-between items-center text-xs text-slate-300">
                  <span>Reducción de residuos plásticos:</span>
                  <strong className="text-emerald-400 font-extrabold">{plasticKgSaved} kg / mes</strong>
                </div>
              </div>

            </div>

            {/* Action Buttons */}
            <div className="pt-6 relative z-10 space-y-3">
              <button
                onClick={handleWhatsAppQuote}
                className="w-full water-gradient-btn text-white font-black py-4 px-6 rounded-2xl shadow-xl shadow-cyanbrand-500/20 text-sm flex items-center justify-center gap-2.5 cursor-pointer group"
              >
                <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                <span>Solicitar Propuesta Formal B2B por WhatsApp</span>
              </button>

              <p className="text-[11px] text-center text-slate-400">
                Atención corporativa inmediata • Cotización formal en menos de 15 minutos
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
