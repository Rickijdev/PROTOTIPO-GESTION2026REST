(function() {
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const {
  useEffect,
  useMemo,
  useState
} = React;
const money = value => new Intl.NumberFormat('es-PE', {
  style: 'currency',
  currency: 'PEN'
}).format(Number(value) || 0);
const uid = () => Date.now() + Math.floor(Math.random() * 10000);
const dayKey = (date = new Date()) => new Intl.DateTimeFormat('sv-SE', {
  timeZone: 'America/Lima',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit'
}).format(date);
const timePE = (date = new Date()) => new Intl.DateTimeFormat('es-PE', {
  timeZone: 'America/Lima',
  hour: '2-digit',
  minute: '2-digit'
}).format(date);
const BUSINESS_PALETTES = [{
  id: 'executive',
  name: 'Ejecutivo Gourmet (Recomendada)',
  badge: 'Óptima B2B / POS',
  desc: 'Azul Cobalto (#2563EB) + Ámbar Culinario (#EA580C) + Esmeralda (#10B981). Reduce fatiga visual en turnos largos y transmite confianza financiera.',
  swatches: ['#2563EB', '#EA580C', '#6C5DD3', '#10B981']
}, {
  id: 'lezato',
  name: 'Lezato Original',
  badge: 'Clásica FoodTech',
  desc: 'Naranja Gastronómico (#FF5C00) + Púrpura Real (#6C5DD3) + Verde (#2BC155). Alta energía visual idéntica a la plantilla Lezato.',
  swatches: ['#FF5C00', '#6C5DD3', '#2BC155', '#1E1E2D']
}, {
  id: 'emerald',
  name: 'Esmeralda Corporativo',
  badge: 'Fresco & Moderno',
  desc: 'Turquesa Profundo (#0D9488) + Índigo (#6366F1). Evolución equilibrada de la paleta turquesa-violeta con alto contraste WCAG.',
  swatches: ['#0D9488', '#6366F1', '#059669', '#F59E0B']
}, {
  id: 'burgundy',
  name: 'Borgoña & Oro Bistro',
  badge: 'Alta Cocina',
  desc: 'Vino Reserva (#BE123C) + Dorado Cálido (#D97706). Ideal para restaurantes gourmet, carnes, parrillas y lounges.',
  swatches: ['#BE123C', '#D97706', '#7C3AED', '#15803D']
}];
const SvgIcon = ({
  name,
  size = 18
}) => {
  const props = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '2',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    className: 'svg-icon',
    'aria-hidden': 'true'
  };
  switch (name) {
    case 'chef':
      return /*#__PURE__*/React.createElement("svg", props, /*#__PURE__*/React.createElement("path", {
        d: "M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z"
      }), /*#__PURE__*/React.createElement("line", {
        x1: "6",
        y1: "17",
        x2: "18",
        y2: "17"
      }));
    case 'home':
      return /*#__PURE__*/React.createElement("svg", props, /*#__PURE__*/React.createElement("rect", {
        x: "3",
        y: "3",
        width: "7",
        height: "7",
        rx: "1.5"
      }), /*#__PURE__*/React.createElement("rect", {
        x: "14",
        y: "3",
        width: "7",
        height: "7",
        rx: "1.5"
      }), /*#__PURE__*/React.createElement("rect", {
        x: "14",
        y: "14",
        width: "7",
        height: "7",
        rx: "1.5"
      }), /*#__PURE__*/React.createElement("rect", {
        x: "3",
        y: "14",
        width: "7",
        height: "7",
        rx: "1.5"
      }));
    case 'inventory':
      return /*#__PURE__*/React.createElement("svg", props, /*#__PURE__*/React.createElement("path", {
        d: "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"
      }), /*#__PURE__*/React.createElement("polyline", {
        points: "3.27 6.96 12 12.01 20.73 6.96"
      }), /*#__PURE__*/React.createElement("line", {
        x1: "12",
        y1: "22.08",
        x2: "12",
        y2: "12"
      }));
    case 'charts':
      return /*#__PURE__*/React.createElement("svg", props, /*#__PURE__*/React.createElement("line", {
        x1: "18",
        y1: "20",
        x2: "18",
        y2: "10"
      }), /*#__PURE__*/React.createElement("line", {
        x1: "12",
        y1: "20",
        x2: "12",
        y2: "4"
      }), /*#__PURE__*/React.createElement("line", {
        x1: "6",
        y1: "20",
        x2: "6",
        y2: "14"
      }));
    case 'forms':
      return /*#__PURE__*/React.createElement("svg", props, /*#__PURE__*/React.createElement("path", {
        d: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
      }), /*#__PURE__*/React.createElement("polyline", {
        points: "14 2 14 8 20 8"
      }), /*#__PURE__*/React.createElement("line", {
        x1: "16",
        y1: "13",
        x2: "8",
        y2: "13"
      }), /*#__PURE__*/React.createElement("line", {
        x1: "16",
        y1: "17",
        x2: "8",
        y2: "17"
      }));
    case 'menu':
      return /*#__PURE__*/React.createElement("svg", props, /*#__PURE__*/React.createElement("line", {
        x1: "4",
        y1: "6",
        x2: "20",
        y2: "6"
      }), /*#__PURE__*/React.createElement("line", {
        x1: "4",
        y1: "12",
        x2: "16",
        y2: "12"
      }), /*#__PURE__*/React.createElement("line", {
        x1: "4",
        y1: "18",
        x2: "20",
        y2: "18"
      }));
    case 'search':
      return /*#__PURE__*/React.createElement("svg", props, /*#__PURE__*/React.createElement("circle", {
        cx: "11",
        cy: "11",
        r: "8"
      }), /*#__PURE__*/React.createElement("line", {
        x1: "21",
        y1: "21",
        x2: "16.65",
        y2: "16.65"
      }));
    case 'bell':
      return /*#__PURE__*/React.createElement("svg", props, /*#__PURE__*/React.createElement("path", {
        d: "M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M13.73 21a2 2 0 0 1-3.46 0"
      }));
    case 'chat':
      return /*#__PURE__*/React.createElement("svg", props, /*#__PURE__*/React.createElement("path", {
        d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
      }));
    case 'cup':
      return /*#__PURE__*/React.createElement("svg", props, /*#__PURE__*/React.createElement("path", {
        d: "M17 8h1a4 4 0 1 1 0 8h-1"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"
      }), /*#__PURE__*/React.createElement("line", {
        x1: "6",
        y1: "2",
        x2: "6",
        y2: "4"
      }), /*#__PURE__*/React.createElement("line", {
        x1: "10",
        y1: "2",
        x2: "10",
        y2: "4"
      }), /*#__PURE__*/React.createElement("line", {
        x1: "14",
        y1: "2",
        x2: "14",
        y2: "4"
      }));
    case 'dollar':
      return /*#__PURE__*/React.createElement("svg", props, /*#__PURE__*/React.createElement("line", {
        x1: "12",
        y1: "1",
        x2: "12",
        y2: "23"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"
      }));
    case 'orders':
      return /*#__PURE__*/React.createElement("svg", props, /*#__PURE__*/React.createElement("path", {
        d: "M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"
      }), /*#__PURE__*/React.createElement("line", {
        x1: "3",
        y1: "6",
        x2: "21",
        y2: "6"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M16 10a4 4 0 0 1-8 0"
      }));
    case 'users':
      return /*#__PURE__*/React.createElement("svg", props, /*#__PURE__*/React.createElement("path", {
        d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"
      }), /*#__PURE__*/React.createElement("circle", {
        cx: "9",
        cy: "7",
        r: "4"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M22 21v-2a4 4 0 0 0-3-3.87"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M16 3.13a4 4 0 0 1 0 7.75"
      }));
    case 'plane':
      return /*#__PURE__*/React.createElement("svg", props, /*#__PURE__*/React.createElement("path", {
        d: "M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"
      }));
    case 'pin':
      return /*#__PURE__*/React.createElement("svg", props, /*#__PURE__*/React.createElement("path", {
        d: "M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"
      }), /*#__PURE__*/React.createElement("circle", {
        cx: "12",
        cy: "10",
        r: "3"
      }));
    case 'palette':
      return /*#__PURE__*/React.createElement("svg", props, /*#__PURE__*/React.createElement("circle", {
        cx: "13.5",
        cy: "6.5",
        r: ".5"
      }), /*#__PURE__*/React.createElement("circle", {
        cx: "17.5",
        cy: "10.5",
        r: ".5"
      }), /*#__PURE__*/React.createElement("circle", {
        cx: "8.5",
        cy: "7.5",
        r: ".5"
      }), /*#__PURE__*/React.createElement("circle", {
        cx: "6.5",
        cy: "12.5",
        r: ".5"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"
      }));
    case 'moon':
      return /*#__PURE__*/React.createElement("svg", props, /*#__PURE__*/React.createElement("path", {
        d: "M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"
      }));
    case 'sun':
      return /*#__PURE__*/React.createElement("svg", props, /*#__PURE__*/React.createElement("circle", {
        cx: "12",
        cy: "12",
        r: "4"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M12 2v2"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M12 20v2"
      }), /*#__PURE__*/React.createElement("path", {
        d: "m4.93 4.93 1.41 1.41"
      }), /*#__PURE__*/React.createElement("path", {
        d: "m17.66 17.66 1.41 1.41"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M2 12h2"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M20 12h2"
      }));
    case 'trash':
      return /*#__PURE__*/React.createElement("svg", props, /*#__PURE__*/React.createElement("path", {
        d: "M3 6h18"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"
      }));
    case 'edit':
      return /*#__PURE__*/React.createElement("svg", props, /*#__PURE__*/React.createElement("path", {
        d: "M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"
      }));
    case 'plus':
      return /*#__PURE__*/React.createElement("svg", props, /*#__PURE__*/React.createElement("line", {
        x1: "12",
        y1: "5",
        x2: "12",
        y2: "19"
      }), /*#__PURE__*/React.createElement("line", {
        x1: "5",
        y1: "12",
        x2: "19",
        y2: "12"
      }));
    case 'chevron':
      return /*#__PURE__*/React.createElement("svg", props, /*#__PURE__*/React.createElement("polyline", {
        points: "9 18 15 12 9 6"
      }));
    case 'close':
      return /*#__PURE__*/React.createElement("svg", props, /*#__PURE__*/React.createElement("line", {
        x1: "18",
        y1: "6",
        x2: "6",
        y2: "18"
      }), /*#__PURE__*/React.createElement("line", {
        x1: "6",
        y1: "6",
        x2: "18",
        y2: "18"
      }));
    default:
      return /*#__PURE__*/React.createElement("svg", props, /*#__PURE__*/React.createElement("circle", {
        cx: "12",
        cy: "12",
        r: "4"
      }));
  }
};
const initialInventory = [{
  id: 1,
  nombre: 'Lomo saltado gourmet',
  categoria: 'Platos',
  stock: 28,
  minimo: 8,
  precio: 28.00,
  emoji: '🥩',
  vendidos: 89
}, {
  id: 2,
  nombre: 'Ceviche clásico norteño',
  categoria: 'Platos',
  stock: 19,
  minimo: 6,
  precio: 32.00,
  emoji: '🐟',
  vendidos: 84
}, {
  id: 3,
  nombre: 'Ají de gallina cremoso',
  categoria: 'Platos',
  stock: 22,
  minimo: 8,
  precio: 22.00,
  emoji: '🍛',
  vendidos: 76
}, {
  id: 4,
  nombre: 'Arroz con pollo norteño',
  categoria: 'Platos',
  stock: 18,
  minimo: 8,
  precio: 20.00,
  emoji: '🍗',
  vendidos: 68
}, {
  id: 5,
  nombre: 'Hamburguesa artesanal Lezato',
  categoria: 'Platos',
  stock: 31,
  minimo: 10,
  precio: 18.00,
  emoji: '🍔',
  vendidos: 64
}, {
  id: 6,
  nombre: 'Porción de papas nativas',
  categoria: 'Entradas',
  stock: 34,
  minimo: 10,
  precio: 10.00,
  emoji: '🍟',
  vendidos: 52
}, {
  id: 7,
  nombre: 'Papa a la huancaína',
  categoria: 'Entradas',
  stock: 12,
  minimo: 6,
  precio: 12.00,
  emoji: '🥗',
  vendidos: 49
}, {
  id: 8,
  nombre: 'Limonada frozen hierbabuena',
  categoria: 'Bebidas',
  stock: 40,
  minimo: 12,
  precio: 7.00,
  emoji: '🍋',
  vendidos: 91
}, {
  id: 9,
  nombre: 'Chicha morada artesanal',
  categoria: 'Bebidas',
  stock: 38,
  minimo: 12,
  precio: 6.00,
  emoji: '🍷',
  vendidos: 79
}, {
  id: 10,
  nombre: 'Gaseosa personal fría',
  categoria: 'Bebidas',
  stock: 50,
  minimo: 15,
  precio: 5.00,
  emoji: '🥤',
  vendidos: 62
}, {
  id: 11,
  nombre: 'Arroz con leche y mazamorra',
  categoria: 'Postres',
  stock: 11,
  minimo: 5,
  precio: 8.00,
  emoji: '🍮',
  vendidos: 41
}, {
  id: 12,
  nombre: 'Torta húmeda de chocolate',
  categoria: 'Postres',
  stock: 5,
  minimo: 6,
  precio: 10.00,
  emoji: '🍰',
  vendidos: 38
}];
const initialOrders = [{
  id: 1048,
  mesa: 4,
  cliente: 'Benny Chagur',
  direccion: 'Mesa 04 · Salón Principal',
  total: 55.00,
  estado: 'En preparación',
  items: ['1 × Lomo saltado gourmet', '1 × Ají de gallina cremoso', '1 × Gaseosa personal fría'],
  hora: '13:08'
}, {
  id: 1047,
  mesa: 2,
  cliente: 'Chynita Bella',
  direccion: 'Mesa 02 · Terraza',
  total: 39.00,
  estado: 'Pendiente',
  items: ['1 × Ceviche clásico norteño', '1 × Limonada frozen hierbabuena'],
  hora: '12:54'
}, {
  id: 1046,
  mesa: 7,
  cliente: 'David Heree',
  direccion: 'Av. Larco 1245 · Delivery',
  total: 46.00,
  estado: 'Listo',
  items: ['2 × Hamburguesa artesanal Lezato', '2 × Gaseosa personal fría'],
  hora: '12:41'
}, {
  id: 1045,
  mesa: 1,
  cliente: 'Evan D. Mas',
  direccion: 'Mesa 01 · Salón VIP',
  total: 30.00,
  estado: 'Entregado',
  items: ['1 × Arroz con pollo norteño', '1 × Torta húmeda de chocolate'],
  hora: '12:20'
}];
const initialCustomers = [{
  id: 1,
  nombre: 'Benny Chagur',
  pedidos: 18,
  gasto: 742,
  tipo: 'MEMBER',
  ubicacion: 'Av. América Sur 420, Trujillo'
}, {
  id: 2,
  nombre: 'Chynita Bella',
  pedidos: 12,
  gasto: 515,
  tipo: 'Regular Customer',
  ubicacion: 'Urb. Primavera 812, Trujillo'
}, {
  id: 3,
  nombre: 'David Heree',
  pedidos: 15,
  gasto: 628,
  tipo: 'MEMBER',
  ubicacion: 'Calle Los Pinos 234, El Golf'
}, {
  id: 4,
  nombre: 'Evan D. Mas',
  pedidos: 7,
  gasto: 286,
  tipo: 'Regular Customer',
  ubicacion: 'Av. Larco 1180, Víctor Larco'
}, {
  id: 5,
  nombre: 'Supratman Torres',
  pedidos: 21,
  gasto: 910,
  tipo: 'MEMBER',
  ubicacion: 'Urb. San Andrés 510, Trujillo'
}, {
  id: 6,
  nombre: 'John Kusnaidi',
  pedidos: 9,
  gasto: 364,
  tipo: 'Regular Customer',
  ubicacion: 'Jr. Pizarro 604, Centro Histórico'
}];
const initialTasks = [{
  id: 1,
  texto: 'Verificar stock mínimo de insumos para turno tarde',
  completada: true,
  area: 'Inventario'
}, {
  id: 2,
  texto: 'Confirmar despacho de pedidos delivery programados 11:24 AM',
  completada: false,
  area: 'Despacho'
}, {
  id: 3,
  texto: 'Cuadrar arqueo parcial de cobros Yape y Plin en Caja',
  completada: false,
  area: 'Caja'
}, {
  id: 4,
  texto: 'Actualizar precios de carta ejecutiva de almuerzo',
  completada: true,
  area: 'Carta'
}];
const NAV = [{
  key: 'dashboard',
  label: 'Dashboard',
  icon: 'home',
  children: [['inicio', 'Dashboard Light'], ['inicio-dark', 'Dashboard Dark'], ['mesas', 'Mesas y Pedidos (POS)'], ['cocina', 'Cocina (KDS)'], ['caja', 'Caja y Cobros'], ['resumen', 'Resumen del Día'], ['pedidos', 'Orders (Pedidos)'], ['detalle-pedido', 'Order Details'], ['clientes', 'Customers (Clientes)'], ['analitica', 'Analytics (Analítica)'], ['resenas', 'Review (Reseñas)'], ['tareas', 'Task (Tareas)']]
}, {
  key: 'inventario',
  label: 'Inventario y Carta',
  icon: 'inventory',
  children: [['inventario-productos', 'Productos y Menú'], ['inventario-categorias', 'Categorías'], ['inventario-movimientos', 'Movimientos de Stock']]
}, {
  key: 'graficos',
  label: 'Charts (Gráficos)',
  icon: 'charts',
  children: [['grafico-flot', 'Flot & Ventas'], ['grafico-canales', 'Canales & Métricas']]
}, {
  key: 'sistema',
  label: 'Forms & Tablas',
  icon: 'forms',
  children: [['sistema-formularios', 'Asistente & Formularios'], ['sistema-tablas', 'Tablas de Datos']]
}];
const PAGE_META = Object.fromEntries(NAV.flatMap(g => g.children.map(([key, label]) => [key, {
  title: label,
  group: g.label
}])));
function usePersistentState(key, fallback) {
  const [value, setValue] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch {
      return fallback;
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Safe fallback in restricted storage environments
    }
  }, [key, value]);
  return [value, setValue];
}
function App() {
  const [active, setActive] = useState('inicio');
  const [palette, setPalette] = usePersistentState('menu-prueba-palette', 'executive');
  const [theme, setTheme] = usePersistentState('menu-prueba-theme', 'light');
  const [openGroups, setOpenGroups] = useState({
    dashboard: true,
    inventario: true,
    graficos: false,
    sistema: false
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [search, setSearch] = useState('');
  const [inventory, setInventory] = usePersistentState('menu-prueba-inventario', initialInventory);
  const [orders, setOrders] = usePersistentState('menu-prueba-pedidos', initialOrders);
  const [payments, setPayments] = usePersistentState('menu-prueba-cobros', [{
    id: 901,
    pedidoId: 1044,
    mesa: 3,
    total: 84.00,
    metodo: 'Yape',
    dia: dayKey(),
    hora: '11:40'
  }, {
    id: 902,
    pedidoId: 1043,
    mesa: 5,
    total: 156.45,
    metodo: 'Tarjeta',
    dia: dayKey(),
    hora: '12:05'
  }]);
  const [customers, setCustomers] = usePersistentState('menu-prueba-clientes', initialCustomers);
  const [tasks, setTasks] = usePersistentState('menu-prueba-tareas', initialTasks);
  const [customLinks, setCustomLinks] = usePersistentState('menu-prueba-personalizados', []);
  const [selectedOrderId, setSelectedOrderId] = useState(1048);
  const [paletteModalOpen, setPaletteModalOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [toast, setToast] = useState('');
  useEffect(() => {
    document.documentElement.setAttribute('data-palette', palette);
    document.documentElement.setAttribute('data-theme', theme);
  }, [palette, theme]);
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(''), 2800);
    return () => clearTimeout(t);
  }, [toast]);
  const allSearchItems = useMemo(() => [...NAV.flatMap(g => g.children.map(([key, label]) => ({
    key,
    label,
    group: g.label,
    type: 'page'
  }))), ...customLinks.map(x => ({
    ...x,
    group: 'Personalizados',
    type: 'page'
  })), ...inventory.map(p => ({
    key: 'inventario-productos',
    label: `${p.emoji || '🍽️'} ${p.nombre} (${money(p.precio)})`,
    group: p.categoria,
    type: 'dish'
  }))], [customLinks, inventory]);
  const searchResults = search.trim() ? allSearchItems.filter(p => p.label.toLowerCase().includes(search.toLowerCase())).slice(0, 7) : [];
  const go = key => {
    if (key === 'inicio-dark') {
      setTheme('dark');
      setActive('inicio');
      setToast('Modo Oscuro (Dashboard Dark) activado.');
    } else if (key === 'inicio') {
      setTheme('light');
      setActive('inicio');
    } else {
      setActive(key);
    }
    setSearch('');
    setSidebarOpen(false);
    setNotifOpen(false);
    setChatOpen(false);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  const toggleHamburger = () => {
    if (window.innerWidth <= 960) {
      setSidebarOpen(v => !v);
    } else {
      setSidebarCollapsed(v => !v);
    }
  };
  const lowStockItems = inventory.filter(i => i.stock <= i.minimo);
  const activeOrders = orders.filter(o => o.estado !== 'Entregado');
  const readyOrders = orders.filter(o => o.estado === 'Listo' || o.estado === 'Entregado');
  const currentPaletteObj = BUSINESS_PALETTES.find(p => p.id === palette) || BUSINESS_PALETTES[0];
  const meta = PAGE_META[active] || customLinks.find(x => x.key === active) || {
    title: 'Dashboard',
    group: 'Dashboard'
  };
  return /*#__PURE__*/React.createElement("div", {
    className: `app-shell ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`,
    "data-palette": palette,
    "data-theme": theme
  }, /*#__PURE__*/React.createElement(Sidebar, {
    active: active,
    theme: theme,
    go: go,
    openGroups: openGroups,
    setOpenGroups: setOpenGroups,
    open: sidebarOpen,
    close: () => setSidebarOpen(false),
    customLinks: customLinks,
    setCustomLinks: setCustomLinks,
    onOpenPalette: () => setPaletteModalOpen(true)
  }), /*#__PURE__*/React.createElement("div", {
    className: "main-column"
  }, /*#__PURE__*/React.createElement("header", {
    className: "topbar"
  }, /*#__PURE__*/React.createElement("button", {
    className: "hamburger-btn",
    onClick: toggleHamburger,
    "aria-label": "Alternar barra lateral"
  }, /*#__PURE__*/React.createElement(SvgIcon, {
    name: "menu",
    size: 20
  })), /*#__PURE__*/React.createElement("div", {
    className: "topbar-page-title"
  }, active === 'inicio' ? 'Dashboard' : meta.title), /*#__PURE__*/React.createElement("div", {
    className: "global-search"
  }, /*#__PURE__*/React.createElement("input", {
    value: search,
    onChange: e => setSearch(e.target.value),
    placeholder: "Search Here / Buscar secci\xF3n o plato..."
  }), /*#__PURE__*/React.createElement(SvgIcon, {
    name: "search",
    size: 18
  }), searchResults.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "search-popover"
  }, searchResults.map((r, idx) => /*#__PURE__*/React.createElement("button", {
    key: `${r.key}-${idx}`,
    onClick: () => go(r.key)
  }, /*#__PURE__*/React.createElement("span", null, r.label), /*#__PURE__*/React.createElement("small", null, r.group))))), /*#__PURE__*/React.createElement("div", {
    className: "topbar-actions"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "palette-quick-btn",
    onClick: () => setPaletteModalOpen(true),
    title: "Cambiar paleta de colores de negocio"
  }, /*#__PURE__*/React.createElement("i", {
    className: "palette-dot"
  }), /*#__PURE__*/React.createElement("span", null, currentPaletteObj.name.split(' ')[0])), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "recipe-button",
    onClick: () => go('inventario-productos')
  }, /*#__PURE__*/React.createElement(SvgIcon, {
    name: "chef",
    size: 16
  }), /*#__PURE__*/React.createElement("span", null, "Recipe Guide / Carta")), /*#__PURE__*/React.createElement("div", {
    className: "popover-Wrapper"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "icon-button",
    onClick: () => {
      setNotifOpen(v => !v);
      setChatOpen(false);
    },
    "aria-label": "Notificaciones"
  }, /*#__PURE__*/React.createElement(SvgIcon, {
    name: "bell",
    size: 19
  }), /*#__PURE__*/React.createElement("span", {
    className: "badge-counter"
  }, lowStockItems.length + activeOrders.length)), notifOpen && /*#__PURE__*/React.createElement("div", {
    className: "dropdown-panel"
  }, /*#__PURE__*/React.createElement("h4", null, /*#__PURE__*/React.createElement("span", null, "Centro de Alertas"), /*#__PURE__*/React.createElement("small", null, lowStockItems.length, " stock \xB7 ", activeOrders.length, " cocina")), lowStockItems.map(item => /*#__PURE__*/React.createElement("div", {
    className: "dropdown-item",
    key: item.id
  }, /*#__PURE__*/React.createElement("span", null, "\u26A0\uFE0F Stock bajo: ", /*#__PURE__*/React.createElement("strong", null, item.nombre), " (", item.stock, " unid.)"), /*#__PURE__*/React.createElement("button", {
    className: "pill-tab active",
    onClick: () => go('inventario-movimientos')
  }, "Reponer"))), activeOrders.slice(0, 3).map(ord => /*#__PURE__*/React.createElement("div", {
    className: "dropdown-item",
    key: ord.id
  }, /*#__PURE__*/React.createElement("span", null, "\uD83C\uDF7D\uFE0F Pedido ", /*#__PURE__*/React.createElement("strong", null, "#", ord.id), " (", ord.estado, ")"), /*#__PURE__*/React.createElement("button", {
    className: "pill-tab",
    onClick: () => go('cocina')
  }, "Ver"))))), /*#__PURE__*/React.createElement("div", {
    className: "popover-Wrapper"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "icon-button",
    onClick: () => {
      setChatOpen(v => !v);
      setNotifOpen(false);
    },
    "aria-label": "Mensajes de Cocina y Caja"
  }, /*#__PURE__*/React.createElement(SvgIcon, {
    name: "chat",
    size: 19
  }), /*#__PURE__*/React.createElement("span", {
    className: "badge-counter accent"
  }, readyOrders.length || 5)), chatOpen && /*#__PURE__*/React.createElement("div", {
    className: "dropdown-panel"
  }, /*#__PURE__*/React.createElement("h4", null, /*#__PURE__*/React.createElement("span", null, "Monitor de Despacho y Caja"), /*#__PURE__*/React.createElement("small", null, "En vivo")), readyOrders.length ? readyOrders.map(ord => /*#__PURE__*/React.createElement("div", {
    className: "dropdown-item",
    key: ord.id
  }, /*#__PURE__*/React.createElement("span", null, "\u2705 Mesa ", ord.mesa, " (", ord.estado, ") \u2014 ", /*#__PURE__*/React.createElement("strong", null, money(ord.total))), /*#__PURE__*/React.createElement("button", {
    className: "pill-tab active",
    onClick: () => go('caja')
  }, "Cobrar"))) : /*#__PURE__*/React.createElement("div", {
    className: "dropdown-item"
  }, /*#__PURE__*/React.createElement("span", null, "Todos los pedidos entregados han sido liquidados.")))), /*#__PURE__*/React.createElement("div", {
    className: "profile-chip",
    onClick: () => go('resumen'),
    title: "Ver resumen de turno"
  }, /*#__PURE__*/React.createElement("span", {
    className: "avatar"
  }, "MP"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("strong", null, "Administrador"), /*#__PURE__*/React.createElement("small", null, "Lezato \xB7 MenuDe-Prueba"))))), /*#__PURE__*/React.createElement("main", {
    className: "content"
  }, /*#__PURE__*/React.createElement("div", {
    className: "page-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "page-head-left"
  }, /*#__PURE__*/React.createElement("h1", null, meta.title), /*#__PURE__*/React.createElement("p", null, "Bienvenido a Lezato \xB7 Sistema Administrativo y POS Gastron\xF3mico")), /*#__PURE__*/React.createElement("div", {
    className: "breadcrumb"
  }, /*#__PURE__*/React.createElement("span", null, meta.group), /*#__PURE__*/React.createElement("b", null, "/"), /*#__PURE__*/React.createElement("strong", null, meta.title))), /*#__PURE__*/React.createElement(PageRouter, {
    active: active,
    inventory: inventory,
    setInventory: setInventory,
    orders: orders,
    setOrders: setOrders,
    payments: payments,
    setPayments: setPayments,
    customers: customers,
    setCustomers: setCustomers,
    tasks: tasks,
    setTasks: setTasks,
    selectedOrderId: selectedOrderId,
    setSelectedOrderId: setSelectedOrderId,
    toast: setToast,
    customLinks: customLinks,
    setCustomLinks: setCustomLinks,
    go: go
  })), /*#__PURE__*/React.createElement("footer", {
    className: "footer"
  }, "Copyright \xA9 Dise\xF1ado y Desarrollado al estilo ", /*#__PURE__*/React.createElement("b", null, "Lezato DexignZone"), " \xB7 Adaptado para ", /*#__PURE__*/React.createElement("b", null, "MenuDe-Prueba ERP 2026"))), /*#__PURE__*/React.createElement("div", {
    className: "floating-dock"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "dock-btn",
    onClick: () => setPaletteModalOpen(true),
    title: "Personalizar Paleta de Colores de Negocio",
    "aria-label": "Abrir selector de paleta"
  }, /*#__PURE__*/React.createElement(SvgIcon, {
    name: "palette",
    size: 20
  })), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "dock-btn alt",
    onClick: () => {
      const next = theme === 'light' ? 'dark' : 'light';
      setTheme(next);
      setToast(next === 'dark' ? 'Modo Oscuro activado' : 'Modo Claro activado');
    },
    title: "Alternar Modo Claro / Oscuro",
    "aria-label": "Alternar tema claro u oscuro"
  }, /*#__PURE__*/React.createElement(SvgIcon, {
    name: theme === 'light' ? 'moon' : 'sun',
    size: 20
  }))), paletteModalOpen && /*#__PURE__*/React.createElement("div", {
    className: "modal-layer",
    onMouseDown: () => setPaletteModalOpen(false)
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-card confirm-dialog",
    style: {
      width: 'min(680px, 95vw)'
    },
    onMouseDown: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-head",
    style: {
      padding: '0 0 16px'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("small", null, "DISE\xD1O CORPORATIVO & PSICOLOG\xCDA DEL COLOR"), /*#__PURE__*/React.createElement("h2", null, "Paleta de Colores de Negocio")), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "modal-close-btn",
    onClick: () => setPaletteModalOpen(false)
  }, "\xD7")), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '10px 0 6px',
      fontSize: '12.5px',
      color: 'var(--muted)'
    }
  }, "Selecciona la paleta visual del sistema. La opci\xF3n ", /*#__PURE__*/React.createElement("strong", null, "Ejecutivo Gourmet"), " est\xE1 optimizada para reducir la fatiga ocular en caja y destacar m\xE9tricas financieras y llamadas a la acci\xF3n."), /*#__PURE__*/React.createElement("div", {
    className: "palette-modal-grid"
  }, BUSINESS_PALETTES.map(p => /*#__PURE__*/React.createElement("button", {
    type: "button",
    key: p.id,
    className: `palette-card ${palette === p.id ? 'active' : ''}`,
    onClick: () => {
      setPalette(p.id);
      setToast(`Paleta "${p.name}" aplicada.`);
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "swatch-row"
  }, p.swatches.map(hex => /*#__PURE__*/React.createElement("i", {
    key: hex,
    style: {
      background: hex
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '4px'
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      fontSize: '13.5px'
    }
  }, p.name), /*#__PURE__*/React.createElement("span", {
    className: "status ready"
  }, p.badge)), /*#__PURE__*/React.createElement("small", {
    style: {
      color: 'var(--muted)',
      fontSize: '11.5px',
      lineHeight: 1.45,
      display: 'block'
    }
  }, p.desc)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: '18px',
      paddingTop: '14px',
      borderTop: '1px solid var(--line)'
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "secondary",
    onClick: () => setTheme(theme === 'light' ? 'dark' : 'light')
  }, /*#__PURE__*/React.createElement(SvgIcon, {
    name: theme === 'light' ? 'moon' : 'sun',
    size: 16
  }), "Cambiar a Modo ", theme === 'light' ? 'Oscuro (Dark)' : 'Claro (Light)'), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "primary",
    onClick: () => setPaletteModalOpen(false)
  }, "Listo y Aplicar")))), toast && /*#__PURE__*/React.createElement("div", {
    className: "toast"
  }, toast));
}
function Sidebar({
  active,
  theme,
  go,
  openGroups,
  setOpenGroups,
  open,
  close,
  customLinks,
  setCustomLinks,
  onOpenPalette
}) {
  const [manage, setManage] = useState(false);
  const [name, setName] = useState('');
  const addCustom = e => {
    e.preventDefault();
    const clean = name.trim();
    if (!clean) return;
    setCustomLinks([...customLinks, {
      key: `custom-${uid()}`,
      label: clean
    }]);
    setName('');
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("aside", {
    className: `sidebar ${open ? 'open' : ''}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "brand"
  }, /*#__PURE__*/React.createElement("span", {
    className: "brand-mark"
  }, /*#__PURE__*/React.createElement(SvgIcon, {
    name: "chef",
    size: 24
  })), /*#__PURE__*/React.createElement("div", {
    className: "brand-text"
  }, /*#__PURE__*/React.createElement("strong", null, "Lezato", /*#__PURE__*/React.createElement("i", null, ".")), /*#__PURE__*/React.createElement("small", null, "MENUDE-PRUEBA POS")), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "sidebar-close",
    onClick: close,
    "aria-label": "Cerrar men\xFA"
  }, /*#__PURE__*/React.createElement(SvgIcon, {
    name: "close",
    size: 18
  }))), /*#__PURE__*/React.createElement("div", {
    className: "sidebar-label"
  }, "MEN\xDA PRINCIPAL"), /*#__PURE__*/React.createElement("nav", {
    className: "side-nav"
  }, NAV.map(group => {
    const expanded = !!openGroups[group.key];
    const childActive = group.children.some(([k]) => k === active || k === 'inicio-dark' && active === 'inicio' && theme === 'dark');
    return /*#__PURE__*/React.createElement("div", {
      className: "nav-group",
      key: group.key
    }, /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: `nav-parent ${childActive ? 'has-active' : ''}`,
      onClick: () => setOpenGroups({
        ...openGroups,
        [group.key]: !expanded
      })
    }, /*#__PURE__*/React.createElement("span", {
      className: "nav-parent-left"
    }, /*#__PURE__*/React.createElement(SvgIcon, {
      name: group.icon,
      size: 20
    }), /*#__PURE__*/React.createElement("span", {
      className: "nav-parent-label"
    }, group.label)), /*#__PURE__*/React.createElement("span", {
      className: `chevron ${expanded ? 'down' : ''}`
    }, /*#__PURE__*/React.createElement(SvgIcon, {
      name: "chevron",
      size: 16
    }))), expanded && /*#__PURE__*/React.createElement("div", {
      className: "nav-children"
    }, group.children.map(([key, label]) => {
      const isCurrent = key === 'inicio' && active === 'inicio' && theme === 'light' || key === 'inicio-dark' && active === 'inicio' && theme === 'dark' || key !== 'inicio' && key !== 'inicio-dark' && active === key;
      return /*#__PURE__*/React.createElement("button", {
        type: "button",
        key: key,
        className: isCurrent ? 'active' : '',
        onClick: () => go(key)
      }, /*#__PURE__*/React.createElement("span", {
        className: "tiny-dot"
      }), label);
    })));
  }), /*#__PURE__*/React.createElement("div", {
    className: "nav-group"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "nav-parent",
    onClick: () => setManage(v => !v)
  }, /*#__PURE__*/React.createElement("span", {
    className: "nav-parent-left"
  }, /*#__PURE__*/React.createElement(SvgIcon, {
    name: "plus",
    size: 20
  }), /*#__PURE__*/React.createElement("span", {
    className: "nav-parent-label"
  }, "Personalizados")), /*#__PURE__*/React.createElement("span", {
    className: `chevron ${manage ? 'down' : ''}`
  }, /*#__PURE__*/React.createElement(SvgIcon, {
    name: "chevron",
    size: 16
  }))), manage && /*#__PURE__*/React.createElement("div", {
    className: "custom-menu-box"
  }, /*#__PURE__*/React.createElement("form", {
    onSubmit: addCustom
  }, /*#__PURE__*/React.createElement("input", {
    value: name,
    onChange: e => setName(e.target.value),
    placeholder: "Nuevo submen\xFA..."
  }), /*#__PURE__*/React.createElement("button", {
    type: "submit"
  }, "Crear")), customLinks.map(link => /*#__PURE__*/React.createElement("div", {
    className: "custom-link",
    key: link.key
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => go(link.key)
  }, link.label), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "remove-mini",
    onClick: () => setCustomLinks(customLinks.filter(x => x.key !== link.key))
  }, "\xD7"))), !customLinks.length && /*#__PURE__*/React.createElement("small", null, "Crea accesos o m\xF3dulos propios para tu operaci\xF3n diaria.")))), /*#__PURE__*/React.createElement("div", {
    className: "sidebar-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sidebar-card-illus"
  }, /*#__PURE__*/React.createElement(SvgIcon, {
    name: "chef",
    size: 26
  })), /*#__PURE__*/React.createElement("span", null, "LEZATO RESTAURANT ADMIN"), /*#__PURE__*/React.createElement("strong", null, "Gesti\xF3n Gastron\xF3mica Inteligente"), /*#__PURE__*/React.createElement("p", null, "Controla sal\xF3n, cocina, cobros acumulados de caja e inventario en tiempo real."), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "primary",
    style: {
      width: '100%',
      minHeight: '38px',
      fontSize: '12px'
    },
    onClick: onOpenPalette
  }, "Paleta de Negocios"), /*#__PURE__*/React.createElement("div", {
    className: "sidebar-copyright"
  }, "Lezato Admin \xA9 2026 All Rights Reserved"))), open && /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "sidebar-backdrop",
    onClick: close,
    "aria-label": "Cerrar barra lateral"
  }));
}
function PageRouter(props) {
  const {
    active
  } = props;
  if (active === 'inicio') return /*#__PURE__*/React.createElement(Dashboard, props);
  if (active === 'mesas') return /*#__PURE__*/React.createElement(TablesView, props);
  if (active === 'cocina') return /*#__PURE__*/React.createElement(Kitchen, props);
  if (active === 'caja') return /*#__PURE__*/React.createElement(Cashier, props);
  if (active === 'resumen') return /*#__PURE__*/React.createElement(Summary, props);
  if (active === 'pedidos') return /*#__PURE__*/React.createElement(Orders, props);
  if (active === 'detalle-pedido') return /*#__PURE__*/React.createElement(OrderDetail, props);
  if (active === 'clientes') return /*#__PURE__*/React.createElement(Customers, props);
  if (active === 'analitica') return /*#__PURE__*/React.createElement(Analytics, props);
  if (active === 'resenas') return /*#__PURE__*/React.createElement(Reviews, props);
  if (active === 'tareas') return /*#__PURE__*/React.createElement(TasksView, props);
  if (active === 'inventario-productos') return /*#__PURE__*/React.createElement(Inventory, props);
  if (active === 'inventario-categorias') return /*#__PURE__*/React.createElement(Categories, props);
  if (active === 'inventario-movimientos') return /*#__PURE__*/React.createElement(Movements, props);
  if (active.startsWith('grafico-')) return /*#__PURE__*/React.createElement(Charts, _extends({
    type: active.replace('grafico-', '')
  }, props));
  if (active === 'sistema-formularios') return /*#__PURE__*/React.createElement(Forms, props);
  if (active === 'sistema-tablas') return /*#__PURE__*/React.createElement(DataTables, props);
  if (active.startsWith('custom-')) return /*#__PURE__*/React.createElement(CustomPage, _extends({
    active: active
  }, props));
  return /*#__PURE__*/React.createElement(Dashboard, props);
}

/* ==========================================================================
   VISTA 1: LEZATO DASHBOARD (ESTRUCTURA FIEL A https://lezato-vite.vercel.app/dashboard)
   ========================================================================== */

function Dashboard({
  orders,
  inventory,
  payments = [],
  customers = [],
  go,
  toast
}) {
  const today = dayKey();
  const todayRevenue = payments.filter(p => p.dia === today).reduce((s, p) => s + p.total, 0);
  const lowCount = inventory.filter(i => i.stock <= i.minimo).length;
  const totalOrdersCount = orders.length + 243;
  const totalMenusCount = inventory.length + 447;
  const totalCustomersCount = customers.length + 866;
  const [mapPeriod, setMapPeriod] = useState('Year');
  const [showAllCustomers, setShowAllCustomers] = useState(false);
  const [keywords, setKeywords] = useState([{
    tag: '#ceviche',
    count: 452,
    pct: 88
  }, {
    tag: '#almuerzoejecutivo',
    count: 197,
    pct: 62
  }, {
    tag: '#lomosaltado',
    count: 156,
    pct: 48
  }, {
    tag: '#chichamorada',
    count: 98,
    pct: 34
  }]);
  const [otherTags, setOtherTags] = useState(['#comidaPerú', '#parrilla', '#deliveryExpress', '#postresArtesanales', '#mariscos', '#ejecutivo', '16+']);
  const displayedCustomers = showAllCustomers ? customers : customers.slice(0, 5);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("section", {
    className: "lezato-top-grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lezato-stats-grid"
  }, /*#__PURE__*/React.createElement(StatCard, {
    label: "Total Menus",
    value: totalMenusCount,
    detail: `${inventory.length} platos en carta activa`,
    icon: "cup",
    percent: 74
  }), /*#__PURE__*/React.createElement(StatCard, {
    label: "Total Revenue (Hoy)",
    value: money(todayRevenue),
    detail: "Cobros acumulados del d\xEDa",
    icon: "dollar",
    percent: 84
  }), /*#__PURE__*/React.createElement(StatCard, {
    label: "Total Orders",
    value: totalOrdersCount,
    detail: `${orders.length} pedidos en curso ahora`,
    icon: "orders",
    percent: 66
  }), /*#__PURE__*/React.createElement(StatCard, {
    label: "Total Customers",
    value: totalCustomersCount,
    detail: lowCount ? `${lowCount} insumos en stock mínimo` : 'Inventario saludable',
    icon: "users",
    percent: 80,
    alert: lowCount > 0
  })), /*#__PURE__*/React.createElement("article", {
    className: "panel dashboard-revenue"
  }, /*#__PURE__*/React.createElement("div", {
    className: "panel-title",
    style: {
      marginBottom: '8px'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", null, "Today's Revenue \xB7 Ingresos de Hoy"), /*#__PURE__*/React.createElement("p", null, "Curva horaria de ventas confirmadas en Caja (", today, ")")), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "pill-tab active",
    onClick: () => go('resumen')
  }, "Ver Arqueo")), /*#__PURE__*/React.createElement("div", {
    className: "revenue-metrics-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "revenue-primary-figure"
  }, /*#__PURE__*/React.createElement("strong", null, money(todayRevenue))), /*#__PURE__*/React.createElement("span", {
    className: "revenue-growth-badge"
  }, "\u25B2 0,5% than last day")), /*#__PURE__*/React.createElement(AreaWaveChart, null))), /*#__PURE__*/React.createElement("section", {
    className: "lezato-main-columns"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lezato-col-left"
  }, /*#__PURE__*/React.createElement("article", {
    className: "panel trending-panel"
  }, /*#__PURE__*/React.createElement("div", {
    className: "panel-title"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", null, "Daily Trending Menus"), /*#__PURE__*/React.createElement("p", null, "Los 5 platos m\xE1s solicitados hoy en sal\xF3n y delivery")), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "pill-tab",
    onClick: () => go('inventario-productos')
  }, "Carta \u2192")), /*#__PURE__*/React.createElement("div", {
    className: "menu-ranking"
  }, inventory.slice(0, 5).map((p, i) => /*#__PURE__*/React.createElement("div", {
    className: "trending-item",
    key: p.id
  }, /*#__PURE__*/React.createElement("span", {
    className: "rank-number"
  }, "#", i + 1), /*#__PURE__*/React.createElement("div", {
    className: "trending-meta"
  }, /*#__PURE__*/React.createElement("strong", null, p.nombre), /*#__PURE__*/React.createElement("div", {
    className: "trending-sub"
  }, /*#__PURE__*/React.createElement("b", null, money(p.precio)), /*#__PURE__*/React.createElement("small", null, "Order ", p.vendidos || 89 - i * 6, "x"))), /*#__PURE__*/React.createElement("div", {
    className: "rank-thumb-box",
    title: `Stock disponible: ${p.stock}`
  }, p.emoji || ['🥩', '🐟', '🍛', '🍗', '🍔'][i]))))), /*#__PURE__*/React.createElement("article", {
    className: "panel keyword-panel"
  }, /*#__PURE__*/React.createElement("div", {
    className: "panel-title"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", null, "Trending Keyword"), /*#__PURE__*/React.createElement("p", null, "Etiquetas y b\xFAsquedas con mayor conversi\xF3n"))), /*#__PURE__*/React.createElement("div", {
    className: "keyword-bars-list"
  }, keywords.map(k => /*#__PURE__*/React.createElement("div", {
    className: "keyword-bar-item",
    key: k.tag
  }, /*#__PURE__*/React.createElement("div", {
    className: "keyword-bar-top"
  }, /*#__PURE__*/React.createElement("span", null, k.tag), /*#__PURE__*/React.createElement("b", null, k.count, " times")), /*#__PURE__*/React.createElement("div", {
    className: "keyword-progress-track"
  }, /*#__PURE__*/React.createElement("div", {
    className: "keyword-progress-fill",
    style: {
      width: `${k.pct}%`
    }
  }))))), /*#__PURE__*/React.createElement("div", {
    className: "others-tag-section"
  }, /*#__PURE__*/React.createElement("h4", null, "Others tag"), /*#__PURE__*/React.createElement("div", {
    className: "tag-cloud"
  }, otherTags.map(tag => /*#__PURE__*/React.createElement("button", {
    type: "button",
    key: tag,
    className: "tag-pill",
    onClick: () => {
      if (tag === '16+') {
        setOtherTags([...otherTags.filter(t => t !== '16+'), '#anticuchos', '#picarones', '#chifles']);
        toast('Se desplegaron etiquetas gastronómicas adicionales.');
      } else {
        setKeywords(keywords.map((k, idx) => idx === 0 ? {
          ...k,
          count: k.count + 1
        } : k));
        toast(`Filtro rápido "${tag}" registrado en tendencias.`);
      }
    }
  }, tag)))))), /*#__PURE__*/React.createElement("div", {
    className: "lezato-col-right"
  }, /*#__PURE__*/React.createElement("article", {
    className: "panel customer-map-panel"
  }, /*#__PURE__*/React.createElement("div", {
    className: "panel-title"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", null, "Customer Map"), /*#__PURE__*/React.createElement("p", null, "Volumen diario de comensales y rotaci\xF3n de mesas")), /*#__PURE__*/React.createElement("div", {
    className: "panel-title-actions"
  }, ['Year', 'Monthly', 'Week'].map(period => /*#__PURE__*/React.createElement("button", {
    type: "button",
    key: period,
    className: `pill-tab ${mapPeriod === period ? 'active' : ''}`,
    onClick: () => setMapPeriod(period)
  }, period)))), /*#__PURE__*/React.createElement(CustomerBars, {
    period: mapPeriod
  })), /*#__PURE__*/React.createElement("article", {
    className: "panel customer-panel"
  }, /*#__PURE__*/React.createElement("div", {
    className: "panel-title"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", null, "Customers"), /*#__PURE__*/React.createElement("p", null, "Clientes frecuentes y miembros registrados")), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "icon-button",
    style: {
      background: 'var(--primary)',
      color: '#fff',
      width: '38px',
      height: '38px'
    },
    onClick: () => go('clientes'),
    title: "Gestionar o agregar cliente",
    "aria-label": "Ir a clientes"
  }, /*#__PURE__*/React.createElement(SvgIcon, {
    name: "plus",
    size: 18
  }))), /*#__PURE__*/React.createElement("div", {
    className: "customer-list-wrap"
  }, displayedCustomers.map(c => /*#__PURE__*/React.createElement("div", {
    className: "customer-row",
    key: c.id
  }, /*#__PURE__*/React.createElement("span", {
    className: "avatar"
  }, c.nombre.split(' ').map(x => x[0]).join('').slice(0, 2)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("strong", null, c.nombre), /*#__PURE__*/React.createElement("small", null, c.ubicacion || `${c.pedidos} pedidos acumulados · ${money(c.gasto)}`)), /*#__PURE__*/React.createElement("span", {
    className: `member-badge ${c.tipo === 'MEMBER' ? 'vip' : 'regular'}`
  }, c.tipo)))), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "expand-circle-btn",
    onClick: () => setShowAllCustomers(v => !v),
    "aria-label": "Mostrar m\xE1s clientes",
    title: showAllCustomers ? 'Contraer lista' : 'Ver todos los clientes'
  }, /*#__PURE__*/React.createElement("span", {
    className: `chevron ${showAllCustomers ? 'down' : ''}`,
    style: {
      transform: showAllCustomers ? 'rotate(-90deg)' : 'rotate(90deg)'
    }
  }, /*#__PURE__*/React.createElement(SvgIcon, {
    name: "chevron",
    size: 16
  })))), /*#__PURE__*/React.createElement("article", {
    className: "panel delivery-panel"
  }, /*#__PURE__*/React.createElement("div", {
    className: "panel-title"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", null, "Delivery Maps"), /*#__PURE__*/React.createElement("p", null, "Monitoreo de rutas activas y despachos programados")), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "pill-tab",
    onClick: () => go('pedidos')
  }, "Ver Pedidos (", orders.length, ")")), /*#__PURE__*/React.createElement(DeliveryMap, {
    activeCount: orders.length + 41
  }), /*#__PURE__*/React.createElement("div", {
    className: "shipping-schedule-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "plane-badge"
  }, /*#__PURE__*/React.createElement(SvgIcon, {
    name: "plane",
    size: 18
  })), /*#__PURE__*/React.createElement("h3", null, "Upcoming Shipping Schedule")), /*#__PURE__*/React.createElement("div", {
    className: "shipping-list"
  }, orders.slice(0, 3).map(o => /*#__PURE__*/React.createElement("div", {
    className: "shipping-item",
    key: o.id
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("strong", null, o.cliente, " (", o.items.length, " Items)"), /*#__PURE__*/React.createElement("span", null, "Will be shipping on ", o.hora, " \xB7 Estado: ", o.estado), /*#__PURE__*/React.createElement("small", null, o.direccion || `Mesa ${String(o.mesa).padStart(2, '0')} · Salón Principal, Trujillo / Perú`)), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "pin-btn",
    onClick: () => go('detalle-pedido'),
    title: "Ver ruta y seguimiento del pedido",
    "aria-label": "Ver seguimiento"
  }, /*#__PURE__*/React.createElement(SvgIcon, {
    name: "pin",
    size: 16
  })))))))));
}
function StatCard({
  label,
  value,
  detail,
  icon,
  percent = 75,
  alert
}) {
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - percent / 100 * circumference;
  return /*#__PURE__*/React.createElement("article", {
    className: "stat-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "stat-info"
  }, /*#__PURE__*/React.createElement("strong", null, value), /*#__PURE__*/React.createElement("span", null, label), /*#__PURE__*/React.createElement("small", {
    className: alert ? 'danger-text' : ''
  }, detail)), /*#__PURE__*/React.createElement("div", {
    className: "stat-donut-ring"
  }, /*#__PURE__*/React.createElement("svg", {
    className: "ring-svg",
    viewBox: "0 0 68 68"
  }, /*#__PURE__*/React.createElement("circle", {
    className: "ring-bg",
    cx: "34",
    cy: "34",
    r: radius
  }), /*#__PURE__*/React.createElement("circle", {
    className: "ring-meter",
    cx: "34",
    cy: "34",
    r: radius,
    strokeDasharray: circumference,
    strokeDashoffset: offset
  })), /*#__PURE__*/React.createElement("span", {
    className: "stat-donut-inner"
  }, /*#__PURE__*/React.createElement(SvgIcon, {
    name: icon,
    size: 20
  }))));
}
function AreaWaveChart() {
  const wavePath = 'M 0,112 C 45,98 65,60 110,68 C 155,76 180,28 230,42 C 275,54 310,18 360,30 C 410,42 450,12 500,20';
  const fillPath = `${wavePath} L 500,145 L 0,145 Z`;
  return /*#__PURE__*/React.createElement("div", {
    className: "chart-wrap"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 500 145",
    preserveAspectRatio: "none",
    role: "img",
    "aria-label": "Curva de ingresos de hoy"
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
    id: "lezatoAreaGrad",
    x1: "0",
    x2: "0",
    y1: "0",
    y2: "1"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: "currentColor",
    stopOpacity: "0.34"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: "currentColor",
    stopOpacity: "0.01"
  }))), /*#__PURE__*/React.createElement("line", {
    x1: "0",
    y1: "30",
    x2: "500",
    y2: "30",
    stroke: "var(--line)",
    strokeDasharray: "3 3",
    strokeWidth: "1"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "0",
    y1: "75",
    x2: "500",
    y2: "75",
    stroke: "var(--line)",
    strokeDasharray: "3 3",
    strokeWidth: "1"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "0",
    y1: "120",
    x2: "500",
    y2: "120",
    stroke: "var(--line)",
    strokeDasharray: "3 3",
    strokeWidth: "1"
  }), /*#__PURE__*/React.createElement("path", {
    d: fillPath,
    fill: "url(#lezatoAreaGrad)"
  }), /*#__PURE__*/React.createElement("path", {
    d: wavePath,
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "4",
    strokeLinecap: "round"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "230",
    cy: "42",
    r: "5",
    fill: "var(--surface)",
    stroke: "currentColor",
    strokeWidth: "3"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "360",
    cy: "30",
    r: "5",
    fill: "var(--surface)",
    stroke: "currentColor",
    strokeWidth: "3"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "500",
    cy: "20",
    r: "5",
    fill: "var(--surface)",
    stroke: "currentColor",
    strokeWidth: "3"
  })), /*#__PURE__*/React.createElement("div", {
    className: "axis"
  }, /*#__PURE__*/React.createElement("span", null, "08:00"), /*#__PURE__*/React.createElement("span", null, "09:00"), /*#__PURE__*/React.createElement("span", null, "10:00"), /*#__PURE__*/React.createElement("span", null, "11:00"), /*#__PURE__*/React.createElement("span", null, "12:00"), /*#__PURE__*/React.createElement("span", null, "13:00"), /*#__PURE__*/React.createElement("span", null, "14:00")));
}
function CustomerBars({
  period
}) {
  const datasets = {
    Year: [42, 64, 78, 52, 70, 88, 61, 67, 82, 54, 72, 92, 76, 63, 58, 84, 69, 48, 62, 86, 65, 79, 71],
    Monthly: [58, 72, 49, 83, 65, 91, 74, 55, 68, 80, 62, 77, 89, 52, 69, 75, 60, 84, 71, 66, 90, 59, 82],
    Week: [70, 85, 62, 94, 78, 88, 92, 64, 79, 86, 73, 90, 81, 68, 84, 77, 89, 72, 85, 93, 76, 88, 95]
  };
  const values = datasets[period] || datasets.Year;
  return /*#__PURE__*/React.createElement("div", {
    className: "customer-bars-container",
    "aria-label": "Gr\xE1fico de barras de clientes"
  }, /*#__PURE__*/React.createElement("div", {
    className: "y-axis-labels"
  }, /*#__PURE__*/React.createElement("span", null, "800"), /*#__PURE__*/React.createElement("span", null, "600"), /*#__PURE__*/React.createElement("span", null, "400"), /*#__PURE__*/React.createElement("span", null, "200"), /*#__PURE__*/React.createElement("span", null, "0")), /*#__PURE__*/React.createElement("div", {
    className: "chart-grid-lines"
  }, /*#__PURE__*/React.createElement("i", null), /*#__PURE__*/React.createElement("i", null), /*#__PURE__*/React.createElement("i", null), /*#__PURE__*/React.createElement("i", null), /*#__PURE__*/React.createElement("i", null)), /*#__PURE__*/React.createElement("div", {
    className: "bars"
  }, values.map((v, i) => /*#__PURE__*/React.createElement("div", {
    className: "bar-col",
    key: i,
    title: `Día ${String(i + 6).padStart(2, '0')}: ${v * 8} clientes`
  }, /*#__PURE__*/React.createElement("span", {
    className: i % 4 === 2 ? 'alt-bar' : '',
    style: {
      height: `${v}%`
    }
  })))), /*#__PURE__*/React.createElement("div", {
    className: "bars-axis"
  }, /*#__PURE__*/React.createElement("span", null, "06"), /*#__PURE__*/React.createElement("span", null, "08"), /*#__PURE__*/React.createElement("span", null, "10"), /*#__PURE__*/React.createElement("span", null, "12"), /*#__PURE__*/React.createElement("span", null, "14"), /*#__PURE__*/React.createElement("span", null, "16"), /*#__PURE__*/React.createElement("span", null, "18"), /*#__PURE__*/React.createElement("span", null, "20"), /*#__PURE__*/React.createElement("span", null, "22"), /*#__PURE__*/React.createElement("span", null, "24"), /*#__PURE__*/React.createElement("span", null, "26"), /*#__PURE__*/React.createElement("span", null, "28")));
}
function DeliveryMap({
  activeCount
}) {
  const nodes = [[12, 28], [29, 20], [48, 32], [68, 18], [86, 36], [78, 66], [56, 78], [34, 70], [16, 58], [44, 52]];
  const edges = [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 0], [9, 1], [9, 2], [9, 5], [9, 7]];
  return /*#__PURE__*/React.createElement("div", {
    className: "delivery-map",
    "aria-label": "Mapa de entregas en vivo"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 100 100",
    preserveAspectRatio: "none"
  }, edges.map(([a, b], i) => /*#__PURE__*/React.createElement("line", {
    key: i,
    x1: nodes[a][0],
    y1: nodes[a][1],
    x2: nodes[b][0],
    y2: nodes[b][1]
  })), nodes.map(([x, y], i) => /*#__PURE__*/React.createElement("circle", {
    key: i,
    cx: x,
    cy: y,
    r: "2.6"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "delivery-summary"
  }, /*#__PURE__*/React.createElement("strong", null, activeCount, " Orders"), /*#__PURE__*/React.createElement("span", null, timePE(), " \xB7 En ruta")));
}

/* ==========================================================================
   VISTA 2: SALÓN, MESAS Y CREADOR DE PEDIDOS POS
   ========================================================================== */

function TablesView({
  orders,
  setOrders,
  inventory,
  toast
}) {
  const [selected, setSelected] = useState(null);
  const [cart, setCart] = useState([]);
  const [catFilter, setCatFilter] = useState('Todas');
  const [clientName, setClientName] = useState('');
  const tables = Array.from({
    length: 8
  }, (_, i) => i + 1);
  const categories = ['Todas', ...new Set(inventory.map(p => p.categoria))];
  const tableOrder = n => orders.find(o => o.mesa === n && o.estado !== 'Entregado');
  const add = p => {
    setCart(c => {
      const found = c.find(x => x.id === p.id);
      return found ? c.map(x => x.id === p.id ? {
        ...x,
        qty: x.qty + 1
      } : x) : [...c, {
        ...p,
        qty: 1
      }];
    });
  };
  const adjustQty = (id, delta) => {
    setCart(c => c.map(x => x.id === id ? {
      ...x,
      qty: x.qty + delta
    } : x).filter(x => x.qty > 0));
  };
  const total = cart.reduce((s, p) => s + p.precio * p.qty, 0);
  const sendToKitchen = () => {
    if (!selected || !cart.length) return;
    const nextId = Math.max(...orders.map(o => o.id), 1000) + 1;
    const order = {
      id: nextId,
      mesa: selected,
      cliente: clientName.trim() || `Mesa ${String(selected).padStart(2, '0')}`,
      direccion: `Mesa ${String(selected).padStart(2, '0')} · Salón Principal`,
      total,
      estado: 'Pendiente',
      items: cart.map(p => `${p.qty} × ${p.nombre}`),
      hora: timePE()
    };
    setOrders([order, ...orders]);
    setCart([]);
    setClientName('');
    setSelected(null);
    toast(`Pedido #${nextId} enviado a Cocina para la Mesa ${String(selected).padStart(2, '0')}.`);
  };
  const filteredMenu = inventory.filter(p => p.stock > 0 && (catFilter === 'Todas' || p.categoria === catFilter));
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "section-tools"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", null, "Sal\xF3n y Mesas (POS)"), /*#__PURE__*/React.createElement("p", null, "Selecciona cualquier mesa para tomar comanda y enviarla a Cocina en tiempo real.")), /*#__PURE__*/React.createElement("span", {
    className: "legend"
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("i", {
    className: "free"
  }), "Libre"), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("i", {
    className: "busy"
  }), "Ocupada / En Atenci\xF3n"))), /*#__PURE__*/React.createElement("div", {
    className: "tables-grid"
  }, tables.map(n => {
    const o = tableOrder(n);
    return /*#__PURE__*/React.createElement("button", {
      type: "button",
      key: n,
      className: `table-card ${o ? 'busy' : ''}`,
      onClick: () => setSelected(n)
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("strong", null, "Mesa ", String(n).padStart(2, '0')), /*#__PURE__*/React.createElement("span", {
      className: `status ${o ? statusClass(o.estado) : 'paid'}`
    }, o ? o.estado : 'Libre')), /*#__PURE__*/React.createElement("p", null, o ? `Pedido #${o.id} · ${o.cliente}` : 'Disponible para asignar comensales'), /*#__PURE__*/React.createElement("footer", null, /*#__PURE__*/React.createElement("span", null, o ? 'Consumo actual' : 'Capacidad'), /*#__PURE__*/React.createElement("b", null, o ? money(o.total) : `${[2, 4, 4, 6, 2, 4, 6, 8][n - 1]} personas`)));
  })), selected && /*#__PURE__*/React.createElement("div", {
    className: "modal-layer",
    onMouseDown: () => setSelected(null)
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-card order-modal",
    onMouseDown: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-head"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("small", null, "COMANDA POS \xB7 SAL\xD3N PRINCIPAL"), /*#__PURE__*/React.createElement("h2", null, "Mesa ", String(selected).padStart(2, '0'))), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "modal-close-btn",
    onClick: () => setSelected(null)
  }, "\xD7")), /*#__PURE__*/React.createElement("div", {
    className: "order-builder"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '12px',
      flexWrap: 'wrap',
      gap: '8px'
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0
    }
  }, "Carta Disponible"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '6px',
      flexWrap: 'wrap'
    }
  }, categories.map(cat => /*#__PURE__*/React.createElement("button", {
    type: "button",
    key: cat,
    className: `pill-tab ${catFilter === cat ? 'active' : ''}`,
    onClick: () => setCatFilter(cat)
  }, cat)))), /*#__PURE__*/React.createElement("div", {
    className: "product-pick"
  }, filteredMenu.map(p => /*#__PURE__*/React.createElement("button", {
    type: "button",
    key: p.id,
    onClick: () => add(p)
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("strong", null, p.emoji || '🍽️', " ", p.nombre), /*#__PURE__*/React.createElement("small", null, p.categoria, " \xB7 Stock: ", p.stock)), /*#__PURE__*/React.createElement("b", null, money(p.precio)), /*#__PURE__*/React.createElement("i", null, "+"))))), /*#__PURE__*/React.createElement("div", {
    className: "cart-panel"
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      marginTop: 0
    }
  }, "Detalle de Comanda"), /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'grid',
      gap: '4px',
      fontSize: '12px',
      fontWeight: 600,
      marginBottom: '12px'
    }
  }, "Cliente / Referencia (opcional)", /*#__PURE__*/React.createElement("input", {
    value: clientName,
    onChange: e => setClientName(e.target.value),
    placeholder: `Mesa ${String(selected).padStart(2, '0')}`
  })), !cart.length ? /*#__PURE__*/React.createElement("div", {
    className: "empty-state"
  }, "Selecciona platos de la carta para armar el pedido.") : cart.map(p => /*#__PURE__*/React.createElement("div", {
    className: "cart-row",
    key: p.id
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("strong", null, p.nombre), /*#__PURE__*/React.createElement("small", null, money(p.precio), " c/u")), /*#__PURE__*/React.createElement("div", {
    className: "qty-controls"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => adjustQty(p.id, -1)
  }, "\u2212"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '12px',
      fontWeight: 700,
      padding: '0 4px'
    }
  }, p.qty), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => adjustQty(p.id, 1)
  }, "+")), /*#__PURE__*/React.createElement("b", null, money(p.qty * p.precio)), /*#__PURE__*/React.createElement("button", {
    type: "button",
    style: {
      border: 0,
      background: 'transparent',
      color: 'var(--danger)',
      fontSize: '18px'
    },
    onClick: () => setCart(cart.filter(x => x.id !== p.id))
  }, "\xD7"))), /*#__PURE__*/React.createElement("div", {
    className: "cart-total"
  }, /*#__PURE__*/React.createElement("span", null, "Total a comandar"), /*#__PURE__*/React.createElement("strong", null, money(total))), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "primary",
    style: {
      width: '100%'
    },
    disabled: !cart.length,
    onClick: sendToKitchen
  }, "Enviar Pedido a Cocina"))))));
}

