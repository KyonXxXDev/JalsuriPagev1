// Import assets
import bidon85 from '../assets/img/PORTADA-WEB-JALSURI-BIDON-8.5-LITROS_2.webp';
import bidon20 from '../assets/img/20LT-OKAS.webp';
import dispensadorElec from '../assets/img/DISPENSADOR-2-1024x1024.webp';
import dispensadorMesa from '../assets/img/Dispensador-Jalsuri-1024x867.webp';
import rackMetalico from '../assets/img/Rack-para-bidondes2-1024x867-removebg-preview.webp';
import botellaPersonal from '../assets/img/1407jalsuri-1.webp';
import packFamiliar from '../assets/img/1407jalsuri-2-857x1024.webp';
import botellaDeportiva from '../assets/img/1407jalsuri-3-1-251x300.webp';
import cajaPremium from '../assets/img/1407jalsuri-4-857x1024.webp';
import maquilaImg from '../assets/img/AGUA-MAQUILA.webp';

export interface Product {
  id: string;
  name: string;
  category: 'bidones' | 'dispensadores' | 'botellas' | 'maquila';
  tagline: string;
  description: string;
  unit: string;
  supplyType?: string;
  image: string;
  badge?: string;
  features: string[];
  popular?: boolean;
}

export const PRODUCTS_DATA: Product[] = [
  {
    id: 'bidon-8-5l',
    name: 'Bidón Ergonómico 8.5L con Caño',
    category: 'bidones',
    tagline: 'Ideal para refrigerador y mesa sin esfuerzo',
    description: 'Diseño ultra práctico con caño dispensador integrado y manija ergonómica reforzada. Perfecto para familias, salas de reuniones y espacios compactos.',
    unit: 'Envase + Caño',
    supplyType: 'Suministro Directo',
    image: bidon85,
    badge: 'Más Innovador',
    popular: true,
    features: [
      'Caño dosificador hermético antigoteo',
      'Libre de BPA (Grado Alimentario)',
      'Cabe en la repisa de tu refrigerador',
      'Manija de fácil transporte y recambio'
    ]
  },
  {
    id: 'bidon-20l',
    name: 'Bidón Clásico 20 Litros',
    category: 'bidones',
    tagline: 'Máximo rendimiento para el hogar y la empresa',
    description: 'El formato institucional de 20 litros con agua 100% purificada por ósmosis inversa. Disponible para recarga periódica y suministro programado.',
    unit: 'Recarga / Envase',
    supplyType: 'Plan Corporativo & Hogar',
    image: bidon20,
    badge: 'Más Vendido',
    popular: true,
    features: [
      'Sello de termo-encogido de seguridad higiénica',
      'Compatible con todo tipo de dispensador estándar',
      'Entregas programadas según consumo',
      'Retornable y 100% eco-amigable'
    ]
  },
  {
    id: 'dispensador-recargable',
    name: 'Dispensador Eléctrico USB Automático',
    category: 'dispensadores',
    tagline: 'Servir agua con un solo toque digital',
    description: 'Bomba de succión recargable mediante cable USB. Batería de larga duración (sirve hasta 5 bidones por carga completa).',
    unit: 'Equipo',
    supplyType: 'Equipamiento',
    image: dispensadorElec,
    badge: 'Tecnología',
    features: [
      'Batería interna recargable vía USB tipo C',
      'Tubo de silicona quirúrgica grado médico',
      'Operación silenciosa con 1 toque touch',
      'Portátil y fácil de desinfectar'
    ]
  },
  {
    id: 'dispensador-mesa',
    name: 'Dispensador Jalsuri de Mesa',
    category: 'dispensadores',
    tagline: 'Elegancia y practicidad sin consumo eléctrico',
    description: 'Soporte compacto de polímero alimentario con válvula de caudal rápido y base estable antivuelco.',
    unit: 'Equipo',
    supplyType: 'Equipamiento',
    image: dispensadorMesa,
    features: [
      'Válvula de empuje suave de alto flujo',
      'Fácil desmontaje para esterilización',
      'Diseño moderno color blanco puro',
      'Cero consumo eléctrico, ideal para oficinas'
    ]
  },
  {
    id: 'rack-organizador',
    name: 'Rack Organizador Metálico para Bidones',
    category: 'dispensadores',
    tagline: 'Orden y optimización de espacio garantizados',
    description: 'Estructura de acero reforzado para almacenar bidones de 20L de manera ordenada y segura en tu almacén u oficina.',
    unit: 'Estructura',
    supplyType: 'Mobiliario Operativo',
    image: rackMetalico,
    badge: 'Logística B2B',
    features: [
      'Acero al carbono con pintura electrostática anticorrosiva',
      'Capacidad modular para 3 a 4 bidones',
      'Topes de goma niveladores que protegen el piso',
      'Alta estabilidad antisísmica'
    ]
  },
  {
    id: 'pack-familiar-botellas',
    name: 'Pack Institucional Jalsuri (625ml x 15)',
    category: 'botellas',
    tagline: 'Hidratación pura para personal y eventos',
    description: 'Agua purificada ultra fresca en presentación personal para colaboradores, comités, deportes y reuniones ejecutivas.',
    unit: 'Pack 15 unds',
    supplyType: 'Distribución Mayorista',
    image: packFamiliar,
    popular: true,
    features: [
      'Botellas 100% reciclables PET eco',
      'Tapa de seguridad con precinto inviolable',
      'Mineralización equilibrada y ligera',
      'Entrega por fardos o pallets'
    ]
  },
  {
    id: 'botella-personal',
    name: 'Botella Personal Jalsuri 625ml',
    category: 'botellas',
    tagline: 'La compañía diaria de hidratación saludable',
    description: 'Sabor puro y ligero sin sodio añadido. La compañía perfecta para tus rutinas laborales, clínicas y entrenamiento.',
    unit: 'Caja x 24 unds',
    supplyType: 'Consumo Masivo',
    image: botellaPersonal,
    features: [
      'Diseño ergonómico con agarre antideslizante',
      'Baja en sales minerales y sodio controlado',
      'Pureza microbiológica certificada DIGESA',
      'Empaque práctico para distribución interna'
    ]
  },
  {
    id: 'botella-deportiva',
    name: 'Botella Sport Activa Jalsuri',
    category: 'botellas',
    tagline: 'Frescura instantánea y alta resistencia',
    description: 'Envase reforzado para personal en campo, operaciones, gimnasios y eventos deportivos con tapa ergonómica de rápida apertura.',
    unit: 'Caja x 24 unds',
    supplyType: 'Operaciones & Deportes',
    image: botellaDeportiva,
    features: [
      'Ideal para plantas, minería y trabajo de campo',
      'Ultra hidratante y ligera al paladar',
      'Cero calorías y sodio controlado',
      'Material ecológico 100% reutilizable'
    ]
  },
  {
    id: 'caja-premium',
    name: 'Formato Ejecutivo en Caja Master',
    category: 'botellas',
    tagline: 'Abastecimiento continuo para congresos y catering',
    description: 'Caja reforzada con botellas de agua para eventos corporativos, clínicas, conferencias y hoteles.',
    unit: 'Caja Master',
    supplyType: 'Eventos & Corporativo',
    image: cajaPremium,
    features: [
      'Caja master reforzada para transporte y apilamiento',
      'Presentación sobria, ejecutiva y elegante',
      'Garantía de frescura de fábrica certificada',
      'Abastecimiento institucional garantizado'
    ]
  },
  {
    id: 'servicio-maquila',
    name: 'Maquila de Agua con Tu Propia Marca',
    category: 'maquila',
    tagline: 'Eleva el prestigio de tu empresa o evento',
    description: 'Embotellado personalizado con tu logotipo, colores y diseño corporativo en etiquetas fotográficas y envases exclusivos.',
    unit: 'Lote a Medida',
    supplyType: 'Marca Propia OEM',
    image: maquilaImg,
    badge: 'B2B Exclusivo',
    popular: true,
    features: [
      'Diseño y adaptación de etiqueta sin costo adicional',
      'Formatos desde 350ml, 500ml, 625ml, 1L y bidones',
      'Registro sanitario DIGESA vigente impreso',
      'Simulador 3D interactivo en esta plataforma'
    ]
  }
];

