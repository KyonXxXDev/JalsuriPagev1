import { useState, useEffect } from 'react';
import logoImg from '../assets/logo.webp';
import { Phone, ShoppingBag, Menu, X, Droplets } from 'lucide-react';

interface NavbarProps {
  onOpenOrderModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenOrderModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Inicio', href: '#hero' },
    { name: 'Catálogo', href: '#productos' },
    { name: 'Calculadora B2B', href: '#calculadora' },
    { name: 'Estudio 3D', href: '#maquila3d' },
    { name: 'Pureza 7 Fases', href: '#pureza' },
    { name: 'Cobertura', href: '#cobertura' },
  ];

  return (
    <>
      <header
        className={`bg-ice-50 text-corporate-950 fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
          ? 'backdrop-blur-xl border-b shadow-lg shadow-cyan-950/30 py-3'
          : 'py-5'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="#hero" className="flex items-center gap-3 group">
              <div className="relative w-auto h-20 p-0.5 group-hover:scale-105 transition-transform duration-300">
                <div className="w-full h-full flex items-center justify-center overflow-hidden p-1">
                  <img
                    src={logoImg}
                    alt="Agua de Mesa Jalsuri"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1 border rounded-full px-4 py-1.5 backdrop-blur-md">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="px-3.5 py-1.5 text-xs font-medium hover:bg-cyan-500/10 rounded-full transition-all duration-200"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* Action Buttons */}
            <div className="hidden sm:flex items-center gap-3">
              <a
                href="tel:+51987654321"
                className="flex items-center gap-2 text-xs font-medium text-slate-300 hover:text-white px-3 py-2 rounded-lg hover:bg-slate-900/60 transition-colors"
                title="Llamar a Jalsuri Delivery"
              >
                <div className="w-7 h-7 rounded-full flex items-center justify-center">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <span className="hidden xl:inline">Delivery Inmediato</span>
              </a>

              <button
                onClick={onOpenOrderModal}
                className="relative group overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-cyan-400"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-sky-500 to-blue-600 rounded-full group-hover:opacity-100 transition-opacity"></span>
                <span className="relative flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-slate-950 rounded-full group-hover:bg-opacity-90 transition-all duration-200">
                  <ShoppingBag className="w-3.5 h-3.5 text-cyan-400 group-hover:scale-110 transition-transform" />
                  <span>Pedir Agua</span>
                </span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-white hover:border-cyan-500/40 transition-colors"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-cyan-400" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 px-4 pt-2 pb-6 bg-slate-950/95 backdrop-blur-2xl border-b border-slate-800/80 space-y-3 animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="grid grid-cols-1 gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2.5 text-sm font-medium rounded-xl transition-colors flex items-center justify-between"
                >
                  {link.name}
                  <span className="text-xs">→</span>
                </a>
              ))}
            </div>

            <div className="pt-2 border-t flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenOrderModal();
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl shadow-lg shadow-cyan-500/25 active:scale-[0.98] transition-all"
              >
                <ShoppingBag className="w-4 h-4" />
                Hacer Pedido Rápido
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