/* ==========================================================================
   VISTA 3: COCINA (KDS KANBAN)
   ========================================================================== */

function Kitchen({
  orders,
  setOrders,
  toast
}) {
  const states = ['Pendiente', 'En preparación', 'Listo'];
  const advance = id => {
    setOrders(orders.map(o => {
      if (o.id !== id) return o;
      const next = o.estado === 'Pendiente' ? 'En preparación' : o.estado === 'En preparación' ? 'Listo' : 'Entregado';
      return {
        ...o,
        estado: next
      };
    }));
    toast('Estado del pedido actualizado en Cocina.');
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "kanban"
  }, states.map(st => {
    const colOrders = orders.filter(o => o.estado === st);
    return /*#__PURE__*/React.createElement("section", {
      key: st,
      className: "kanban-col"
    }, /*#__PURE__*/React.createElement("header", null, /*#__PURE__*/React.createElement("h2", null, st), /*#__PURE__*/React.createElement("span", null, colOrders.length)), colOrders.map(o => /*#__PURE__*/React.createElement("article", {
      className: "kitchen-ticket",
      key: o.id
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("strong", null, "Mesa ", String(o.mesa).padStart(2, '0'), " \xB7 ", o.cliente), /*#__PURE__*/React.createElement("small", null, o.hora)), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: '4px 0',
        fontSize: '12px',
        color: 'var(--primary)',
        fontWeight: 600
      }
    }, "Pedido #", o.id, " (", money(o.total), ")"), /*#__PURE__*/React.createElement("ul", null, o.items.map((x, i) => /*#__PURE__*/React.createElement("li", {
      key: i
    }, x))), /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: "primary",
      onClick: () => advance(o.id)
    }, st === 'Pendiente' ? 'Comenzar Preparación' : st === 'En preparación' ? 'Marcar Listo para Servir' : 'Entregar a Mesa / Caja'))), !colOrders.length && /*#__PURE__*/React.createElement("div", {
      className: "empty-state"
    }, "Sin comandas en estado \u201C", st, "\u201D."));
  }));
}