export const PURIFICATION_STEPS = [
  {
    step: '01',
    title: 'Filtración de Sedimentos',
    subtitle: 'Microfiltración de partículas',
    desc: 'Retención de arenas, sedimentos y partículas microscópicas suspendidas mediante filtros de polipropileno de alta densidad.'
  },
  {
    step: '02',
    title: 'Carbón Activado Granular',
    subtitle: 'Eliminación de cloro y olores',
    desc: 'Absorción profunda de cloro residual, metales pesados, turbidez, componentes orgánicos y cualquier sabor u olor indeseado.'
  },
  {
    step: '03',
    title: 'Ablandador de Agua',
    subtitle: 'Intercambio Iónico de resinas',
    desc: 'Eliminación del exceso de calcio y magnesio (sarro) para conseguir una ligereza incomparable al paladar y proteger tu salud renal.'
  },
  {
    step: '04',
    title: 'Ósmosis Inversa Industrial',
    subtitle: 'Separación molecular de vanguardia',
    desc: 'Membranas semipermeables de 0.0001 micras que eliminan el 99.9% de sales disueltas, virus, bacterias y contaminantes moleculares.'
  },
  {
    step: '05',
    title: 'Filtro Pulidor y Mineralización',
    subtitle: 'Equilibrio perfecto de pureza',
    desc: 'Micro-pulido final que ajusta el pH óptimo (7.2 - 7.5) con minerales esenciales para un sabor sumamente fresco y refrescante.'
  },
  {
    step: '06',
    title: 'Ozonización Continua',
    subtitle: 'Desinfección activa natural',
    desc: 'Inyección de ozono (O3), el desinfectante ecológico más potente conocido, garantizando un envasado 100% esterilizado y libre de gérmenes.'
  },
  {
    step: '07',
    title: 'Radiación Ultravioleta (UV)',
    subtitle: 'Barrera bacteriológica final',
    desc: 'El agua pasa a través de lámparas germicidas UV de alta intensidad instantes antes del embotellado, desactivando cualquier microorganismo residual.'
  }
];

