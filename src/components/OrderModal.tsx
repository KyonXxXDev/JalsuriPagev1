import { useState } from 'react';
import { X, Plus, Minus, ShoppingBag, Send, MapPin, User, Phone, Building, Calendar } from 'lucide-react';
import { PRODUCTS_DATA, type Product } from '../data/productsData';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialProduct?: Product | null;
}

interface CartItem {
  product: Product;
  quantity: number;
}

export const OrderModal: React.FC<OrderModalProps> = ({ isOpen, onClose, initialProduct }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (initialProduct) {
      return [{ product: initialProduct, quantity: 1 }];
    }
    return [{ product: PRODUCTS_DATA[0], quantity: 1 }];
  });

  const [customerName, setCustomerName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [frequency, setFrequency] = useState('Pedido Único');

  if (!isOpen) return null;

  const updateQuantity = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = Math.max(0, item.quantity + delta);
            return { ...item, quantity: newQty };
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  const addExtraProduct = (product: Product) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.product.id === product.id);
      if (exists) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleSendWhatsAppOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (cart.length === 0) {
      alert('Por favor añade al menos un producto a tu solicitud.');
      return;
    }

    const itemsSummary = cart
      .map((item) => `• ${item.quantity}x ${item.product.name} (Presentación: ${item.product.unit})`)
      .join('\n');

    const message = `*SOLICITUD DE COTIZACIÓN - AGUA JALSURI*
────────────────────────────
📦 *Formatos Solicitados:*
${itemsSummary}

🔄 *Frecuencia Requerida:* ${frequency}

📍 *Datos de Contacto:*
👤 *Contacto:* ${customerName || 'No especificado'}
🏢 *Empresa / Razón Social:* ${companyName || 'Particular / No especificado'}
📞 *Teléfono:* ${customerPhone || 'No especificado'}
📌 *Dirección / Distrito:* ${customerAddress || 'No especificado'}

_Solicito me compartan la cotización formal con factura y tiempos de entrega._`;

    window.open(`https://wa.me/51960695747?text=${encodeURIComponent(message)}`, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-corporate-950/85 backdrop-blur-md transition-opacity"
      ></div>

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-corporate-900 border border-slate-700/80 rounded-3xl shadow-2xl shadow-cyanbrand-950/60 overflow-hidden z-10 my-8">
        
        {/* Modal Header */}
        <div className="p-6 bg-corporate-950/80 border-b border-corporate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyanbrand-500 to-corporate-700 flex items-center justify-center text-white shadow-md shadow-cyanbrand-500/30">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Solicitud de Cotización Institucional</h3>
              <p className="text-xs text-slate-400">Arma tu requerimiento de suministro para empresas u hogar</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-corporate-800/80 hover:bg-corporate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSendWhatsAppOrder} className="p-6 space-y-6 max-h-[78vh] overflow-y-auto">
          
          {/* Selected Products List */}
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-cyanbrand-400 block">
              1. Formatos y Cantidades Seleccionadas
            </label>

            {cart.length === 0 ? (
              <div className="p-6 text-center bg-corporate-950/50 rounded-2xl border border-corporate-800 text-slate-400 text-sm">
                No hay productos seleccionados. Añade uno del catálogo.
              </div>
            ) : (
              <div className="space-y-2.5">
                {cart.map((item) => (
                  <div
                    key={item.product.id}
                    className="p-3.5 rounded-2xl bg-corporate-950/60 border border-corporate-800 flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-12 h-12 object-contain rounded-lg bg-corporate-900 p-1 flex-shrink-0"
                      />
                      <div className="truncate">
                        <h4 className="text-sm font-bold text-white truncate">{item.product.name}</h4>
                        <span className="text-xs text-cyanbrand-400 font-semibold">
                          {item.product.unit} • {item.product.supplyType || 'Suministro B2B'}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 flex-shrink-0">
                      <div className="flex items-center bg-corporate-900 border border-corporate-700 rounded-xl p-1">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.product.id, -1)}
                          className="w-7 h-7 flex items-center justify-center rounded-lg bg-corporate-800 hover:bg-corporate-700 text-slate-300 transition-colors"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-9 text-center text-xs font-bold text-white">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.product.id, 1)}
                          className="w-7 h-7 flex items-center justify-center rounded-lg bg-corporate-800 hover:bg-corporate-700 text-slate-300 transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <span className="text-xs font-bold text-slate-300">
                        {item.quantity} {item.quantity === 1 ? 'und' : 'unds'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Quick Add popular buttons */}
            <div className="pt-2">
              <span className="text-[11px] text-slate-400 block mb-2 font-medium">
                Añadir otro formato a la solicitud:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {PRODUCTS_DATA.filter((p) => !cart.some((c) => c.product.id === p.id)).slice(0, 4).map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => addExtraProduct(p)}
                    className="px-2.5 py-1 rounded-lg bg-corporate-800/80 hover:bg-corporate-700 text-[11px] font-semibold text-slate-300 hover:text-white border border-corporate-700 transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3 h-3 text-cyanbrand-400" />
                    <span>{p.name.split(' ')[0]} {p.name.split(' ')[1]}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Customer Delivery Details */}
          <div className="space-y-3 pt-2 border-t border-corporate-800">
            <label className="text-xs font-bold uppercase tracking-wider text-cyanbrand-400 block">
              2. Datos de Contacto y Entrega
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-slate-400 block mb-1">Nombre y Apellidos</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="Ej. Juan Pérez"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full bg-corporate-950 border border-corporate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyanbrand-400"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1">Empresa / Razón Social (Opcional)</label>
                <div className="relative">
                  <Building className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="text"
                    placeholder="Ej. Inversiones Global SAC"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full bg-corporate-950 border border-corporate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyanbrand-400"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1">WhatsApp / Teléfono</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="tel"
                    required
                    placeholder="Ej. 987 654 321"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full bg-corporate-950 border border-corporate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyanbrand-400"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1">Dirección y Distrito</label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="Ej. Av. Primavera 450, Santiago de Surco"
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                    className="w-full bg-corporate-950 border border-corporate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyanbrand-400"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="text-xs text-slate-400 block mb-1 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-cyanbrand-400" /> Frecuencia de Suministro Estimada
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {['Pedido Único', 'Semanal', 'Quincenal', 'Mensual'].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setFrequency(opt)}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold text-center transition-all cursor-pointer ${
                      frequency === opt
                        ? 'bg-cyanbrand-500/20 border border-cyanbrand-400 text-cyanbrand-300'
                        : 'bg-corporate-950 border border-corporate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Submission Bar */}
          <div className="p-4 rounded-2xl bg-corporate-950/80 border border-cyanbrand-500/30 flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-400 block">Total de unidades solicitadas:</span>
              <div className="text-xl font-black text-white">
                <span className="text-cyanbrand-400 mr-1">{totalItemsCount}</span>
                {totalItemsCount === 1 ? 'unidad' : 'unidades'}
              </div>
            </div>

            <button
              type="submit"
              className="px-6 py-3 water-gradient-btn text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg shadow-cyanbrand-500/25 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Solicitar Cotización por WhatsApp</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