/* ==========================================================================
   VISTA 4: CAJA Y COBROS ACUMULADOS
   ========================================================================== */

function Cashier({
  orders,
  setOrders,
  payments,
  setPayments,
  toast,
  go
}) {
  const billable = orders.filter(o => o.estado === 'Entregado' || o.estado === 'Listo');
  const [methods, setMethods] = useState({});
  const registerPayment = order => {
    const now = new Date();
    const payment = {
      id: uid(),
      pedidoId: order.id,
      mesa: order.mesa,
      cliente: order.cliente,
      total: order.total,
      metodo: methods[order.id] || 'Yape',
      dia: dayKey(now),
      hora: timePE(now),
      creadoEn: now.toISOString()
    };

    // Se guarda en el historial persistente de cobros antes de liberar la mesa
    setPayments([payment, ...(payments || [])]);
    setOrders(orders.filter(x => x.id !== order.id));
    toast(`Cobro de ${money(order.total)} (${payment.metodo}) registrado y acumulado en Resumen del Día.`);
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "section-tools"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", null, "Terminal de Caja y Liquidaci\xF3n"), /*#__PURE__*/React.createElement("p", null, "Cada cobro registrado libera la mesa autom\xE1ticamente y se suma al historial acumulado del d\xEDa.")), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "secondary",
    onClick: () => go('resumen')
  }, "Ver Resumen del D\xEDa \u2192")), /*#__PURE__*/React.createElement("div", {
    className: "cards-grid"
  }, billable.map(o => /*#__PURE__*/React.createElement("article", {
    className: "cash-card",
    key: o.id
  }, /*#__PURE__*/React.createElement("div", {
    className: "cash-head"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("small", {
    style: {
      color: 'var(--muted)',
      fontWeight: 700
    }
  }, "CUENTA LISTA"), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: '4px 0 12px'
    }
  }, "Mesa ", String(o.mesa).padStart(2, '0'))), /*#__PURE__*/React.createElement("span", {
    className: `status ${statusClass(o.estado)}`
  }, "Pedido #", o.id)), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: '10px'
    }
  }, o.items.map((x, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      padding: '7px 0',
      borderBottom: '1px solid var(--line-soft)',
      fontSize: '12.5px'
    }
  }, x))), /*#__PURE__*/React.createElement("div", {
    className: "cash-total"
  }, /*#__PURE__*/React.createElement("span", null, "Total a cobrar"), /*#__PURE__*/React.createElement("strong", null, money(o.total))), /*#__PURE__*/React.createElement("select", {
    value: methods[o.id] || 'Yape',
    onChange: e => setMethods({
      ...methods,
      [o.id]: e.target.value
    })
  }, /*#__PURE__*/React.createElement("option", {
    value: "Yape"
  }, "Yape"), /*#__PURE__*/React.createElement("option", {
    value: "Plin"
  }, "Plin"), /*#__PURE__*/React.createElement("option", {
    value: "Efectivo"
  }, "Efectivo"), /*#__PURE__*/React.createElement("option", {
    value: "Tarjeta"
  }, "Tarjeta Visa / Mastercard")), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "primary",
    onClick: () => registerPayment(o)
  }, "Registrar Cobro y Liberar Mesa"))), !billable.length && /*#__PURE__*/React.createElement("div", {
    className: "panel empty-state wide"
  }, "No hay cuentas pendientes de cobro en este momento. Avanza un pedido a \u201CListo\u201D o \u201CEntregado\u201D desde Cocina.")));
}