export const TRUST_STATS = [
  { value: 15, suffix: 'k+', label: 'Hogares y Familias Atendidas', desc: 'Confían a diario en nuestra pureza' },
  { value: 7, suffix: '', label: 'Etapas de Purificación', desc: 'Tecnología de ósmosis y UV de última generación' },
  { value: 99.9, suffix: '%', label: 'Pureza Microbiológica', desc: 'Certificada por rigurosos análisis de laboratorio' },
  { value: 24, suffix: 'h', label: 'Entrega Rápida Delivery', desc: 'Envíos puntuales a tu puerta en tu zona' }
];

export const FAQS = [
  {
    q: '¿Cómo puedo solicitar una cotización o suministro para mi empresa?',
    a: 'Puedes solicitar una propuesta personalizada usando nuestra Calculadora B2B de esta web, el botón de WhatsApp o nuestro formulario. Preparamos cotizaciones formales a la medida de tu consumo mensual.'
  },
  {
    q: '¿Qué garantía sanitaria tiene el agua Jalsuri?',
    a: 'Contamos con Registro Sanitario DIGESA vigente, planta de tratamiento con 7 fases (incluyendo Ósmosis Inversa, Ozono y Luz UV) y análisis bacteriológicos periódicos que aseguran agua 100% segura para toda la familia y colaboradores.'
  },
  {
    q: '¿Hacen entregas programadas para oficinas e industrias?',
    a: 'Sí, contamos con atención corporativa con factura, entrega programada semanal o quincenal directo en cada piso o estación de hidratación, además de cesión en comodato de dispensadores frío/caliente.'
  },
  {
    q: '¿En qué consiste el servicio de Maquila de Agua personalizada?',
    a: 'Embotellamos agua con la marca y logo de tu empresa, hotel, restaurante o evento. Puedes usar nuestro Estudio 3D Interactivo para previsualizar tu botella, elegir el color de tapa y cotizar el lote requerido.'
  }
];
