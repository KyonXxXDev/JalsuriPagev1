import { useState } from 'react';
import { MessageSquare, X } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  const handleOpenWhatsApp = () => {
    const text = encodeURIComponent(
      '¡Hola Agua de Mesa Jalsuri! 👋 Quisiera solicitar un pedido de agua para delivery hoy. ¿Podrían atenderme?'
    );
    window.open(`https://wa.me/51987654321?text=${text}`, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
      {/* Tooltip message */}
      {showTooltip && (
        <div className="relative p-3.5 rounded-2xl bg-slate-900/95 border border-cyan-500/40 shadow-2xl shadow-cyan-950/60 text-xs text-white max-w-xs animate-in fade-in slide-in-from-bottom-2 duration-300 backdrop-blur-xl">
          <button
            onClick={() => setShowTooltip(false)}
            className="absolute -top-1.5 -left-1.5 w-5 h-5 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white"
            title="Cerrar mensaje"
          >
            <X className="w-3 h-3" />
          </button>
          <div className="flex items-start gap-2.5">
            <span className="flex h-2.5 w-2.5 relative mt-1 flex-shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <div>
              <p className="font-bold text-cyan-300">Asesor Jalsuri En Línea</p>
              <p className="text-slate-300 text-[11px] mt-0.5">
                ¡Hola! ¿Necesitas recargas o botellas para hoy? Escríbenos directamente aquí.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* WhatsApp Button */}
      <button
        onClick={handleOpenWhatsApp}
        className="relative group p-4 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white shadow-2xl shadow-emerald-500/40 hover:shadow-emerald-500/60 transform hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center cursor-pointer"
        aria-label="Contactar por WhatsApp"
      >
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-400 border-2 border-slate-950 text-[9px] font-bold items-center justify-center text-slate-950">
            1
          </span>
        </span>
        <MessageSquare className="w-7 h-7 fill-white" />
      </button>
    </div>
  );
};