/* ==========================================================================
   VISTA 5: RESUMEN DEL DÍA + MODAL DE REINICIO DIARIO ("REINICIAR DÍA")
   ========================================================================== */

function Summary({
  orders,
  inventory,
  payments = [],
  setPayments,
  toast
}) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const today = dayKey();
  const todayPayments = payments.filter(p => p.dia === today);
  const totalToday = todayPayments.reduce((s, p) => s + p.total, 0);
  const currentOrdersTotal = orders.reduce((s, o) => s + o.total, 0);
  const confirmResetDay = () => {
    // Elimina únicamente los cobros del día actual; pedidos activos e inventario permanecen intactos
    setPayments(payments.filter(p => p.dia !== today));
    setConfirmOpen(false);
    toast('Resumen diario reiniciado. El acumulado de hoy volvió a S/ 0.00.');
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("section", {
    className: "stats-grid"
  }, /*#__PURE__*/React.createElement(StatCard, {
    label: "Cobrado Hoy",
    value: money(totalToday),
    detail: "Suma acumulada en Caja hoy",
    icon: "dollar",
    percent: 88
  }), /*#__PURE__*/React.createElement(StatCard, {
    label: "Cobros del D\xEDa",
    value: todayPayments.length,
    detail: "Transacciones liquidadas",
    icon: "orders",
    percent: 72
  }), /*#__PURE__*/React.createElement(StatCard, {
    label: "Pedidos Activos",
    value: orders.length,
    detail: `${money(currentOrdersTotal)} en atención`,
    icon: "cup",
    percent: 64
  }), /*#__PURE__*/React.createElement(StatCard, {
    label: "Unidades en Stock",
    value: inventory.reduce((s, p) => s + p.stock, 0),
    detail: "Disponibles en almac\xE9n",
    icon: "inventory",
    percent: 79
  })), /*#__PURE__*/React.createElement("div", {
    className: "panel"
  }, /*#__PURE__*/React.createElement("div", {
    className: "summary-toolbar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "panel-title",
    style: {
      marginBottom: 0
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", null, "Cobros Acumulados de Hoy (", today, ")"), /*#__PURE__*/React.createElement("p", null, "Cada pago registrado en Caja se conserva aqu\xED aunque la mesa sea liberada."))), /*#__PURE__*/React.createElement("div", {
    className: "summary-actions"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "danger",
    onClick: () => setConfirmOpen(true),
    disabled: !todayPayments.length,
    title: "Borrar el acumulado del d\xEDa actual y empezar desde S/ 0.00"
  }, /*#__PURE__*/React.createElement(SvgIcon, {
    name: "trash",
    size: 16
  }), "Reiniciar d\xEDa"))), todayPayments.length ? /*#__PURE__*/React.createElement("div", {
    className: "table-scroll"
  }, /*#__PURE__*/React.createElement("table", {
    className: "data-table"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Pedido"), /*#__PURE__*/React.createElement("th", null, "Mesa / Cliente"), /*#__PURE__*/React.createElement("th", null, "Hora"), /*#__PURE__*/React.createElement("th", null, "M\xE9todo de Pago"), /*#__PURE__*/React.createElement("th", null, "Total Cobrado"))), /*#__PURE__*/React.createElement("tbody", null, todayPayments.map(p => /*#__PURE__*/React.createElement("tr", {
    key: p.id
  }, /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("strong", null, "#", p.pedidoId)), /*#__PURE__*/React.createElement("td", null, "Mesa ", String(p.mesa).padStart(2, '0'), " ", p.cliente ? `· ${p.cliente}` : ''), /*#__PURE__*/React.createElement("td", null, p.hora), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("span", {
    className: "status ready"
  }, p.metodo)), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("strong", null, money(p.total)))))))) : /*#__PURE__*/React.createElement("div", {
    className: "empty-state"
  }, "El resumen del d\xEDa est\xE1 en ", /*#__PURE__*/React.createElement("strong", null, "S/ 0.00"), ". Registra un cobro en Caja para comenzar a acumular ventas.")), confirmOpen && /*#__PURE__*/React.createElement("div", {
    className: "modal-layer",
    onMouseDown: () => setConfirmOpen(false)
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-card confirm-dialog",
    onMouseDown: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: '0 0 8px',
      fontSize: '18px'
    }
  }, "\xBFIniciar un nuevo d\xEDa operativo?"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '0 0 20px',
      color: 'var(--muted)',
      fontSize: '13px',
      lineHeight: 1.55
    }
  }, "Se borrar\xE1n del resumen los ", /*#__PURE__*/React.createElement("strong", null, todayPayments.length, " cobros acumulados de hoy (", money(totalToday), ")"), " y el contador diario volver\xE1 a ", /*#__PURE__*/React.createElement("strong", null, "S/ 0.00"), ". Los pedidos activos y el inventario no se modificar\xE1n."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: '10px'
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "secondary",
    onClick: () => setConfirmOpen(false)
  }, "Cancelar"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "danger",
    onClick: confirmResetDay
  }, "S\xED, reiniciar a S/ 0.00")))));
}

