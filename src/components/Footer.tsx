import logoImg from '../assets/logo.webp';
import { Phone, Mail, MapPin, Clock, Droplets, ShieldCheck, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">

          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <a href="#hero" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full p-0.5 bg-gradient-to-br from-cyan-400 to-blue-600 shadow-md shadow-cyan-500/20">
                <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center p-1">
                  <img src={logoImg} alt="Agua Jalsuri" className="w-full h-full object-contain" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-black tracking-tight text-white">JALSURI</span>
                <span className="text-[10px] uppercase font-bold text-cyan-400 -mt-1">Agua de Mesa Purificada</span>
              </div>
            </a>

            <p className="text-slate-400 leading-relaxed text-xs sm:text-sm">
              Agua de mesa ultra purificada mediante 7 fases tecnológicas avanzadas: Ósmosis Inversa, Ozono y Esterilización Ultravioleta. Cuidamos la hidratación y salud de miles de hogares y empresas.
            </p>

            <div className="flex items-center gap-2 pt-2">
              <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-cyan-400 font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                R.S. DIGESA Vigente
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                <Droplets className="w-3.5 h-3.5" />
                Baja en Sodio
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Enlaces Rápidos</h4>
            <ul className="space-y-2">
              <li><a href="#hero" className="hover:text-cyan-400 transition-colors">Inicio</a></li>
              <li><a href="#productos" className="hover:text-cyan-400 transition-colors">Catálogo de Productos</a></li>
              <li><a href="#pureza" className="hover:text-cyan-400 transition-colors">Proceso de 7 Etapas</a></li>
              <li><a href="#maquila" className="hover:text-cyan-400 transition-colors">Maquila de Agua</a></li>
              <li><a href="#beneficios" className="hover:text-cyan-400 transition-colors">Beneficios para la Salud</a></li>
              <li><a href="#cobertura" className="hover:text-cyan-400 transition-colors">Zonas de Cobertura</a></li>
            </ul>
          </div>

          {/* Products List */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Presentaciones</h4>
            <ul className="space-y-2">
              <li className="text-slate-300 font-medium">Bidón 8.5L con Caño Dosificador</li>
              <li className="text-slate-300 font-medium">Bidón 20L Clásico (Retornable / Nuevo)</li>
              <li className="text-slate-300 font-medium">Dispensador Eléctrico USB Automático</li>
              <li className="text-slate-300 font-medium">Dispensador de Mesa Cerámico / Plástico</li>
              <li className="text-slate-300 font-medium">Pack Familiar 625ml x 15 unidades</li>
              <li className="text-slate-300 font-medium">Botellas Institucionales con tu Marca</li>
            </ul>
          </div>

          {/* Contact & Hours */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Central de Atención</h4>
            <ul className="space-y-2.5">
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span>+51 987 654 321 / (01) 234-5678</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span>pedidos@aguademesajalsuri.com</span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span>Planta de Embotellado y Distribución, Lima - Perú</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span>Lunes a Sábado: 8:00 am - 6:00 pm</span>
              </li>
            </ul>

            <div className="pt-2">
              <a
                href="#cobertura"
                className="inline-flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 font-semibold"
              >
                <span>📘 Libro de Reclamaciones Virtual</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-slate-500 text-[11px]">
          <p>© {new Date().getFullYear()} Agua de Mesa Jalsuri. Todos los derechos reservados.</p>
          <p className="flex items-center gap-1 justify-center">
            Diseñado con <Heart className="w-3 h-3 text-rose-500 fill-rose-500" /> y máxima pureza para el bienestar de tu familia.
          </p>
        </div>

      </div>
    </footer>
  );
};