/* ==========================================================================
   VISTAS 6 Y 7: ORDERS (PEDIDOS) & ORDER DETAILS (DETALLE DEL PEDIDO)
   ========================================================================== */

function Orders({
  orders,
  setOrders,
  setSelectedOrderId,
  go,
  toast
}) {
  const [filter, setFilter] = useState('Todos');
  const visible = filter === 'Todos' ? orders : orders.filter(o => o.estado === filter);
  const remove = id => {
    setOrders(orders.filter(o => o.id !== id));
    toast(`Pedido #${id} eliminado.`);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "panel"
  }, /*#__PURE__*/React.createElement("div", {
    className: "list-toolbar"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", null, "Order List \xB7 Gesti\xF3n de Pedidos"), /*#__PURE__*/React.createElement("p", null, "Haz clic en cualquier pedido para abrir su seguimiento detallado (Order Details).")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '8px',
      flexWrap: 'wrap'
    }
  }, ['Todos', 'Pendiente', 'En preparación', 'Listo', 'Entregado'].map(st => /*#__PURE__*/React.createElement("button", {
    type: "button",
    key: st,
    className: `pill-tab ${filter === st ? 'active' : ''}`,
    onClick: () => setFilter(st)
  }, st)))), /*#__PURE__*/React.createElement("div", {
    className: "table-scroll"
  }, /*#__PURE__*/React.createElement("table", {
    className: "data-table"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Order ID"), /*#__PURE__*/React.createElement("th", null, "Cliente"), /*#__PURE__*/React.createElement("th", null, "Mesa / Destino"), /*#__PURE__*/React.createElement("th", null, "Hora"), /*#__PURE__*/React.createElement("th", null, "Estado"), /*#__PURE__*/React.createElement("th", null, "Total"), /*#__PURE__*/React.createElement("th", null, "Acciones"))), /*#__PURE__*/React.createElement("tbody", null, visible.map(o => /*#__PURE__*/React.createElement("tr", {
    key: o.id
  }, /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("button", {
    type: "button",
    style: {
      border: 0,
      background: 'transparent',
      color: 'var(--primary)',
      fontWeight: 700,
      padding: 0
    },
    onClick: () => {
      setSelectedOrderId(o.id);
      go('detalle-pedido');
    }
  }, "#", o.id)), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("strong", null, o.cliente)), /*#__PURE__*/React.createElement("td", null, "Mesa ", String(o.mesa).padStart(2, '0')), /*#__PURE__*/React.createElement("td", null, o.hora), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("span", {
    className: `status ${statusClass(o.estado)}`
  }, o.estado)), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("strong", null, money(o.total))), /*#__PURE__*/React.createElement("td", {
    className: "actions"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => {
      setSelectedOrderId(o.id);
      go('detalle-pedido');
    },
    title: "Ver detalle"
  }, /*#__PURE__*/React.createElement(SvgIcon, {
    name: "search",
    size: 15
  })), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "danger-icon",
    onClick: () => remove(o.id),
    title: "Eliminar"
  }, /*#__PURE__*/React.createElement(SvgIcon, {
    name: "trash",
    size: 15
  })))))))));
}
const statusClass = st => st === 'Pendiente' ? 'pending' : st === 'En preparación' ? 'progress' : st === 'Listo' ? 'ready' : 'paid';
function OrderDetail({
  orders,
  selectedOrderId,
  setSelectedOrderId
}) {
  const o = orders.find(x => x.id === selectedOrderId) || orders[0];
  if (!o) return /*#__PURE__*/React.createElement("div", {
    className: "panel empty-state"
  }, "No hay pedidos activos para mostrar.");
  const stepIndex = o.estado === 'Pendiente' ? 1 : o.estado === 'En preparación' ? 2 : o.estado === 'Listo' ? 3 : 4;
  const steps = ['Pedido recibido', 'Confirmado por cocina', 'En preparación culinaria', 'Listo para servir / despacho', 'Entregado al cliente'];
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '8px',
      marginBottom: '16px',
      flexWrap: 'wrap'
    }
  }, orders.map(ord => /*#__PURE__*/React.createElement("button", {
    type: "button",
    key: ord.id,
    className: `pill-tab ${ord.id === o.id ? 'active' : ''}`,
    onClick: () => setSelectedOrderId(ord.id)
  }, "Pedido #", ord.id, " \xB7 Mesa ", ord.mesa))), /*#__PURE__*/React.createElement("div", {
    className: "detail-layout"
  }, /*#__PURE__*/React.createElement("article", {
    className: "panel"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      borderBottom: '1px solid var(--line)',
      paddingBottom: '16px',
      marginBottom: '16px'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("small", {
    style: {
      color: 'var(--primary)',
      fontWeight: 700
    }
  }, "ORDER DETAILS \xB7 #", o.id), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: '4px 0'
    }
  }, o.cliente, " \u2014 Mesa ", String(o.mesa).padStart(2, '0')), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      color: 'var(--muted)',
      fontSize: '12.5px'
    }
  }, o.direccion || 'Salón Principal', " \xB7 Creado a las ", o.hora)), /*#__PURE__*/React.createElement("span", {
    className: `status ${statusClass(o.estado)}`
  }, o.estado)), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: '14px',
      marginBottom: '10px'
    }
  }, "\xCDtems de la Comanda"), o.items.map((x, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '11px 0',
      borderBottom: '1px solid var(--line-soft)',
      fontSize: '13px'
    }
  }, /*#__PURE__*/React.createElement("strong", null, x), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--success)',
      fontWeight: 600
    }
  }, "Confirmado"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: '18px',
      paddingTop: '14px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '14px',
      fontWeight: 600
    }
  }, "Total de la Orden"), /*#__PURE__*/React.createElement("strong", {
    style: {
      fontSize: '24px',
      color: 'var(--primary)'
    }
  }, money(o.total)))), /*#__PURE__*/React.createElement("aside", {
    className: "panel"
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      marginTop: 0,
      fontSize: '17px'
    }
  }, "Order Tracking \xB7 Seguimiento"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: '12px',
      marginTop: '14px'
    }
  }, steps.map((label, i) => {
    const done = i <= stepIndex;
    return /*#__PURE__*/React.createElement("div", {
      key: label,
      style: {
        display: 'flex',
        gap: '12px',
        alignItems: 'center'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: '32px',
        height: '32px',
        borderRadius: '50%',
        display: 'grid',
        placeItems: 'center',
        background: done ? 'var(--primary)' : 'var(--surface-3)',
        color: done ? '#fff' : 'var(--muted)',
        fontWeight: 700,
        fontSize: '12px'
      }
    }, done ? '✓' : i + 1), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("strong", {
      style: {
        display: 'block',
        fontSize: '13px'
      }
    }, label), /*#__PURE__*/React.createElement("small", {
      style: {
        color: 'var(--muted)',
        fontSize: '11px'
      }
    }, done ? 'Completado' : 'En espera')));
  })))));
}

/* ==========================================================================
   VISTAS 8, 9, 10, 11: CLIENTES, ANALÍTICA, RESEÑAS Y TAREAS (TASK)
   ========================================================================== */

function Customers({
  customers = [],
  setCustomers,
  toast
}) {
  const [nombre, setNombre] = useState('');
  const [tipo, setTipo] = useState('MEMBER');
  const [ubicacion, setUbicacion] = useState('');
  const addCustomer = e => {
    e.preventDefault();
    if (!nombre.trim()) return;
    setCustomers([{
      id: uid(),
      nombre: nombre.trim(),
      pedidos: 1,
      gasto: 45,
      tipo,
      ubicacion: ubicacion.trim() || 'Trujillo, Perú'
    }, ...customers]);
    setNombre('');
    setUbicacion('');
    toast('Nuevo cliente registrado en la base de fidelización.');
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "inventory-layout"
  }, /*#__PURE__*/React.createElement("div", {
    className: "panel"
  }, /*#__PURE__*/React.createElement("div", {
    className: "panel-title"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", null, "Directorio de Clientes"), /*#__PURE__*/React.createElement("p", null, customers.length, " clientes registrados en el programa Lezato"))), /*#__PURE__*/React.createElement("div", {
    className: "customer-grid",
    style: {
      gridTemplateColumns: 'repeat(2, minmax(0, 1fr))'
    }
  }, customers.map(c => /*#__PURE__*/React.createElement("article", {
    className: "customer-card",
    key: c.id
  }, /*#__PURE__*/React.createElement("span", {
    className: "avatar big"
  }, c.nombre.split(' ').map(x => x[0]).join('').slice(0, 2)), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: '8px 0 4px',
      fontSize: '15px'
    }
  }, c.nombre), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '0 0 8px',
      fontSize: '11.5px',
      color: 'var(--muted)'
    }
  }, c.ubicacion), /*#__PURE__*/React.createElement("span", {
    className: `member-badge ${c.tipo === 'MEMBER' ? 'vip' : 'regular'}`
  }, c.tipo), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-around',
      borderTop: '1px solid var(--line)',
      paddingTop: '12px',
      marginTop: '14px'
    }
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("small", {
    style: {
      display: 'block',
      color: 'var(--muted)',
      fontSize: '10px'
    }
  }, "Pedidos"), /*#__PURE__*/React.createElement("strong", null, c.pedidos)), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("small", {
    style: {
      display: 'block',
      color: 'var(--muted)',
      fontSize: '10px'
    }
  }, "Gasto Total"), /*#__PURE__*/React.createElement("strong", null, money(c.gasto)))))))), /*#__PURE__*/React.createElement("aside", {
    className: "panel inventory-form"
  }, /*#__PURE__*/React.createElement("h2", null, "Registrar Cliente"), /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--muted)',
      fontSize: '12px'
    }
  }, "Agrega comensales al programa VIP o Regular."), /*#__PURE__*/React.createElement("form", {
    onSubmit: addCustomer
  }, /*#__PURE__*/React.createElement("label", null, "Nombre completo", /*#__PURE__*/React.createElement("input", {
    value: nombre,
    onChange: e => setNombre(e.target.value),
    placeholder: "Ej. Valeria Mendoza"
  })), /*#__PURE__*/React.createElement("label", null, "Categor\xEDa Lezato", /*#__PURE__*/React.createElement("select", {
    value: tipo,
    onChange: e => setTipo(e.target.value)
  }, /*#__PURE__*/React.createElement("option", {
    value: "MEMBER"
  }, "MEMBER (VIP)"), /*#__PURE__*/React.createElement("option", {
    value: "Regular Customer"
  }, "Regular Customer"))), /*#__PURE__*/React.createElement("label", null, "Direcci\xF3n / Zona", /*#__PURE__*/React.createElement("input", {
    value: ubicacion,
    onChange: e => setUbicacion(e.target.value),
    placeholder: "Ej. Av. Larco 850, Trujillo"
  })), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "primary"
  }, "Agregar Cliente"))));
}
function Analytics() {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("section", {
    className: "stats-grid"
  }, /*#__PURE__*/React.createElement(StatCard, {
    label: "Conversi\xF3n de Carta",
    value: "68.4%",
    detail: "+4.2 pts este mes",
    icon: "charts",
    percent: 68
  }), /*#__PURE__*/React.createElement(StatCard, {
    label: "Ticket Promedio",
    value: "S/ 38.50",
    detail: "+S/ 3.10 vs semana ant.",
    icon: "dollar",
    percent: 76
  }), /*#__PURE__*/React.createElement(StatCard, {
    label: "Tiempo en Cocina",
    value: "16 min",
    detail: "-2 min optimizado",
    icon: "cup",
    percent: 84
  }), /*#__PURE__*/React.createElement(StatCard, {
    label: "Satisfacci\xF3n CSAT",
    value: "4.8 / 5",
    detail: "164 rese\xF1as verificadas",
    icon: "users",
    percent: 94
  })), /*#__PURE__*/React.createElement("div", {
    className: "analytics-grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "panel"
  }, /*#__PURE__*/React.createElement("div", {
    className: "panel-title"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", null, "Ventas Semanales por D\xEDa"), /*#__PURE__*/React.createElement("p", null, "Comparativa de ingresos \xFAltimos 7 d\xEDas"))), /*#__PURE__*/React.createElement(BarChart, null)), /*#__PURE__*/React.createElement("div", {
    className: "panel"
  }, /*#__PURE__*/React.createElement("div", {
    className: "panel-title"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", null, "Distribuci\xF3n por Canal"), /*#__PURE__*/React.createElement("p", null, "Sal\xF3n vs Delivery vs Recojo"))), /*#__PURE__*/React.createElement(Donut, null))));
}
function Reviews({
  toast
}) {
  const [reviews, setReviews] = useState([{
    id: 1,
    autor: 'Lucía Paredes',
    comentario: 'Excelente sazón en el lomo saltado y atención muy rápida.',
    rating: 5,
    fecha: 'Hace 25 min'
  }, {
    id: 2,
    autor: 'Jorge Miranda',
    comentario: 'El ceviche llegó fresco y bien presentado en delivery.',
    rating: 5,
    fecha: 'Hace 1 hora'
  }, {
    id: 3,
    autor: 'Rosa Castañeda',
    comentario: 'Ambiente cómodo y el pago con Yape en caja fue inmediato.',
    rating: 4,
    fecha: 'Hoy'
  }]);
  const [autor, setAutor] = useState('');
  const [comentario, setComentario] = useState('');
  const addReview = e => {
    e.preventDefault();
    if (!autor.trim() || !comentario.trim()) return;
    setReviews([{
      id: uid(),
      autor: autor.trim(),
      comentario: comentario.trim(),
      rating: 5,
      fecha: 'Ahora'
    }, ...reviews]);
    setAutor('');
    setComentario('');
    toast('Reseña publicada correctamente.');
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "inventory-layout"
  }, /*#__PURE__*/React.createElement("div", {
    className: "panel"
  }, /*#__PURE__*/React.createElement("div", {
    className: "panel-title"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", null, "Customer Reviews \xB7 Rese\xF1as"), /*#__PURE__*/React.createElement("p", null, "Valoraciones reales de nuestros comensales"))), reviews.map(r => /*#__PURE__*/React.createElement("article", {
    key: r.id,
    style: {
      display: 'grid',
      gridTemplateColumns: '44px 1fr auto',
      gap: '12px',
      padding: '14px 0',
      borderBottom: '1px solid var(--line-soft)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "avatar"
  }, r.autor[0]), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("strong", null, r.autor), /*#__PURE__*/React.createElement("div", {
    style: {
      color: '#F59E0B',
      fontSize: '13px'
    }
  }, '★★★★★'.slice(0, r.rating)), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '4px 0 0',
      color: 'var(--muted)',
      fontSize: '12.5px'
    }
  }, r.comentario)), /*#__PURE__*/React.createElement("small", {
    style: {
      color: 'var(--muted)'
    }
  }, r.fecha)))), /*#__PURE__*/React.createElement("aside", {
    className: "panel inventory-form"
  }, /*#__PURE__*/React.createElement("h2", null, "Registrar Opini\xF3n"), /*#__PURE__*/React.createElement("form", {
    onSubmit: addReview
  }, /*#__PURE__*/React.createElement("label", null, "Cliente", /*#__PURE__*/React.createElement("input", {
    value: autor,
    onChange: e => setAutor(e.target.value),
    placeholder: "Nombre del comensal"
  })), /*#__PURE__*/React.createElement("label", null, "Comentario", /*#__PURE__*/React.createElement("textarea", {
    rows: "4",
    value: comentario,
    onChange: e => setComentario(e.target.value),
    placeholder: "Escribe la rese\xF1a..."
  })), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "primary"
  }, "Publicar Rese\xF1a"))));
}
function TasksView({
  tasks = [],
  setTasks,
  toast
}) {
  const [texto, setTexto] = useState('');
  const toggle = id => {
    setTasks(tasks.map(t => t.id === id ? {
      ...t,
      completada: !t.completada
    } : t));
  };
  const add = e => {
    e.preventDefault();
    if (!texto.trim()) return;
    setTasks([{
      id: uid(),
      texto: texto.trim(),
      completada: false,
      area: 'Operaciones'
    }, ...tasks]);
    setTexto('');
    toast('Tarea operativa agregada.');
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "inventory-layout"
  }, /*#__PURE__*/React.createElement("div", {
    className: "panel"
  }, /*#__PURE__*/React.createElement("div", {
    className: "panel-title"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", null, "Task \xB7 Checklist Operativo del Turno"), /*#__PURE__*/React.createElement("p", null, "Control de apertura, cocina y cierre de caja"))), tasks.map(t => /*#__PURE__*/React.createElement("div", {
    key: t.id,
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '12px 0',
      borderBottom: '1px solid var(--line-soft)'
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      cursor: 'pointer',
      fontWeight: 500
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    checked: t.completada,
    onChange: () => toggle(t.id),
    style: {
      minHeight: 'unset',
      width: '18px',
      height: '18px'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      textDecoration: t.completada ? 'line-through' : 'none',
      color: t.completada ? 'var(--muted)' : 'var(--text-strong)'
    }
  }, t.texto)), /*#__PURE__*/React.createElement("span", {
    className: "status ready"
  }, t.area)))), /*#__PURE__*/React.createElement("aside", {
    className: "panel inventory-form"
  }, /*#__PURE__*/React.createElement("h2", null, "Nueva Tarea"), /*#__PURE__*/React.createElement("form", {
    onSubmit: add
  }, /*#__PURE__*/React.createElement("label", null, "Descripci\xF3n de la tarea", /*#__PURE__*/React.createElement("input", {
    value: texto,
    onChange: e => setTexto(e.target.value),
    placeholder: "Ej. Revisar temperatura de c\xE1maras"
  })), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "primary"
  }, "A\xF1adir Tarea"))));
}

/* ==========================================================================
   VISTAS 12, 13, 14: INVENTARIO (PRODUCTOS, CATEGORÍAS, MOVIMIENTOS)
   ========================================================================== */

function Inventory({
  inventory,
  setInventory,
  toast
}) {
  const blank = {
    nombre: '',
    categoria: 'Platos',
    stock: 15,
    minimo: 5,
    precio: 20,
    emoji: '🍽️'
  };
  const [form, setForm] = useState(blank);
  const [editing, setEditing] = useState(null);
  const [query, setQuery] = useState('');
  const save = e => {
    e.preventDefault();
    if (!form.nombre.trim()) return;
    if (editing) {
      setInventory(inventory.map(p => p.id === editing ? {
        ...form,
        id: editing
      } : p));
      toast('Producto actualizado en la carta.');
    } else {
      setInventory([...inventory, {
        ...form,
        id: uid(),
        vendidos: 12
      }]);
      toast('Nuevo producto incorporado al inventario.');
    }
    setForm(blank);
    setEditing(null);
  };
  const edit = p => {
    setEditing(p.id);
    setForm({
      ...p
    });
  };
  const remove = id => {
    setInventory(inventory.filter(p => p.id !== id));
    toast('Producto eliminado del inventario.');
  };
  const list = inventory.filter(p => p.nombre.toLowerCase().includes(query.toLowerCase()));
  return /*#__PURE__*/React.createElement("div", {
    className: "inventory-layout"
  }, /*#__PURE__*/React.createElement("section", {
    className: "panel"
  }, /*#__PURE__*/React.createElement("div", {
    className: "list-toolbar"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", null, "Inventario de Productos y Carta"), /*#__PURE__*/React.createElement("p", null, inventory.length, " \xEDtems activos sincronizados con Sal\xF3n y Dashboard.")), /*#__PURE__*/React.createElement("input", {
    value: query,
    onChange: e => setQuery(e.target.value),
    placeholder: "Buscar plato o bebida...",
    style: {
      maxWidth: '240px'
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "table-scroll"
  }, /*#__PURE__*/React.createElement("table", {
    className: "data-table"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Producto"), /*#__PURE__*/React.createElement("th", null, "Categor\xEDa"), /*#__PURE__*/React.createElement("th", null, "Stock"), /*#__PURE__*/React.createElement("th", null, "M\xEDnimo"), /*#__PURE__*/React.createElement("th", null, "Precio"), /*#__PURE__*/React.createElement("th", null, "Acciones"))), /*#__PURE__*/React.createElement("tbody", null, list.map(p => /*#__PURE__*/React.createElement("tr", {
    key: p.id
  }, /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("strong", null, p.emoji || '🍽️', " ", p.nombre)), /*#__PURE__*/React.createElement("td", null, p.categoria), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("span", {
    className: `stock-badge ${p.stock <= p.minimo ? 'low' : ''}`
  }, p.stock)), /*#__PURE__*/React.createElement("td", null, p.minimo), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("strong", null, money(p.precio))), /*#__PURE__*/React.createElement("td", {
    className: "actions"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => edit(p),
    title: "Editar"
  }, /*#__PURE__*/React.createElement(SvgIcon, {
    name: "edit",
    size: 15
  })), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "danger-icon",
    onClick: () => remove(p.id),
    title: "Eliminar"
  }, /*#__PURE__*/React.createElement(SvgIcon, {
    name: "trash",
    size: 15
  }))))))))), /*#__PURE__*/React.createElement("aside", {
    className: "panel inventory-form"
  }, /*#__PURE__*/React.createElement("h2", null, editing ? 'Editar Producto' : 'Nuevo Producto'), /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--muted)',
      fontSize: '12px'
    }
  }, "Los cambios se guardan autom\xE1ticamente en el navegador."), /*#__PURE__*/React.createElement("form", {
    onSubmit: save
  }, /*#__PURE__*/React.createElement("label", null, "Nombre del plato / producto", /*#__PURE__*/React.createElement("input", {
    value: form.nombre,
    onChange: e => setForm({
      ...form,
      nombre: e.target.value
    }),
    placeholder: "Ej. Chaufa de mariscos"
  })), /*#__PURE__*/React.createElement("div", {
    className: "form-grid"
  }, /*#__PURE__*/React.createElement("label", null, "Categor\xEDa", /*#__PURE__*/React.createElement("select", {
    value: form.categoria,
    onChange: e => setForm({
      ...form,
      categoria: e.target.value
    })
  }, /*#__PURE__*/React.createElement("option", null, "Platos"), /*#__PURE__*/React.createElement("option", null, "Entradas"), /*#__PURE__*/React.createElement("option", null, "Bebidas"), /*#__PURE__*/React.createElement("option", null, "Postres"), /*#__PURE__*/React.createElement("option", null, "Insumos"))), /*#__PURE__*/React.createElement("label", null, "Icono / Emoji", /*#__PURE__*/React.createElement("input", {
    value: form.emoji || '🍽️',
    onChange: e => setForm({
      ...form,
      emoji: e.target.value
    })
  }))), /*#__PURE__*/React.createElement("div", {
    className: "form-grid"
  }, /*#__PURE__*/React.createElement("label", null, "Stock Actual", /*#__PURE__*/React.createElement("input", {
    type: "number",
    min: "0",
    value: form.stock,
    onChange: e => setForm({
      ...form,
      stock: +e.target.value
    })
  })), /*#__PURE__*/React.createElement("label", null, "Stock M\xEDnimo", /*#__PURE__*/React.createElement("input", {
    type: "number",
    min: "0",
    value: form.minimo,
    onChange: e => setForm({
      ...form,
      minimo: +e.target.value
    })
  }))), /*#__PURE__*/React.createElement("label", null, "Precio de Venta (S/)", /*#__PURE__*/React.createElement("input", {
    type: "number",
    min: "0",
    step: "0.1",
    value: form.precio,
    onChange: e => setForm({
      ...form,
      precio: +e.target.value
    })
  })), /*#__PURE__*/React.createElement("button", {
    className: "primary",
    type: "submit"
  }, editing ? 'Guardar Cambios' : 'Agregar a la Carta'), editing && /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "secondary",
    onClick: () => {
      setEditing(null);
      setForm(blank);
    }
  }, "Cancelar"))));
}
function Categories({
  inventory,
  setInventory,
  toast
}) {
  const categories = [...new Set(inventory.map(x => x.categoria))];
  const [name, setName] = useState('');
  const add = e => {
    e.preventDefault();
    if (!name.trim()) return;
    setInventory([...inventory, {
      id: uid(),
      nombre: `Especialidad (${name.trim()})`,
      categoria: name.trim(),
      stock: 10,
      minimo: 5,
      precio: 18,
      emoji: '✨'
    }]);
    setName('');
    toast('Categoría creada con un producto base editable.');
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "split-grid"
  }, /*#__PURE__*/React.createElement("section", {
    className: "panel"
  }, /*#__PURE__*/React.createElement("div", {
    className: "panel-title"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", null, "Categor\xEDas de Carta e Inventario"), /*#__PURE__*/React.createElement("p", null, "Organizaci\xF3n activa por familias"))), categories.map(c => /*#__PURE__*/React.createElement("div", {
    key: c,
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '12px 0',
      borderBottom: '1px solid var(--line-soft)'
    }
  }, /*#__PURE__*/React.createElement("strong", null, c), /*#__PURE__*/React.createElement("span", {
    className: "status ready"
  }, inventory.filter(x => x.categoria === c).length, " productos")))), /*#__PURE__*/React.createElement("aside", {
    className: "panel inventory-form"
  }, /*#__PURE__*/React.createElement("h2", null, "Crear Categor\xEDa"), /*#__PURE__*/React.createElement("form", {
    onSubmit: add
  }, /*#__PURE__*/React.createElement("label", null, "Nombre de la categor\xEDa", /*#__PURE__*/React.createElement("input", {
    value: name,
    onChange: e => setName(e.target.value),
    placeholder: "Ej. Parrillas / Cocteler\xEDa"
  })), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "primary"
  }, "Agregar Categor\xEDa"))));
}
function Movements({
  inventory,
  setInventory,
  toast
}) {
  const [id, setId] = useState(inventory[0]?.id || '');
  const [qty, setQty] = useState(5);
  const [type, setType] = useState('entrada');
  const apply = e => {
    e.preventDefault();
    const n = Number(qty);
    setInventory(inventory.map(p => p.id === Number(id) ? {
      ...p,
      stock: Math.max(0, p.stock + (type === 'entrada' ? n : -n))
    } : p));
    toast(`Movimiento de ${type} (+${n}) aplicado correctamente.`);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "split-grid"
  }, /*#__PURE__*/React.createElement("section", {
    className: "panel"
  }, /*#__PURE__*/React.createElement("div", {
    className: "panel-title"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", null, "Niveles de Stock en Almac\xE9n"), /*#__PURE__*/React.createElement("p", null, "Monitoreo preventivo de reposici\xF3n"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: '12px'
    }
  }, inventory.map(p => /*#__PURE__*/React.createElement("div", {
    key: p.id,
    style: {
      display: 'grid',
      gridTemplateColumns: '180px 1fr 44px',
      alignItems: 'center',
      gap: '12px'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("strong", {
    style: {
      fontSize: '12.5px',
      display: 'block'
    }
  }, p.nombre), /*#__PURE__*/React.createElement("small", {
    style: {
      color: 'var(--muted)',
      fontSize: '10.5px'
    }
  }, p.categoria)), /*#__PURE__*/React.createElement("div", {
    className: "keyword-progress-track"
  }, /*#__PURE__*/React.createElement("div", {
    className: "keyword-progress-fill",
    style: {
      width: `${Math.min(100, p.stock / 50 * 100)}%`
    }
  })), /*#__PURE__*/React.createElement("b", {
    style: {
      textAlign: 'right'
    }
  }, p.stock))))), /*#__PURE__*/React.createElement("aside", {
    className: "panel inventory-form"
  }, /*#__PURE__*/React.createElement("h2", null, "Registrar Entrada / Salida"), /*#__PURE__*/React.createElement("form", {
    onSubmit: apply
  }, /*#__PURE__*/React.createElement("label", null, "Producto", /*#__PURE__*/React.createElement("select", {
    value: id,
    onChange: e => setId(e.target.value)
  }, inventory.map(p => /*#__PURE__*/React.createElement("option", {
    key: p.id,
    value: p.id
  }, p.nombre, " (Stock: ", p.stock, ")")))), /*#__PURE__*/React.createElement("label", null, "Tipo de Movimiento", /*#__PURE__*/React.createElement("select", {
    value: type,
    onChange: e => setType(e.target.value)
  }, /*#__PURE__*/React.createElement("option", {
    value: "entrada"
  }, "Entrada de Almac\xE9n (+)"), /*#__PURE__*/React.createElement("option", {
    value: "salida"
  }, "Salida / Merma (\u2212)"))), /*#__PURE__*/React.createElement("label", null, "Cantidad", /*#__PURE__*/React.createElement("input", {
    type: "number",
    min: "1",
    value: qty,
    onChange: e => setQty(e.target.value)
  })), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "primary"
  }, "Aplicar Movimiento"))));
}

/* ==========================================================================
   VISTAS COMPLEMENTARIAS: GRÁFICOS, FORMULARIOS, TABLAS Y PERSONALIZADOS
   ========================================================================== */

function Charts({
  type
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "analytics-grid",
    style: {
      gridTemplateColumns: 'repeat(2, minmax(0, 1fr))'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "panel"
  }, /*#__PURE__*/React.createElement("div", {
    className: "panel-title"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", null, type === 'flot' ? 'Gráfico Flot · Rendimiento' : 'Desempeño por Canal'), /*#__PURE__*/React.createElement("p", null, "Actividad semanal consolidada"))), /*#__PURE__*/React.createElement(BarChart, null)), /*#__PURE__*/React.createElement("div", {
    className: "panel"
  }, /*#__PURE__*/React.createElement("div", {
    className: "panel-title"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", null, "Curva de Ingresos Horarios"), /*#__PURE__*/React.createElement("p", null, "Tendencia operativa"))), /*#__PURE__*/React.createElement(AreaWaveChart, null)), /*#__PURE__*/React.createElement("div", {
    className: "panel"
  }, /*#__PURE__*/React.createElement("div", {
    className: "panel-title"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", null, "Participaci\xF3n de Canales"), /*#__PURE__*/React.createElement("p", null, "Sal\xF3n, Delivery y Recojo"))), /*#__PURE__*/React.createElement(Donut, null)), /*#__PURE__*/React.createElement("div", {
    className: "panel"
  }, /*#__PURE__*/React.createElement("div", {
    className: "panel-title"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", null, "Customer Map Compacto"), /*#__PURE__*/React.createElement("p", null, "Densidad mensual"))), /*#__PURE__*/React.createElement(CustomerBars, {
    period: "Monthly"
  })));
}
function BarChart() {
  const vals = [48, 72, 54, 86, 65, 94, 80];
  const days = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
  return /*#__PURE__*/React.createElement("div", {
    className: "bar-chart"
  }, vals.map((v, i) => /*#__PURE__*/React.createElement("div", {
    key: days[i]
  }, /*#__PURE__*/React.createElement("i", {
    style: {
      height: `${v}%`
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '11px',
      color: 'var(--muted)'
    }
  }, days[i]))));
}
function Donut() {
  return /*#__PURE__*/React.createElement("div", {
    className: "donut-wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "donut"
  }, /*#__PURE__*/React.createElement("span", null, "68%")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: '8px',
      fontSize: '12.5px'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--primary)',
      fontWeight: 700
    }
  }, "\u25CF"), " Sal\xF3n Principal ", /*#__PURE__*/React.createElement("b", null, "46%")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--accent)',
      fontWeight: 700
    }
  }, "\u25CF"), " Delivery Propio ", /*#__PURE__*/React.createElement("b", null, "33%")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--purple)',
      fontWeight: 700
    }
  }, "\u25CF"), " Recojo en Tienda ", /*#__PURE__*/React.createElement("b", null, "21%"))));
}
function Forms({
  toast
}) {
  const [step, setStep] = useState(1);
  return /*#__PURE__*/React.createElement("div", {
    className: "panel",
    style: {
      maxWidth: '760px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "panel-title"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", null, "Asistente de Configuraci\xF3n del Restaurante"), /*#__PURE__*/React.createElement("p", null, "Paso ", step, " de 3"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: '12px'
    }
  }, step === 1 && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'grid',
      gap: '6px',
      fontWeight: 600
    }
  }, "Nombre Comercial", /*#__PURE__*/React.createElement("input", {
    defaultValue: "Lezato \xB7 MenuDe-Prueba"
  })), /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'grid',
      gap: '6px',
      fontWeight: 600
    }
  }, "RUC / Identificaci\xF3n Fiscal", /*#__PURE__*/React.createElement("input", {
    defaultValue: "20609874512"
  }))), step === 2 && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'grid',
      gap: '6px',
      fontWeight: 600
    }
  }, "Moneda Principal", /*#__PURE__*/React.createElement("select", null, /*#__PURE__*/React.createElement("option", null, "Soles Peruanos (PEN - S/)"), /*#__PURE__*/React.createElement("option", null, "D\xF3lares (USD - $)"))), /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'grid',
      gap: '6px',
      fontWeight: 600
    }
  }, "Zona Horaria", /*#__PURE__*/React.createElement("input", {
    defaultValue: "America/Lima (UTC-5)"
  }))), step === 3 && /*#__PURE__*/React.createElement("div", {
    className: "empty-state"
  }, "Par\xE1metros verificados y listos para guardar en el sistema."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: '10px',
      marginTop: '10px'
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "secondary",
    disabled: step === 1,
    onClick: () => setStep(step - 1)
  }, "Anterior"), step < 3 ? /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "primary",
    onClick: () => setStep(step + 1)
  }, "Siguiente") : /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "primary",
    onClick: () => toast('Configuración guardada correctamente.')
  }, "Guardar Configuraci\xF3n"))));
}
function DataTables({
  inventory
}) {
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('nombre');
  const rows = [...inventory].filter(x => x.nombre.toLowerCase().includes(query.toLowerCase())).sort((a, b) => String(a[sort]).localeCompare(String(b[sort]), 'es', {
    numeric: true
  }));
  return /*#__PURE__*/React.createElement("div", {
    className: "panel"
  }, /*#__PURE__*/React.createElement("div", {
    className: "list-toolbar"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", null, "Data Table \xB7 Consulta R\xE1pida"), /*#__PURE__*/React.createElement("p", null, "Haz clic en los encabezados para ordenar columnas.")), /*#__PURE__*/React.createElement("input", {
    value: query,
    onChange: e => setQuery(e.target.value),
    placeholder: "Filtrar tabla...",
    style: {
      maxWidth: '240px'
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "table-scroll"
  }, /*#__PURE__*/React.createElement("table", {
    className: "data-table"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", {
    onClick: () => setSort('nombre'),
    style: {
      cursor: 'pointer'
    }
  }, "Producto \u2195"), /*#__PURE__*/React.createElement("th", {
    onClick: () => setSort('categoria'),
    style: {
      cursor: 'pointer'
    }
  }, "Categor\xEDa \u2195"), /*#__PURE__*/React.createElement("th", {
    onClick: () => setSort('stock'),
    style: {
      cursor: 'pointer'
    }
  }, "Stock \u2195"), /*#__PURE__*/React.createElement("th", {
    onClick: () => setSort('precio'),
    style: {
      cursor: 'pointer'
    }
  }, "Precio \u2195"))), /*#__PURE__*/React.createElement("tbody", null, rows.map(p => /*#__PURE__*/React.createElement("tr", {
    key: p.id
  }, /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("strong", null, p.emoji, " ", p.nombre)), /*#__PURE__*/React.createElement("td", null, p.categoria), /*#__PURE__*/React.createElement("td", null, p.stock), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("strong", null, money(p.precio)))))))));
}
function CustomPage({
  active,
  customLinks,
  setCustomLinks,
  toast
}) {
  const item = customLinks.find(x => x.key === active);
  const [note, setNote] = usePersistentState(`nota-${active}`, '');
  if (!item) return /*#__PURE__*/React.createElement("div", {
    className: "panel empty-state"
  }, "Este submen\xFA personalizado ya no existe.");
  return /*#__PURE__*/React.createElement("div", {
    className: "panel custom-page",
    style: {
      maxWidth: '820px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "panel-title"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", null, item.label), /*#__PURE__*/React.createElement("p", null, "M\xF3dulo personalizado persistente"))), /*#__PURE__*/React.createElement("label", null, "Notas y registros de ", item.label, /*#__PURE__*/React.createElement("textarea", {
    rows: "7",
    value: note,
    onChange: e => setNote(e.target.value),
    placeholder: "Escribe notas operativas, proveedores o recordatorios de esta secci\xF3n..."
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '10px',
      marginTop: '14px'
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "primary",
    onClick: () => toast('Contenido guardado en el navegador.')
  }, "Guardar"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "danger",
    onClick: () => setCustomLinks(customLinks.filter(x => x.key !== active))
  }, "Eliminar submen\xFA")));
}

function mountLezatoApp() {
  var container = document.getElementById("root");
  if (!container) return;
  if (window.ReactDOM && window.ReactDOM.createRoot) {
    var root = window.ReactDOM.createRoot(container);
    root.render(window.React.createElement(App, null));
  } else if (window.ReactDOM && window.ReactDOM.render) {
    window.ReactDOM.render(window.React.createElement(App, null), container);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", mountLezatoApp);
} else {
  mountLezatoApp();
}
})();
