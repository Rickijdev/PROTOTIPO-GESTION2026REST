import React, { useEffect, useMemo, useState } from 'react';

const money = (value) => new Intl.NumberFormat('es-PE', {
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

const BUSINESS_PALETTES = [
  {
    id: 'executive',
    name: 'Ejecutivo Gourmet (Recomendada)',
    badge: 'Óptima B2B / POS',
    desc: 'Azul Cobalto (#2563EB) + Ámbar Culinario (#EA580C) + Esmeralda (#10B981). Reduce fatiga visual en turnos largos y transmite confianza financiera.',
    swatches: ['#2563EB', '#EA580C', '#6C5DD3', '#10B981']
  },
  {
    id: 'lezato',
    name: 'Lezato Original',
    badge: 'Clásica FoodTech',
    desc: 'Naranja Gastronómico (#FF5C00) + Púrpura Real (#6C5DD3) + Verde (#2BC155). Alta energía visual idéntica a la plantilla Lezato.',
    swatches: ['#FF5C00', '#6C5DD3', '#2BC155', '#1E1E2D']
  },
  {
    id: 'emerald',
    name: 'Esmeralda Corporativo',
    badge: 'Fresco & Moderno',
    desc: 'Turquesa Profundo (#0D9488) + Índigo (#6366F1). Evolución equilibrada de la paleta turquesa-violeta con alto contraste WCAG.',
    swatches: ['#0D9488', '#6366F1', '#059669', '#F59E0B']
  },
  {
    id: 'burgundy',
    name: 'Borgoña & Oro Bistro',
    badge: 'Alta Cocina',
    desc: 'Vino Reserva (#BE123C) + Dorado Cálido (#D97706). Ideal para restaurantes gourmet, carnes, parrillas y lounges.',
    swatches: ['#BE123C', '#D97706', '#7C3AED', '#15803D']
  }
];

const SvgIcon = ({ name, size = 18 }) => {
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
      return <svg {...props}><path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z"/><line x1="6" y1="17" x2="18" y2="17"/></svg>;
    case 'home':
      return <svg {...props}><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/></svg>;
    case 'inventory':
      return <svg {...props}><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>;
    case 'charts':
      return <svg {...props}><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>;
    case 'forms':
      return <svg {...props}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>;
    case 'menu':
      return <svg {...props}><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="16" y2="12"/><line x1="4" y1="18" x2="20" y2="18"/></svg>;
    case 'search':
      return <svg {...props}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>;
    case 'bell':
      return <svg {...props}><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>;
    case 'chat':
      return <svg {...props}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>;
    case 'cup':
      return <svg {...props}><path d="M17 8h1a4 4 0 1 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/><line x1="6" y1="2" x2="6" y2="4"/><line x1="10" y1="2" x2="10" y2="4"/><line x1="14" y1="2" x2="14" y2="4"/></svg>;
    case 'dollar':
      return <svg {...props}><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>;
    case 'orders':
      return <svg {...props}><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>;
    case 'users':
      return <svg {...props}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
    case 'plane':
      return <svg {...props}><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/></svg>;
    case 'pin':
      return <svg {...props}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>;
    case 'palette':
      return <svg {...props}><circle cx="13.5" cy="6.5" r=".5"/><circle cx="17.5" cy="10.5" r=".5"/><circle cx="8.5" cy="7.5" r=".5"/><circle cx="6.5" cy="12.5" r=".5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>;
    case 'moon':
      return <svg {...props}><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>;
    case 'sun':
      return <svg {...props}><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/></svg>;
    case 'trash':
      return <svg {...props}><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>;
    case 'edit':
      return <svg {...props}><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>;
    case 'plus':
      return <svg {...props}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>;
    case 'chevron':
      return <svg {...props}><polyline points="9 18 15 12 9 6"/></svg>;
    case 'close':
      return <svg {...props}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;
    default:
      return <svg {...props}><circle cx="12" cy="12" r="4"/></svg>;
  }
};

const initialInventory = [
  { id: 1, nombre: 'Lomo saltado gourmet', categoria: 'Platos', stock: 28, minimo: 8, precio: 28.00, emoji: '🥩', vendidos: 89 },
  { id: 2, nombre: 'Ceviche clásico norteño', categoria: 'Platos', stock: 19, minimo: 6, precio: 32.00, emoji: '🐟', vendidos: 84 },
  { id: 3, nombre: 'Ají de gallina cremoso', categoria: 'Platos', stock: 22, minimo: 8, precio: 22.00, emoji: '🍛', vendidos: 76 },
  { id: 4, nombre: 'Arroz con pollo norteño', categoria: 'Platos', stock: 18, minimo: 8, precio: 20.00, emoji: '🍗', vendidos: 68 },
  { id: 5, nombre: 'Hamburguesa artesanal Lezato', categoria: 'Platos', stock: 31, minimo: 10, precio: 18.00, emoji: '🍔', vendidos: 64 },
  { id: 6, nombre: 'Porción de papas nativas', categoria: 'Entradas', stock: 34, minimo: 10, precio: 10.00, emoji: '🍟', vendidos: 52 },
  { id: 7, nombre: 'Papa a la huancaína', categoria: 'Entradas', stock: 12, minimo: 6, precio: 12.00, emoji: '🥗', vendidos: 49 },
  { id: 8, nombre: 'Limonada frozen hierbabuena', categoria: 'Bebidas', stock: 40, minimo: 12, precio: 7.00, emoji: '🍋', vendidos: 91 },
  { id: 9, nombre: 'Chicha morada artesanal', categoria: 'Bebidas', stock: 38, minimo: 12, precio: 6.00, emoji: '🍷', vendidos: 79 },
  { id: 10, nombre: 'Gaseosa personal fría', categoria: 'Bebidas', stock: 50, minimo: 15, precio: 5.00, emoji: '🥤', vendidos: 62 },
  { id: 11, nombre: 'Arroz con leche y mazamorra', categoria: 'Postres', stock: 11, minimo: 5, precio: 8.00, emoji: '🍮', vendidos: 41 },
  { id: 12, nombre: 'Torta húmeda de chocolate', categoria: 'Postres', stock: 5, minimo: 6, precio: 10.00, emoji: '🍰', vendidos: 38 },
];

const initialOrders = [
  { id: 1048, mesa: 4, cliente: 'Benny Chagur', direccion: 'Mesa 04 · Salón Principal', total: 55.00, estado: 'En preparación', items: ['1 × Lomo saltado gourmet', '1 × Ají de gallina cremoso', '1 × Gaseosa personal fría'], hora: '13:08' },
  { id: 1047, mesa: 2, cliente: 'Chynita Bella', direccion: 'Mesa 02 · Terraza', total: 39.00, estado: 'Pendiente', items: ['1 × Ceviche clásico norteño', '1 × Limonada frozen hierbabuena'], hora: '12:54' },
  { id: 1046, mesa: 7, cliente: 'David Heree', direccion: 'Av. Larco 1245 · Delivery', total: 46.00, estado: 'Listo', items: ['2 × Hamburguesa artesanal Lezato', '2 × Gaseosa personal fría'], hora: '12:41' },
  { id: 1045, mesa: 1, cliente: 'Evan D. Mas', direccion: 'Mesa 01 · Salón VIP', total: 30.00, estado: 'Entregado', items: ['1 × Arroz con pollo norteño', '1 × Torta húmeda de chocolate'], hora: '12:20' },
];

const initialCustomers = [
  { id: 1, nombre: 'Benny Chagur', pedidos: 18, gasto: 742, tipo: 'MEMBER', ubicacion: 'Av. América Sur 420, Trujillo' },
  { id: 2, nombre: 'Chynita Bella', pedidos: 12, gasto: 515, tipo: 'Regular Customer', ubicacion: 'Urb. Primavera 812, Trujillo' },
  { id: 3, nombre: 'David Heree', pedidos: 15, gasto: 628, tipo: 'MEMBER', ubicacion: 'Calle Los Pinos 234, El Golf' },
  { id: 4, nombre: 'Evan D. Mas', pedidos: 7, gasto: 286, tipo: 'Regular Customer', ubicacion: 'Av. Larco 1180, Víctor Larco' },
  { id: 5, nombre: 'Supratman Torres', pedidos: 21, gasto: 910, tipo: 'MEMBER', ubicacion: 'Urb. San Andrés 510, Trujillo' },
  { id: 6, nombre: 'John Kusnaidi', pedidos: 9, gasto: 364, tipo: 'Regular Customer', ubicacion: 'Jr. Pizarro 604, Centro Histórico' },
];

const initialTasks = [
  { id: 1, texto: 'Verificar stock mínimo de insumos para turno tarde', completada: true, area: 'Inventario' },
  { id: 2, texto: 'Confirmar despacho de pedidos delivery programados 11:24 AM', completada: false, area: 'Despacho' },
  { id: 3, texto: 'Cuadrar arqueo parcial de cobros Yape y Plin en Caja', completada: false, area: 'Caja' },
  { id: 4, texto: 'Actualizar precios de carta ejecutiva de almuerzo', completada: true, area: 'Carta' },
];

const NAV = [
  {
    key: 'dashboard',
    label: 'Dashboard',
    icon: 'home',
    children: [
      ['inicio', 'Dashboard Light'],
      ['inicio-dark', 'Dashboard Dark'],
      ['mesas', 'Mesas y Pedidos (POS)'],
      ['cocina', 'Cocina (KDS)'],
      ['caja', 'Caja y Cobros'],
      ['resumen', 'Resumen del Día'],
      ['pedidos', 'Orders (Pedidos)'],
      ['detalle-pedido', 'Order Details'],
      ['clientes', 'Customers (Clientes)'],
      ['analitica', 'Analytics (Analítica)'],
      ['resenas', 'Review (Reseñas)'],
      ['tareas', 'Task (Tareas)'],
    ]
  },
  {
    key: 'inventario',
    label: 'Inventario y Carta',
    icon: 'inventory',
    children: [
      ['inventario-productos', 'Productos y Menú'],
      ['inventario-categorias', 'Categorías'],
      ['inventario-movimientos', 'Movimientos de Stock'],
    ]
  },
  {
    key: 'graficos',
    label: 'Charts (Gráficos)',
    icon: 'charts',
    children: [
      ['grafico-flot', 'Flot & Ventas'],
      ['grafico-canales', 'Canales & Métricas'],
    ]
  },
  {
    key: 'sistema',
    label: 'Forms & Tablas',
    icon: 'forms',
    children: [
      ['sistema-formularios', 'Asistente & Formularios'],
      ['sistema-tablas', 'Tablas de Datos'],
    ]
  }
];

const PAGE_META = Object.fromEntries(
  NAV.flatMap(g => g.children.map(([key, label]) => [key, { title: label, group: g.label }]))
);

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

export default function App() {
  const [active, setActive] = useState('inicio');
  const [palette, setPalette] = usePersistentState('menu-prueba-palette', 'executive');
  const [theme, setTheme] = usePersistentState('menu-prueba-theme', 'light');
  const [openGroups, setOpenGroups] = useState({ dashboard: true, inventario: true, graficos: false, sistema: false });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [search, setSearch] = useState('');
  const [inventory, setInventory] = usePersistentState('menu-prueba-inventario', initialInventory);
  const [orders, setOrders] = usePersistentState('menu-prueba-pedidos', initialOrders);
  const [payments, setPayments] = usePersistentState('menu-prueba-cobros', [
    { id: 901, pedidoId: 1044, mesa: 3, total: 84.00, metodo: 'Yape', dia: dayKey(), hora: '11:40' },
    { id: 902, pedidoId: 1043, mesa: 5, total: 156.45, metodo: 'Tarjeta', dia: dayKey(), hora: '12:05' }
  ]);
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

  const allSearchItems = useMemo(() => [
    ...NAV.flatMap(g => g.children.map(([key, label]) => ({ key, label, group: g.label, type: 'page' }))),
    ...customLinks.map(x => ({ ...x, group: 'Personalizados', type: 'page' })),
    ...inventory.map(p => ({ key: 'inventario-productos', label: `${p.emoji || '🍽️'} ${p.nombre} (${money(p.precio)})`, group: p.categoria, type: 'dish' }))
  ], [customLinks, inventory]);

  const searchResults = search.trim()
    ? allSearchItems.filter(p => p.label.toLowerCase().includes(search.toLowerCase())).slice(0, 7)
    : [];

  const go = (key) => {
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
  const meta = PAGE_META[active] || customLinks.find(x => x.key === active) || { title: 'Dashboard', group: 'Dashboard' };

  return (
    <div className={`app-shell ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`} data-palette={palette} data-theme={theme}>
      <Sidebar
        active={active}
        theme={theme}
        go={go}
        openGroups={openGroups}
        setOpenGroups={setOpenGroups}
        open={sidebarOpen}
        close={() => setSidebarOpen(false)}
        customLinks={customLinks}
        setCustomLinks={setCustomLinks}
        onOpenPalette={() => setPaletteModalOpen(true)}
      />

      <div className="main-column">
        <header className="topbar">
          <button className="hamburger-btn" onClick={toggleHamburger} aria-label="Alternar barra lateral">
            <SvgIcon name="menu" size={20} />
          </button>

          <div className="topbar-page-title">
            {active === 'inicio' ? 'Dashboard' : meta.title}
          </div>

          <div className="global-search">
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search Here / Buscar sección o plato..."
            />
            <SvgIcon name="search" size={18} />
            {searchResults.length > 0 && (
              <div className="search-popover">
                {searchResults.map((r, idx) => (
                  <button key={`${r.key}-${idx}`} onClick={() => go(r.key)}>
                    <span>{r.label}</span>
                    <small>{r.group}</small>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="topbar-actions">
            <button
              type="button"
              className="palette-quick-btn"
              onClick={() => setPaletteModalOpen(true)}
              title="Cambiar paleta de colores de negocio"
            >
              <i className="palette-dot" />
              <span>{currentPaletteObj.name.split(' ')[0]}</span>
            </button>

            <button
              type="button"
              className="recipe-button"
              onClick={() => go('inventario-productos')}
            >
              <SvgIcon name="chef" size={16} />
              <span>Recipe Guide / Carta</span>
            </button>

            <div className="popover-Wrapper">
              <button
                type="button"
                className="icon-button"
                onClick={() => { setNotifOpen(v => !v); setChatOpen(false); }}
                aria-label="Notificaciones"
              >
                <SvgIcon name="bell" size={19} />
                <span className="badge-counter">{lowStockItems.length + activeOrders.length}</span>
              </button>
              {notifOpen && (
                <div className="dropdown-panel">
                  <h4>
                    <span>Centro de Alertas</span>
                    <small>{lowStockItems.length} stock · {activeOrders.length} cocina</small>
                  </h4>
                  {lowStockItems.map(item => (
                    <div className="dropdown-item" key={item.id}>
                      <span>⚠️ Stock bajo: <strong>{item.nombre}</strong> ({item.stock} unid.)</span>
                      <button className="pill-tab active" onClick={() => go('inventario-movimientos')}>Reponer</button>
                    </div>
                  ))}
                  {activeOrders.slice(0, 3).map(ord => (
                    <div className="dropdown-item" key={ord.id}>
                      <span>🍽️ Pedido <strong>#{ord.id}</strong> ({ord.estado})</span>
                      <button className="pill-tab" onClick={() => go('cocina')}>Ver</button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="popover-Wrapper">
              <button
                type="button"
                className="icon-button"
                onClick={() => { setChatOpen(v => !v); setNotifOpen(false); }}
                aria-label="Mensajes de Cocina y Caja"
              >
                <SvgIcon name="chat" size={19} />
                <span className="badge-counter accent">{readyOrders.length || 5}</span>
              </button>
              {chatOpen && (
                <div className="dropdown-panel">
                  <h4>
                    <span>Monitor de Despacho y Caja</span>
                    <small>En vivo</small>
                  </h4>
                  {readyOrders.length ? readyOrders.map(ord => (
                    <div className="dropdown-item" key={ord.id}>
                      <span>✅ Mesa {ord.mesa} ({ord.estado}) — <strong>{money(ord.total)}</strong></span>
                      <button className="pill-tab active" onClick={() => go('caja')}>Cobrar</button>
                    </div>
                  )) : (
                    <div className="dropdown-item">
                      <span>Todos los pedidos entregados han sido liquidados.</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="profile-chip" onClick={() => go('resumen')} title="Ver resumen de turno">
              <span className="avatar">MP</span>
              <div>
                <strong>Administrador</strong>
                <small>Lezato · MenuDe-Prueba</small>
              </div>
            </div>
          </div>
        </header>

        <main className="content">
          <div className="page-head">
            <div className="page-head-left">
              <h1>{meta.title}</h1>
              <p>Bienvenido a Lezato · Sistema Administrativo y POS Gastronómico</p>
            </div>
            <div className="breadcrumb">
              <span>{meta.group}</span>
              <b>/</b>
              <strong>{meta.title}</strong>
            </div>
          </div>

          <PageRouter
            active={active}
            inventory={inventory}
            setInventory={setInventory}
            orders={orders}
            setOrders={setOrders}
            payments={payments}
            setPayments={setPayments}
            customers={customers}
            setCustomers={setCustomers}
            tasks={tasks}
            setTasks={setTasks}
            selectedOrderId={selectedOrderId}
            setSelectedOrderId={setSelectedOrderId}
            toast={setToast}
            customLinks={customLinks}
            setCustomLinks={setCustomLinks}
            go={go}
          />
        </main>

        <footer className="footer">
          Copyright © Diseñado y Desarrollado al estilo <b>Lezato DexignZone</b> · Adaptado para <b>MenuDe-Prueba ERP 2026</b>
        </footer>
      </div>

      <div className="floating-dock">
        <button
          type="button"
          className="dock-btn"
          onClick={() => setPaletteModalOpen(true)}
          title="Personalizar Paleta de Colores de Negocio"
          aria-label="Abrir selector de paleta"
        >
          <SvgIcon name="palette" size={20} />
        </button>
        <button
          type="button"
          className="dock-btn alt"
          onClick={() => {
            const next = theme === 'light' ? 'dark' : 'light';
            setTheme(next);
            setToast(next === 'dark' ? 'Modo Oscuro activado' : 'Modo Claro activado');
          }}
          title="Alternar Modo Claro / Oscuro"
          aria-label="Alternar tema claro u oscuro"
        >
          <SvgIcon name={theme === 'light' ? 'moon' : 'sun'} size={20} />
        </button>
      </div>

      {paletteModalOpen && (
        <div className="modal-layer" onMouseDown={() => setPaletteModalOpen(false)}>
          <div className="modal-card confirm-dialog" style={{ width: 'min(680px, 95vw)' }} onMouseDown={e => e.stopPropagation()}>
            <div className="modal-head" style={{ padding: '0 0 16px' }}>
              <div>
                <small>DISEÑO CORPORATIVO & PSICOLOGÍA DEL COLOR</small>
                <h2>Paleta de Colores de Negocio</h2>
              </div>
              <button type="button" className="modal-close-btn" onClick={() => setPaletteModalOpen(false)}>×</button>
            </div>
            <p style={{ margin: '10px 0 6px', fontSize: '12.5px', color: 'var(--muted)' }}>
              Selecciona la paleta visual del sistema. La opción <strong>Ejecutivo Gourmet</strong> está optimizada para reducir la fatiga ocular en caja y destacar métricas financieras y llamadas a la acción.
            </p>
            <div className="palette-modal-grid">
              {BUSINESS_PALETTES.map(p => (
                <button
                  type="button"
                  key={p.id}
                  className={`palette-card ${palette === p.id ? 'active' : ''}`}
                  onClick={() => {
                    setPalette(p.id);
                    setToast(`Paleta "${p.name}" aplicada.`);
                  }}
                >
                  <div className="swatch-row">
                    {p.swatches.map(hex => <i key={hex} style={{ background: hex }} />)}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <strong style={{ fontSize: '13.5px' }}>{p.name}</strong>
                    <span className="status ready">{p.badge}</span>
                  </div>
                  <small style={{ color: 'var(--muted)', fontSize: '11.5px', lineHeight: 1.45, display: 'block' }}>
                    {p.desc}
                  </small>
                </button>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '18px', paddingTop: '14px', borderTop: '1px solid var(--line)' }}>
              <button
                type="button"
                className="secondary"
                onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              >
                <SvgIcon name={theme === 'light' ? 'moon' : 'sun'} size={16} />
                Cambiar a Modo {theme === 'light' ? 'Oscuro (Dark)' : 'Claro (Light)'}
              </button>
              <button type="button" className="primary" onClick={() => setPaletteModalOpen(false)}>
                Listo y Aplicar
              </button>
            </div>
          </div>
        </div>
      )}

      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}

function Sidebar({ active, theme, go, openGroups, setOpenGroups, open, close, customLinks, setCustomLinks, onOpenPalette }) {
  const [manage, setManage] = useState(false);
  const [name, setName] = useState('');

  const addCustom = (e) => {
    e.preventDefault();
    const clean = name.trim();
    if (!clean) return;
    setCustomLinks([...customLinks, { key: `custom-${uid()}`, label: clean }]);
    setName('');
  };

  return (
    <>
      <aside className={`sidebar ${open ? 'open' : ''}`}>
        <div className="brand">
          <span className="brand-mark">
            <SvgIcon name="chef" size={24} />
          </span>
          <div className="brand-text">
            <strong>Lezato<i>.</i></strong>
            <small>MENUDE-PRUEBA POS</small>
          </div>
          <button type="button" className="sidebar-close" onClick={close} aria-label="Cerrar menú">
            <SvgIcon name="close" size={18} />
          </button>
        </div>

        <div className="sidebar-label">MENÚ PRINCIPAL</div>

        <nav className="side-nav">
          {NAV.map(group => {
            const expanded = !!openGroups[group.key];
            const childActive = group.children.some(([k]) => k === active || (k === 'inicio-dark' && active === 'inicio' && theme === 'dark'));
            return (
              <div className="nav-group" key={group.key}>
                <button
                  type="button"
                  className={`nav-parent ${childActive ? 'has-active' : ''}`}
                  onClick={() => setOpenGroups({ ...openGroups, [group.key]: !expanded })}
                >
                  <span className="nav-parent-left">
                    <SvgIcon name={group.icon} size={20} />
                    <span className="nav-parent-label">{group.label}</span>
                  </span>
                  <span className={`chevron ${expanded ? 'down' : ''}`}>
                    <SvgIcon name="chevron" size={16} />
                  </span>
                </button>
                {expanded && (
                  <div className="nav-children">
                    {group.children.map(([key, label]) => {
                      const isCurrent =
                        (key === 'inicio' && active === 'inicio' && theme === 'light') ||
                        (key === 'inicio-dark' && active === 'inicio' && theme === 'dark') ||
                        (key !== 'inicio' && key !== 'inicio-dark' && active === key);
                      return (
                        <button
                          type="button"
                          key={key}
                          className={isCurrent ? 'active' : ''}
                          onClick={() => go(key)}
                        >
                          <span className="tiny-dot" />
                          {label}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}

          <div className="nav-group">
            <button type="button" className="nav-parent" onClick={() => setManage(v => !v)}>
              <span className="nav-parent-left">
                <SvgIcon name="plus" size={20} />
                <span className="nav-parent-label">Personalizados</span>
              </span>
              <span className={`chevron ${manage ? 'down' : ''}`}>
                <SvgIcon name="chevron" size={16} />
              </span>
            </button>
            {manage && (
              <div className="custom-menu-box">
                <form onSubmit={addCustom}>
                  <input value={name} onChange={e => setName(e.target.value)} placeholder="Nuevo submenú..." />
                  <button type="submit">Crear</button>
                </form>
                {customLinks.map(link => (
                  <div className="custom-link" key={link.key}>
                    <button type="button" onClick={() => go(link.key)}>{link.label}</button>
                    <button
                      type="button"
                      className="remove-mini"
                      onClick={() => setCustomLinks(customLinks.filter(x => x.key !== link.key))}
                    >
                      ×
                    </button>
                  </div>
                ))}
                {!customLinks.length && <small>Crea accesos o módulos propios para tu operación diaria.</small>}
              </div>
            )}
          </div>
        </nav>

        <div className="sidebar-card">
          <div className="sidebar-card-illus">
            <SvgIcon name="chef" size={26} />
          </div>
          <span>LEZATO RESTAURANT ADMIN</span>
          <strong>Gestión Gastronómica Inteligente</strong>
          <p>Controla salón, cocina, cobros acumulados de caja e inventario en tiempo real.</p>
          <button type="button" className="primary" style={{ width: '100%', minHeight: '38px', fontSize: '12px' }} onClick={onOpenPalette}>
            Paleta de Negocios
          </button>
          <div className="sidebar-copyright">
            Lezato Admin © 2026 All Rights Reserved
          </div>
        </div>
      </aside>
      {open && <button type="button" className="sidebar-backdrop" onClick={close} aria-label="Cerrar barra lateral" />}
    </>
  );
}

function PageRouter(props) {
  const { active } = props;
  if (active === 'inicio') return <Dashboard {...props} />;
  if (active === 'mesas') return <TablesView {...props} />;
  if (active === 'cocina') return <Kitchen {...props} />;
  if (active === 'caja') return <Cashier {...props} />;
  if (active === 'resumen') return <Summary {...props} />;
  if (active === 'pedidos') return <Orders {...props} />;
  if (active === 'detalle-pedido') return <OrderDetail {...props} />;
  if (active === 'clientes') return <Customers {...props} />;
  if (active === 'analitica') return <Analytics {...props} />;
  if (active === 'resenas') return <Reviews {...props} />;
  if (active === 'tareas') return <TasksView {...props} />;
  if (active === 'inventario-productos') return <Inventory {...props} />;
  if (active === 'inventario-categorias') return <Categories {...props} />;
  if (active === 'inventario-movimientos') return <Movements {...props} />;
  if (active.startsWith('grafico-')) return <Charts type={active.replace('grafico-', '')} {...props} />;
  if (active === 'sistema-formularios') return <Forms {...props} />;
  if (active === 'sistema-tablas') return <DataTables {...props} />;
  if (active.startsWith('custom-')) return <CustomPage active={active} {...props} />;
  return <Dashboard {...props} />;
}

/* ==========================================================================
   VISTA 1: LEZATO DASHBOARD (ESTRUCTURA FIEL A https://lezato-vite.vercel.app/dashboard)
   ========================================================================== */

function Dashboard({ orders, inventory, payments = [], customers = [], go, toast }) {
  const today = dayKey();
  const todayRevenue = payments.filter(p => p.dia === today).reduce((s, p) => s + p.total, 0);
  const lowCount = inventory.filter(i => i.stock <= i.minimo).length;
  const totalOrdersCount = orders.length + 243;
  const totalMenusCount = inventory.length + 447;
  const totalCustomersCount = customers.length + 866;

  const [mapPeriod, setMapPeriod] = useState('Year');
  const [showAllCustomers, setShowAllCustomers] = useState(false);
  const [keywords, setKeywords] = useState([
    { tag: '#ceviche', count: 452, pct: 88 },
    { tag: '#almuerzoejecutivo', count: 197, pct: 62 },
    { tag: '#lomosaltado', count: 156, pct: 48 },
    { tag: '#chichamorada', count: 98, pct: 34 },
  ]);
  const [otherTags, setOtherTags] = useState([
    '#comidaPerú', '#parrilla', '#deliveryExpress', '#postresArtesanales', '#mariscos', '#ejecutivo', '16+'
  ]);

  const displayedCustomers = showAllCustomers ? customers : customers.slice(0, 5);

  return (
    <>
      {/* FILA SUPERIOR LEZATO: 4 Tarjetas con Anillo Donut a la izquierda + Today's Revenue Wave a la derecha */}
      <section className="lezato-top-grid">
        <div className="lezato-stats-grid">
          <StatCard
            label="Total Menus"
            value={totalMenusCount}
            detail={`${inventory.length} platos en carta activa`}
            icon="cup"
            percent={74}
          />
          <StatCard
            label="Total Revenue (Hoy)"
            value={money(todayRevenue)}
            detail="Cobros acumulados del día"
            icon="dollar"
            percent={84}
          />
          <StatCard
            label="Total Orders"
            value={totalOrdersCount}
            detail={`${orders.length} pedidos en curso ahora`}
            icon="orders"
            percent={66}
          />
          <StatCard
            label="Total Customers"
            value={totalCustomersCount}
            detail={lowCount ? `${lowCount} insumos en stock mínimo` : 'Inventario saludable'}
            icon="users"
            percent={80}
            alert={lowCount > 0}
          />
        </div>

        <article className="panel dashboard-revenue">
          <div className="panel-title" style={{ marginBottom: '8px' }}>
            <div>
              <h2>Today&apos;s Revenue · Ingresos de Hoy</h2>
              <p>Curva horaria de ventas confirmadas en Caja ({today})</p>
            </div>
            <button type="button" className="pill-tab active" onClick={() => go('resumen')}>
              Ver Arqueo
            </button>
          </div>

          <div className="revenue-metrics-row">
            <div className="revenue-primary-figure">
              <strong>{money(todayRevenue)}</strong>
            </div>
            <span className="revenue-growth-badge">
              ▲ 0,5% than last day
            </span>
          </div>

          <AreaWaveChart />
        </article>
      </section>

      {/* CUERPO PRINCIPAL DE 2 COLUMNAS ASIMÉTRICAS LEZATO (40% Izquierda / 60% Derecha) */}
      <section className="lezato-main-columns">
        {/* COLUMNA IZQUIERDA: Daily Trending Menus + Trending Keyword */}
        <div className="lezato-col-left">
          <article className="panel trending-panel">
            <div className="panel-title">
              <div>
                <h2>Daily Trending Menus</h2>
                <p>Los 5 platos más solicitados hoy en salón y delivery</p>
              </div>
              <button type="button" className="pill-tab" onClick={() => go('inventario-productos')}>
                Carta →
              </button>
            </div>

            <div className="menu-ranking">
              {inventory.slice(0, 5).map((p, i) => (
                <div className="trending-item" key={p.id}>
                  <span className="rank-number">#{i + 1}</span>
                  <div className="trending-meta">
                    <strong>{p.nombre}</strong>
                    <div className="trending-sub">
                      <b>{money(p.precio)}</b>
                      <small>Order {p.vendidos || (89 - i * 6)}x</small>
                    </div>
                  </div>
                  <div className="rank-thumb-box" title={`Stock disponible: ${p.stock}`}>
                    {p.emoji || ['🥩', '🐟', '🍛', '🍗', '🍔'][i]}
                  </div>
                </div>
              ))}
            </div>
          </article>

          <article className="panel keyword-panel">
            <div className="panel-title">
              <div>
                <h2>Trending Keyword</h2>
                <p>Etiquetas y búsquedas con mayor conversión</p>
              </div>
            </div>

            <div className="keyword-bars-list">
              {keywords.map(k => (
                <div className="keyword-bar-item" key={k.tag}>
                  <div className="keyword-bar-top">
                    <span>{k.tag}</span>
                    <b>{k.count} times</b>
                  </div>
                  <div className="keyword-progress-track">
                    <div className="keyword-progress-fill" style={{ width: `${k.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>

            <div className="others-tag-section">
              <h4>Others tag</h4>
              <div className="tag-cloud">
                {otherTags.map(tag => (
                  <button
                    type="button"
                    key={tag}
                    className="tag-pill"
                    onClick={() => {
                      if (tag === '16+') {
                        setOtherTags([...otherTags.filter(t => t !== '16+'), '#anticuchos', '#picarones', '#chifles']);
                        toast('Se desplegaron etiquetas gastronómicas adicionales.');
                      } else {
                        setKeywords(keywords.map((k, idx) => idx === 0 ? { ...k, count: k.count + 1 } : k));
                        toast(`Filtro rápido "${tag}" registrado en tendencias.`);
                      }
                    }}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </article>
        </div>

        {/* COLUMNA DERECHA: Customer Map + Customers List + Delivery Maps & Upcoming Shipping Schedule */}
        <div className="lezato-col-right">
          <article className="panel customer-map-panel">
            <div className="panel-title">
              <div>
                <h2>Customer Map</h2>
                <p>Volumen diario de comensales y rotación de mesas</p>
              </div>
              <div className="panel-title-actions">
                {['Year', 'Monthly', 'Week'].map(period => (
                  <button
                    type="button"
                    key={period}
                    className={`pill-tab ${mapPeriod === period ? 'active' : ''}`}
                    onClick={() => setMapPeriod(period)}
                  >
                    {period}
                  </button>
                ))}
              </div>
            </div>
            <CustomerBars period={mapPeriod} />
          </article>

          <article className="panel customer-panel">
            <div className="panel-title">
              <div>
                <h2>Customers</h2>
                <p>Clientes frecuentes y miembros registrados</p>
              </div>
              <button
                type="button"
                className="icon-button"
                style={{ background: 'var(--primary)', color: '#fff', width: '38px', height: '38px' }}
                onClick={() => go('clientes')}
                title="Gestionar o agregar cliente"
                aria-label="Ir a clientes"
              >
                <SvgIcon name="plus" size={18} />
              </button>
            </div>

            <div className="customer-list-wrap">
              {displayedCustomers.map(c => (
                <div className="customer-row" key={c.id}>
                  <span className="avatar">
                    {c.nombre.split(' ').map(x => x[0]).join('').slice(0, 2)}
                  </span>
                  <div>
                    <strong>{c.nombre}</strong>
                    <small>{c.ubicacion || `${c.pedidos} pedidos acumulados · ${money(c.gasto)}`}</small>
                  </div>
                  <span className={`member-badge ${c.tipo === 'MEMBER' ? 'vip' : 'regular'}`}>
                    {c.tipo}
                  </span>
                </div>
              ))}
            </div>

            <button
              type="button"
              className="expand-circle-btn"
              onClick={() => setShowAllCustomers(v => !v)}
              aria-label="Mostrar más clientes"
              title={showAllCustomers ? 'Contraer lista' : 'Ver todos los clientes'}
            >
              <span className={`chevron ${showAllCustomers ? 'down' : ''}`} style={{ transform: showAllCustomers ? 'rotate(-90deg)' : 'rotate(90deg)' }}>
                <SvgIcon name="chevron" size={16} />
              </span>
            </button>
          </article>

          <article className="panel delivery-panel">
            <div className="panel-title">
              <div>
                <h2>Delivery Maps</h2>
                <p>Monitoreo de rutas activas y despachos programados</p>
              </div>
              <button type="button" className="pill-tab" onClick={() => go('pedidos')}>
                Ver Pedidos ({orders.length})
              </button>
            </div>

            <DeliveryMap activeCount={orders.length + 41} />

            <div className="shipping-schedule-head">
              <span className="plane-badge">
                <SvgIcon name="plane" size={18} />
              </span>
              <h3>Upcoming Shipping Schedule</h3>
            </div>

            <div className="shipping-list">
              {orders.slice(0, 3).map(o => (
                <div className="shipping-item" key={o.id}>
                  <div>
                    <strong>{o.cliente} ({o.items.length} Items)</strong>
                    <span>Will be shipping on {o.hora} · Estado: {o.estado}</span>
                    <small>{o.direccion || `Mesa ${String(o.mesa).padStart(2, '0')} · Salón Principal, Trujillo / Perú`}</small>
                  </div>
                  <button
                    type="button"
                    className="pin-btn"
                    onClick={() => go('detalle-pedido')}
                    title="Ver ruta y seguimiento del pedido"
                    aria-label="Ver seguimiento"
                  >
                    <SvgIcon name="pin" size={16} />
                  </button>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>
    </>
  );
}

function StatCard({ label, value, detail, icon, percent = 75, alert }) {
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <article className="stat-card">
      <div className="stat-info">
        <strong>{value}</strong>
        <span>{label}</span>
        <small className={alert ? 'danger-text' : ''}>{detail}</small>
      </div>
      <div className="stat-donut-ring">
        <svg className="ring-svg" viewBox="0 0 68 68">
          <circle className="ring-bg" cx="34" cy="34" r={radius} />
          <circle
            className="ring-meter"
            cx="34"
            cy="34"
            r={radius}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />
        </svg>
        <span className="stat-donut-inner">
          <SvgIcon name={icon} size={20} />
        </span>
      </div>
    </article>
  );
}

function AreaWaveChart() {
  const wavePath = 'M 0,112 C 45,98 65,60 110,68 C 155,76 180,28 230,42 C 275,54 310,18 360,30 C 410,42 450,12 500,20';
  const fillPath = `${wavePath} L 500,145 L 0,145 Z`;

  return (
    <div className="chart-wrap">
      <svg viewBox="0 0 500 145" preserveAspectRatio="none" role="img" aria-label="Curva de ingresos de hoy">
        <defs>
          <linearGradient id="lezatoAreaGrad" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.34" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0.01" />
          </linearGradient>
        </defs>
        <line x1="0" y1="30" x2="500" y2="30" stroke="var(--line)" strokeDasharray="3 3" strokeWidth="1" />
        <line x1="0" y1="75" x2="500" y2="75" stroke="var(--line)" strokeDasharray="3 3" strokeWidth="1" />
        <line x1="0" y1="120" x2="500" y2="120" stroke="var(--line)" strokeDasharray="3 3" strokeWidth="1" />
        <path d={fillPath} fill="url(#lezatoAreaGrad)" />
        <path d={wavePath} fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        <circle cx="230" cy="42" r="5" fill="var(--surface)" stroke="currentColor" strokeWidth="3" />
        <circle cx="360" cy="30" r="5" fill="var(--surface)" stroke="currentColor" strokeWidth="3" />
        <circle cx="500" cy="20" r="5" fill="var(--surface)" stroke="currentColor" strokeWidth="3" />
      </svg>
      <div className="axis">
        <span>08:00</span>
        <span>09:00</span>
        <span>10:00</span>
        <span>11:00</span>
        <span>12:00</span>
        <span>13:00</span>
        <span>14:00</span>
      </div>
    </div>
  );
}

function CustomerBars({ period }) {
  const datasets = {
    Year: [42, 64, 78, 52, 70, 88, 61, 67, 82, 54, 72, 92, 76, 63, 58, 84, 69, 48, 62, 86, 65, 79, 71],
    Monthly: [58, 72, 49, 83, 65, 91, 74, 55, 68, 80, 62, 77, 89, 52, 69, 75, 60, 84, 71, 66, 90, 59, 82],
    Week: [70, 85, 62, 94, 78, 88, 92, 64, 79, 86, 73, 90, 81, 68, 84, 77, 89, 72, 85, 93, 76, 88, 95]
  };
  const values = datasets[period] || datasets.Year;

  return (
    <div className="customer-bars-container" aria-label="Gráfico de barras de clientes">
      <div className="y-axis-labels">
        <span>800</span>
        <span>600</span>
        <span>400</span>
        <span>200</span>
        <span>0</span>
      </div>
      <div className="chart-grid-lines"><i /><i /><i /><i /><i /></div>
      <div className="bars">
        {values.map((v, i) => (
          <div className="bar-col" key={i} title={`Día ${String(i + 6).padStart(2, '0')}: ${v * 8} clientes`}>
            <span className={i % 4 === 2 ? 'alt-bar' : ''} style={{ height: `${v}%` }} />
          </div>
        ))}
      </div>
      <div className="bars-axis">
        <span>06</span><span>08</span><span>10</span><span>12</span><span>14</span>
        <span>16</span><span>18</span><span>20</span><span>22</span><span>24</span><span>26</span><span>28</span>
      </div>
    </div>
  );
}

function DeliveryMap({ activeCount }) {
  const nodes = [
    [12, 28], [29, 20], [48, 32], [68, 18], [86, 36],
    [78, 66], [56, 78], [34, 70], [16, 58], [44, 52]
  ];
  const edges = [
    [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6],
    [6, 7], [7, 8], [8, 0], [9, 1], [9, 2], [9, 5], [9, 7]
  ];
  return (
    <div className="delivery-map" aria-label="Mapa de entregas en vivo">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none">
        {edges.map(([a, b], i) => (
          <line key={i} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} />
        ))}
        {nodes.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="2.6" />
        ))}
      </svg>
      <div className="delivery-summary">
        <strong>{activeCount} Orders</strong>
        <span>{timePE()} · En ruta</span>
      </div>
    </div>
  );
}

/* ==========================================================================
   VISTA 2: SALÓN, MESAS Y CREADOR DE PEDIDOS POS
   ========================================================================== */

function TablesView({ orders, setOrders, inventory, toast }) {
  const [selected, setSelected] = useState(null);
  const [cart, setCart] = useState([]);
  const [catFilter, setCatFilter] = useState('Todas');
  const [clientName, setClientName] = useState('');

  const tables = Array.from({ length: 8 }, (_, i) => i + 1);
  const categories = ['Todas', ...new Set(inventory.map(p => p.categoria))];
  const tableOrder = (n) => orders.find(o => o.mesa === n && o.estado !== 'Entregado');

  const add = (p) => {
    setCart(c => {
      const found = c.find(x => x.id === p.id);
      return found
        ? c.map(x => x.id === p.id ? { ...x, qty: x.qty + 1 } : x)
        : [...c, { ...p, qty: 1 }];
    });
  };

  const adjustQty = (id, delta) => {
    setCart(c => c.map(x => x.id === id ? { ...x, qty: x.qty + delta } : x).filter(x => x.qty > 0));
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

  return (
    <>
      <div className="section-tools">
        <div>
          <h2>Salón y Mesas (POS)</h2>
          <p>Selecciona cualquier mesa para tomar comanda y enviarla a Cocina en tiempo real.</p>
        </div>
        <span className="legend">
          <span><i className="free" />Libre</span>
          <span><i className="busy" />Ocupada / En Atención</span>
        </span>
      </div>

      <div className="tables-grid">
        {tables.map(n => {
          const o = tableOrder(n);
          return (
            <button
              type="button"
              key={n}
              className={`table-card ${o ? 'busy' : ''}`}
              onClick={() => setSelected(n)}
            >
              <div>
                <strong>Mesa {String(n).padStart(2, '0')}</strong>
                <span className={`status ${o ? statusClass(o.estado) : 'paid'}`}>
                  {o ? o.estado : 'Libre'}
                </span>
              </div>
              <p>{o ? `Pedido #${o.id} · ${o.cliente}` : 'Disponible para asignar comensales'}</p>
              <footer>
                <span>{o ? 'Consumo actual' : 'Capacidad'}</span>
                <b>{o ? money(o.total) : `${[2, 4, 4, 6, 2, 4, 6, 8][n - 1]} personas`}</b>
              </footer>
            </button>
          );
        })}
      </div>

      {selected && (
        <div className="modal-layer" onMouseDown={() => setSelected(null)}>
          <div className="modal-card order-modal" onMouseDown={e => e.stopPropagation()}>
            <div className="modal-head">
              <div>
                <small>COMANDA POS · SALÓN PRINCIPAL</small>
                <h2>Mesa {String(selected).padStart(2, '0')}</h2>
              </div>
              <button type="button" className="modal-close-btn" onClick={() => setSelected(null)}>×</button>
            </div>
            <div className="order-builder">
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
                  <h3 style={{ margin: 0 }}>Carta Disponible</h3>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    {categories.map(cat => (
                      <button
                        type="button"
                        key={cat}
                        className={`pill-tab ${catFilter === cat ? 'active' : ''}`}
                        onClick={() => setCatFilter(cat)}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="product-pick">
                  {filteredMenu.map(p => (
                    <button type="button" key={p.id} onClick={() => add(p)}>
                      <span>
                        <strong>{p.emoji || '🍽️'} {p.nombre}</strong>
                        <small>{p.categoria} · Stock: {p.stock}</small>
                      </span>
                      <b>{money(p.precio)}</b>
                      <i>+</i>
                    </button>
                  ))}
                </div>
              </div>

              <div className="cart-panel">
                <h3 style={{ marginTop: 0 }}>Detalle de Comanda</h3>
                <label style={{ display: 'grid', gap: '4px', fontSize: '12px', fontWeight: 600, marginBottom: '12px' }}>
                  Cliente / Referencia (opcional)
                  <input
                    value={clientName}
                    onChange={e => setClientName(e.target.value)}
                    placeholder={`Mesa ${String(selected).padStart(2, '0')}`}
                  />
                </label>

                {!cart.length ? (
                  <div className="empty-state">Selecciona platos de la carta para armar el pedido.</div>
                ) : (
                  cart.map(p => (
                    <div className="cart-row" key={p.id}>
                      <span>
                        <strong>{p.nombre}</strong>
                        <small>{money(p.precio)} c/u</small>
                      </span>
                      <div className="qty-controls">
                        <button type="button" onClick={() => adjustQty(p.id, -1)}>−</button>
                        <span style={{ fontSize: '12px', fontWeight: 700, padding: '0 4px' }}>{p.qty}</span>
                        <button type="button" onClick={() => adjustQty(p.id, 1)}>+</button>
                      </div>
                      <b>{money(p.qty * p.precio)}</b>
                      <button
                        type="button"
                        style={{ border: 0, background: 'transparent', color: 'var(--danger)', fontSize: '18px' }}
                        onClick={() => setCart(cart.filter(x => x.id !== p.id))}
                      >
                        ×
                      </button>
                    </div>
                  ))
                )}

                <div className="cart-total">
                  <span>Total a comandar</span>
                  <strong>{money(total)}</strong>
                </div>

                <button type="button" className="primary" style={{ width: '100%' }} disabled={!cart.length} onClick={sendToKitchen}>
                  Enviar Pedido a Cocina
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* ==========================================================================
   VISTA 3: COCINA (KDS KANBAN)
   ========================================================================== */

function Kitchen({ orders, setOrders, toast }) {
  const states = ['Pendiente', 'En preparación', 'Listo'];

  const advance = (id) => {
    setOrders(orders.map(o => {
      if (o.id !== id) return o;
      const next = o.estado === 'Pendiente' ? 'En preparación' : o.estado === 'En preparación' ? 'Listo' : 'Entregado';
      return { ...o, estado: next };
    }));
    toast('Estado del pedido actualizado en Cocina.');
  };

  return (
    <div className="kanban">
      {states.map(st => {
        const colOrders = orders.filter(o => o.estado === st);
        return (
          <section key={st} className="kanban-col">
            <header>
              <h2>{st}</h2>
              <span>{colOrders.length}</span>
            </header>
            {colOrders.map(o => (
              <article className="kitchen-ticket" key={o.id}>
                <div>
                  <strong>Mesa {String(o.mesa).padStart(2, '0')} · {o.cliente}</strong>
                  <small>{o.hora}</small>
                </div>
                <p style={{ margin: '4px 0', fontSize: '12px', color: 'var(--primary)', fontWeight: 600 }}>
                  Pedido #{o.id} ({money(o.total)})
                </p>
                <ul>
                  {o.items.map((x, i) => <li key={i}>{x}</li>)}
                </ul>
                <button type="button" className="primary" onClick={() => advance(o.id)}>
                  {st === 'Pendiente' ? 'Comenzar Preparación' : st === 'En preparación' ? 'Marcar Listo para Servir' : 'Entregar a Mesa / Caja'}
                </button>
              </article>
            ))}
            {!colOrders.length && <div className="empty-state">Sin comandas en estado &ldquo;{st}&rdquo;.</div>}
          </section>
        );
      })}
    </div>
  );
}

/* ==========================================================================
   VISTA 4: CAJA Y COBROS ACUMULADOS
   ========================================================================== */

function Cashier({ orders, setOrders, payments, setPayments, toast, go }) {
  const billable = orders.filter(o => o.estado === 'Entregado' || o.estado === 'Listo');
  const [methods, setMethods] = useState({});

  const registerPayment = (order) => {
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

  return (
    <>
      <div className="section-tools">
        <div>
          <h2>Terminal de Caja y Liquidación</h2>
          <p>Cada cobro registrado libera la mesa automáticamente y se suma al historial acumulado del día.</p>
        </div>
        <button type="button" className="secondary" onClick={() => go('resumen')}>
          Ver Resumen del Día →
        </button>
      </div>

      <div className="cards-grid">
        {billable.map(o => (
          <article className="cash-card" key={o.id}>
            <div className="cash-head">
              <div>
                <small style={{ color: 'var(--muted)', fontWeight: 700 }}>CUENTA LISTA</small>
                <h2 style={{ margin: '4px 0 12px' }}>Mesa {String(o.mesa).padStart(2, '0')}</h2>
              </div>
              <span className={`status ${statusClass(o.estado)}`}>Pedido #{o.id}</span>
            </div>
            <div style={{ marginBottom: '10px' }}>
              {o.items.map((x, i) => (
                <div key={i} style={{ padding: '7px 0', borderBottom: '1px solid var(--line-soft)', fontSize: '12.5px' }}>
                  {x}
                </div>
              ))}
            </div>
            <div className="cash-total">
              <span>Total a cobrar</span>
              <strong>{money(o.total)}</strong>
            </div>
            <select
              value={methods[o.id] || 'Yape'}
              onChange={e => setMethods({ ...methods, [o.id]: e.target.value })}
            >
              <option value="Yape">Yape</option>
              <option value="Plin">Plin</option>
              <option value="Efectivo">Efectivo</option>
              <option value="Tarjeta">Tarjeta Visa / Mastercard</option>
            </select>
            <button type="button" className="primary" onClick={() => registerPayment(o)}>
              Registrar Cobro y Liberar Mesa
            </button>
          </article>
        ))}

        {!billable.length && (
          <div className="panel empty-state wide">
            No hay cuentas pendientes de cobro en este momento. Avanza un pedido a &ldquo;Listo&rdquo; o &ldquo;Entregado&rdquo; desde Cocina.
          </div>
        )}
      </div>
    </>
  );
}

/* ==========================================================================
   VISTA 5: RESUMEN DEL DÍA + MODAL DE REINICIO DIARIO ("REINICIAR DÍA")
   ========================================================================== */

function Summary({ orders, inventory, payments = [], setPayments, toast }) {
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

  return (
    <>
      <section className="stats-grid">
        <StatCard label="Cobrado Hoy" value={money(totalToday)} detail="Suma acumulada en Caja hoy" icon="dollar" percent={88} />
        <StatCard label="Cobros del Día" value={todayPayments.length} detail="Transacciones liquidadas" icon="orders" percent={72} />
        <StatCard label="Pedidos Activos" value={orders.length} detail={`${money(currentOrdersTotal)} en atención`} icon="cup" percent={64} />
        <StatCard label="Unidades en Stock" value={inventory.reduce((s, p) => s + p.stock, 0)} detail="Disponibles en almacén" icon="inventory" percent={79} />
      </section>

      <div className="panel">
        <div className="summary-toolbar">
          <div className="panel-title" style={{ marginBottom: 0 }}>
            <div>
              <h2>Cobros Acumulados de Hoy ({today})</h2>
              <p>Cada pago registrado en Caja se conserva aquí aunque la mesa sea liberada.</p>
            </div>
          </div>

          <div className="summary-actions">
            <button
              type="button"
              className="danger"
              onClick={() => setConfirmOpen(true)}
              disabled={!todayPayments.length}
              title="Borrar el acumulado del día actual y empezar desde S/ 0.00"
            >
              <SvgIcon name="trash" size={16} />
              Reiniciar día
            </button>
          </div>
        </div>

        {todayPayments.length ? (
          <div className="table-scroll">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Pedido</th>
                  <th>Mesa / Cliente</th>
                  <th>Hora</th>
                  <th>Método de Pago</th>
                  <th>Total Cobrado</th>
                </tr>
              </thead>
              <tbody>
                {todayPayments.map(p => (
                  <tr key={p.id}>
                    <td><strong>#{p.pedidoId}</strong></td>
                    <td>Mesa {String(p.mesa).padStart(2, '0')} {p.cliente ? `· ${p.cliente}` : ''}</td>
                    <td>{p.hora}</td>
                    <td><span className="status ready">{p.metodo}</span></td>
                    <td><strong>{money(p.total)}</strong></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="empty-state">
            El resumen del día está en <strong>S/ 0.00</strong>. Registra un cobro en Caja para comenzar a acumular ventas.
          </div>
        )}
      </div>

      {confirmOpen && (
        <div className="modal-layer" onMouseDown={() => setConfirmOpen(false)}>
          <div className="modal-card confirm-dialog" onMouseDown={e => e.stopPropagation()}>
            <h3 style={{ margin: '0 0 8px', fontSize: '18px' }}>¿Iniciar un nuevo día operativo?</h3>
            <p style={{ margin: '0 0 20px', color: 'var(--muted)', fontSize: '13px', lineHeight: 1.55 }}>
              Se borrarán del resumen los <strong>{todayPayments.length} cobros acumulados de hoy ({money(totalToday)})</strong> y el contador diario volverá a <strong>S/ 0.00</strong>. Los pedidos activos y el inventario no se modificarán.
            </p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button type="button" className="secondary" onClick={() => setConfirmOpen(false)}>
                Cancelar
              </button>
              <button type="button" className="danger" onClick={confirmResetDay}>
                Sí, reiniciar a S/ 0.00
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* ==========================================================================
   VISTAS 6 Y 7: ORDERS (PEDIDOS) & ORDER DETAILS (DETALLE DEL PEDIDO)
   ========================================================================== */

function Orders({ orders, setOrders, setSelectedOrderId, go, toast }) {
  const [filter, setFilter] = useState('Todos');
  const visible = filter === 'Todos' ? orders : orders.filter(o => o.estado === filter);

  const remove = (id) => {
    setOrders(orders.filter(o => o.id !== id));
    toast(`Pedido #${id} eliminado.`);
  };

  return (
    <div className="panel">
      <div className="list-toolbar">
        <div>
          <h2>Order List · Gestión de Pedidos</h2>
          <p>Haz clic en cualquier pedido para abrir su seguimiento detallado (Order Details).</p>
        </div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {['Todos', 'Pendiente', 'En preparación', 'Listo', 'Entregado'].map(st => (
            <button
              type="button"
              key={st}
              className={`pill-tab ${filter === st ? 'active' : ''}`}
              onClick={() => setFilter(st)}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      <div className="table-scroll">
        <table className="data-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Cliente</th>
              <th>Mesa / Destino</th>
              <th>Hora</th>
              <th>Estado</th>
              <th>Total</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {visible.map(o => (
              <tr key={o.id}>
                <td>
                  <button
                    type="button"
                    style={{ border: 0, background: 'transparent', color: 'var(--primary)', fontWeight: 700, padding: 0 }}
                    onClick={() => { setSelectedOrderId(o.id); go('detalle-pedido'); }}
                  >
                    #{o.id}
                  </button>
                </td>
                <td><strong>{o.cliente}</strong></td>
                <td>Mesa {String(o.mesa).padStart(2, '0')}</td>
                <td>{o.hora}</td>
                <td><span className={`status ${statusClass(o.estado)}`}>{o.estado}</span></td>
                <td><strong>{money(o.total)}</strong></td>
                <td className="actions">
                  <button type="button" onClick={() => { setSelectedOrderId(o.id); go('detalle-pedido'); }} title="Ver detalle">
                    <SvgIcon name="search" size={15} />
                  </button>
                  <button type="button" className="danger-icon" onClick={() => remove(o.id)} title="Eliminar">
                    <SvgIcon name="trash" size={15} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const statusClass = st =>
  st === 'Pendiente' ? 'pending' : st === 'En preparación' ? 'progress' : st === 'Listo' ? 'ready' : 'paid';

function OrderDetail({ orders, selectedOrderId, setSelectedOrderId }) {
  const o = orders.find(x => x.id === selectedOrderId) || orders[0];
  if (!o) return <div className="panel empty-state">No hay pedidos activos para mostrar.</div>;

  const stepIndex = o.estado === 'Pendiente' ? 1 : o.estado === 'En preparación' ? 2 : o.estado === 'Listo' ? 3 : 4;
  const steps = ['Pedido recibido', 'Confirmado por cocina', 'En preparación culinaria', 'Listo para servir / despacho', 'Entregado al cliente'];

  return (
    <>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
        {orders.map(ord => (
          <button
            type="button"
            key={ord.id}
            className={`pill-tab ${ord.id === o.id ? 'active' : ''}`}
            onClick={() => setSelectedOrderId(ord.id)}
          >
            Pedido #{ord.id} · Mesa {ord.mesa}
          </button>
        ))}
      </div>

      <div className="detail-layout">
        <article className="panel">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid var(--line)', paddingBottom: '16px', marginBottom: '16px' }}>
            <div>
              <small style={{ color: 'var(--primary)', fontWeight: 700 }}>ORDER DETAILS · #{o.id}</small>
              <h2 style={{ margin: '4px 0' }}>{o.cliente} — Mesa {String(o.mesa).padStart(2, '0')}</h2>
              <p style={{ margin: 0, color: 'var(--muted)', fontSize: '12.5px' }}>{o.direccion || 'Salón Principal'} · Creado a las {o.hora}</p>
            </div>
            <span className={`status ${statusClass(o.estado)}`}>{o.estado}</span>
          </div>

          <h3 style={{ fontSize: '14px', marginBottom: '10px' }}>Ítems de la Comanda</h3>
          {o.items.map((x, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '11px 0', borderBottom: '1px solid var(--line-soft)', fontSize: '13px' }}>
              <strong>{x}</strong>
              <span style={{ color: 'var(--success)', fontWeight: 600 }}>Confirmado</span>
            </div>
          ))}

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '18px', paddingTop: '14px' }}>
            <span style={{ fontSize: '14px', fontWeight: 600 }}>Total de la Orden</span>
            <strong style={{ fontSize: '24px', color: 'var(--primary)' }}>{money(o.total)}</strong>
          </div>
        </article>

        <aside className="panel">
          <h2 style={{ marginTop: 0, fontSize: '17px' }}>Order Tracking · Seguimiento</h2>
          <div style={{ display: 'grid', gap: '12px', marginTop: '14px' }}>
            {steps.map((label, i) => {
              const done = i <= stepIndex;
              return (
                <div key={label} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <span style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    display: 'grid',
                    placeItems: 'center',
                    background: done ? 'var(--primary)' : 'var(--surface-3)',
                    color: done ? '#fff' : 'var(--muted)',
                    fontWeight: 700,
                    fontSize: '12px'
                  }}>
                    {done ? '✓' : i + 1}
                  </span>
                  <div>
                    <strong style={{ display: 'block', fontSize: '13px' }}>{label}</strong>
                    <small style={{ color: 'var(--muted)', fontSize: '11px' }}>{done ? 'Completado' : 'En espera'}</small>
                  </div>
                </div>
              );
            })}
          </div>
        </aside>
      </div>
    </>
  );
}

/* ==========================================================================
   VISTAS 8, 9, 10, 11: CLIENTES, ANALÍTICA, RESEÑAS Y TAREAS (TASK)
   ========================================================================== */

function Customers({ customers = [], setCustomers, toast }) {
  const [nombre, setNombre] = useState('');
  const [tipo, setTipo] = useState('MEMBER');
  const [ubicacion, setUbicacion] = useState('');

  const addCustomer = (e) => {
    e.preventDefault();
    if (!nombre.trim()) return;
    setCustomers([
      { id: uid(), nombre: nombre.trim(), pedidos: 1, gasto: 45, tipo, ubicacion: ubicacion.trim() || 'Trujillo, Perú' },
      ...customers
    ]);
    setNombre('');
    setUbicacion('');
    toast('Nuevo cliente registrado en la base de fidelización.');
  };

  return (
    <div className="inventory-layout">
      <div className="panel">
        <div className="panel-title">
          <div>
            <h2>Directorio de Clientes</h2>
            <p>{customers.length} clientes registrados en el programa Lezato</p>
          </div>
        </div>
        <div className="customer-grid" style={{ gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' }}>
          {customers.map(c => (
            <article className="customer-card" key={c.id}>
              <span className="avatar big">{c.nombre.split(' ').map(x => x[0]).join('').slice(0, 2)}</span>
              <h3 style={{ margin: '8px 0 4px', fontSize: '15px' }}>{c.nombre}</h3>
              <p style={{ margin: '0 0 8px', fontSize: '11.5px', color: 'var(--muted)' }}>{c.ubicacion}</p>
              <span className={`member-badge ${c.tipo === 'MEMBER' ? 'vip' : 'regular'}`}>{c.tipo}</span>
              <div style={{ display: 'flex', justifyContent: 'space-around', borderTop: '1px solid var(--line)', paddingTop: '12px', marginTop: '14px' }}>
                <span><small style={{ display: 'block', color: 'var(--muted)', fontSize: '10px' }}>Pedidos</small><strong>{c.pedidos}</strong></span>
                <span><small style={{ display: 'block', color: 'var(--muted)', fontSize: '10px' }}>Gasto Total</small><strong>{money(c.gasto)}</strong></span>
              </div>
            </article>
          ))}
        </div>
      </div>

      <aside className="panel inventory-form">
        <h2>Registrar Cliente</h2>
        <p style={{ color: 'var(--muted)', fontSize: '12px' }}>Agrega comensales al programa VIP o Regular.</p>
        <form onSubmit={addCustomer}>
          <label>Nombre completo<input value={nombre} onChange={e => setNombre(e.target.value)} placeholder="Ej. Valeria Mendoza" /></label>
          <label>Categoría Lezato
            <select value={tipo} onChange={e => setTipo(e.target.value)}>
              <option value="MEMBER">MEMBER (VIP)</option>
              <option value="Regular Customer">Regular Customer</option>
            </select>
          </label>
          <label>Dirección / Zona<input value={ubicacion} onChange={e => setUbicacion(e.target.value)} placeholder="Ej. Av. Larco 850, Trujillo" /></label>
          <button type="submit" className="primary">Agregar Cliente</button>
        </form>
      </aside>
    </div>
  );
}

function Analytics() {
  return (
    <>
      <section className="stats-grid">
        <StatCard label="Conversión de Carta" value="68.4%" detail="+4.2 pts este mes" icon="charts" percent={68} />
        <StatCard label="Ticket Promedio" value="S/ 38.50" detail="+S/ 3.10 vs semana ant." icon="dollar" percent={76} />
        <StatCard label="Tiempo en Cocina" value="16 min" detail="-2 min optimizado" icon="cup" percent={84} />
        <StatCard label="Satisfacción CSAT" value="4.8 / 5" detail="164 reseñas verificadas" icon="users" percent={94} />
      </section>
      <div className="analytics-grid">
        <div className="panel">
          <div className="panel-title"><div><h2>Ventas Semanales por Día</h2><p>Comparativa de ingresos últimos 7 días</p></div></div>
          <BarChart />
        </div>
        <div className="panel">
          <div className="panel-title"><div><h2>Distribución por Canal</h2><p>Salón vs Delivery vs Recojo</p></div></div>
          <Donut />
        </div>
      </div>
    </>
  );
}

function Reviews({ toast }) {
  const [reviews, setReviews] = useState([
    { id: 1, autor: 'Lucía Paredes', comentario: 'Excelente sazón en el lomo saltado y atención muy rápida.', rating: 5, fecha: 'Hace 25 min' },
    { id: 2, autor: 'Jorge Miranda', comentario: 'El ceviche llegó fresco y bien presentado en delivery.', rating: 5, fecha: 'Hace 1 hora' },
    { id: 3, autor: 'Rosa Castañeda', comentario: 'Ambiente cómodo y el pago con Yape en caja fue inmediato.', rating: 4, fecha: 'Hoy' },
  ]);
  const [autor, setAutor] = useState('');
  const [comentario, setComentario] = useState('');

  const addReview = (e) => {
    e.preventDefault();
    if (!autor.trim() || !comentario.trim()) return;
    setReviews([{ id: uid(), autor: autor.trim(), comentario: comentario.trim(), rating: 5, fecha: 'Ahora' }, ...reviews]);
    setAutor('');
    setComentario('');
    toast('Reseña publicada correctamente.');
  };

  return (
    <div className="inventory-layout">
      <div className="panel">
        <div className="panel-title"><div><h2>Customer Reviews · Reseñas</h2><p>Valoraciones reales de nuestros comensales</p></div></div>
        {reviews.map(r => (
          <article key={r.id} style={{ display: 'grid', gridTemplateColumns: '44px 1fr auto', gap: '12px', padding: '14px 0', borderBottom: '1px solid var(--line-soft)' }}>
            <span className="avatar">{r.autor[0]}</span>
            <div>
              <strong>{r.autor}</strong>
              <div style={{ color: '#F59E0B', fontSize: '13px' }}>{'★★★★★'.slice(0, r.rating)}</div>
              <p style={{ margin: '4px 0 0', color: 'var(--muted)', fontSize: '12.5px' }}>{r.comentario}</p>
            </div>
            <small style={{ color: 'var(--muted)' }}>{r.fecha}</small>
          </article>
        ))}
      </div>
      <aside className="panel inventory-form">
        <h2>Registrar Opinión</h2>
        <form onSubmit={addReview}>
          <label>Cliente<input value={autor} onChange={e => setAutor(e.target.value)} placeholder="Nombre del comensal" /></label>
          <label>Comentario<textarea rows="4" value={comentario} onChange={e => setComentario(e.target.value)} placeholder="Escribe la reseña..." /></label>
          <button type="submit" className="primary">Publicar Reseña</button>
        </form>
      </aside>
    </div>
  );
}

function TasksView({ tasks = [], setTasks, toast }) {
  const [texto, setTexto] = useState('');
  const toggle = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completada: !t.completada } : t));
  };
  const add = (e) => {
    e.preventDefault();
    if (!texto.trim()) return;
    setTasks([{ id: uid(), texto: texto.trim(), completada: false, area: 'Operaciones' }, ...tasks]);
    setTexto('');
    toast('Tarea operativa agregada.');
  };
  return (
    <div className="inventory-layout">
      <div className="panel">
        <div className="panel-title"><div><h2>Task · Checklist Operativo del Turno</h2><p>Control de apertura, cocina y cierre de caja</p></div></div>
        {tasks.map(t => (
          <div key={t.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid var(--line-soft)' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontWeight: 500 }}>
              <input type="checkbox" checked={t.completada} onChange={() => toggle(t.id)} style={{ minHeight: 'unset', width: '18px', height: '18px' }} />
              <span style={{ textDecoration: t.completada ? 'line-through' : 'none', color: t.completada ? 'var(--muted)' : 'var(--text-strong)' }}>{t.texto}</span>
            </label>
            <span className="status ready">{t.area}</span>
          </div>
        ))}
      </div>
      <aside className="panel inventory-form">
        <h2>Nueva Tarea</h2>
        <form onSubmit={add}>
          <label>Descripción de la tarea<input value={texto} onChange={e => setTexto(e.target.value)} placeholder="Ej. Revisar temperatura de cámaras" /></label>
          <button type="submit" className="primary">Añadir Tarea</button>
        </form>
      </aside>
    </div>
  );
}

/* ==========================================================================
   VISTAS 12, 13, 14: INVENTARIO (PRODUCTOS, CATEGORÍAS, MOVIMIENTOS)
   ========================================================================== */

function Inventory({ inventory, setInventory, toast }) {
  const blank = { nombre: '', categoria: 'Platos', stock: 15, minimo: 5, precio: 20, emoji: '🍽️' };
  const [form, setForm] = useState(blank);
  const [editing, setEditing] = useState(null);
  const [query, setQuery] = useState('');

  const save = (e) => {
    e.preventDefault();
    if (!form.nombre.trim()) return;
    if (editing) {
      setInventory(inventory.map(p => p.id === editing ? { ...form, id: editing } : p));
      toast('Producto actualizado en la carta.');
    } else {
      setInventory([...inventory, { ...form, id: uid(), vendidos: 12 }]);
      toast('Nuevo producto incorporado al inventario.');
    }
    setForm(blank);
    setEditing(null);
  };

  const edit = (p) => { setEditing(p.id); setForm({ ...p }); };
  const remove = (id) => { setInventory(inventory.filter(p => p.id !== id)); toast('Producto eliminado del inventario.'); };
  const list = inventory.filter(p => p.nombre.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="inventory-layout">
      <section className="panel">
        <div className="list-toolbar">
          <div>
            <h2>Inventario de Productos y Carta</h2>
            <p>{inventory.length} ítems activos sincronizados con Salón y Dashboard.</p>
          </div>
          <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Buscar plato o bebida..." style={{ maxWidth: '240px' }} />
        </div>
        <div className="table-scroll">
          <table className="data-table">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Categoría</th>
                <th>Stock</th>
                <th>Mínimo</th>
                <th>Precio</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {list.map(p => (
                <tr key={p.id}>
                  <td><strong>{p.emoji || '🍽️'} {p.nombre}</strong></td>
                  <td>{p.categoria}</td>
                  <td><span className={`stock-badge ${p.stock <= p.minimo ? 'low' : ''}`}>{p.stock}</span></td>
                  <td>{p.minimo}</td>
                  <td><strong>{money(p.precio)}</strong></td>
                  <td className="actions">
                    <button type="button" onClick={() => edit(p)} title="Editar"><SvgIcon name="edit" size={15} /></button>
                    <button type="button" className="danger-icon" onClick={() => remove(p.id)} title="Eliminar"><SvgIcon name="trash" size={15} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <aside className="panel inventory-form">
        <h2>{editing ? 'Editar Producto' : 'Nuevo Producto'}</h2>
        <p style={{ color: 'var(--muted)', fontSize: '12px' }}>Los cambios se guardan automáticamente en el navegador.</p>
        <form onSubmit={save}>
          <label>Nombre del plato / producto<input value={form.nombre} onChange={e => setForm({ ...form, nombre: e.target.value })} placeholder="Ej. Chaufa de mariscos" /></label>
          <div className="form-grid">
            <label>Categoría
              <select value={form.categoria} onChange={e => setForm({ ...form, categoria: e.target.value })}>
                <option>Platos</option>
                <option>Entradas</option>
                <option>Bebidas</option>
                <option>Postres</option>
                <option>Insumos</option>
              </select>
            </label>
            <label>Icono / Emoji<input value={form.emoji || '🍽️'} onChange={e => setForm({ ...form, emoji: e.target.value })} /></label>
          </div>
          <div className="form-grid">
            <label>Stock Actual<input type="number" min="0" value={form.stock} onChange={e => setForm({ ...form, stock: +e.target.value })} /></label>
            <label>Stock Mínimo<input type="number" min="0" value={form.minimo} onChange={e => setForm({ ...form, minimo: +e.target.value })} /></label>
          </div>
          <label>Precio de Venta (S/)<input type="number" min="0" step="0.1" value={form.precio} onChange={e => setForm({ ...form, precio: +e.target.value })} /></label>
          <button className="primary" type="submit">{editing ? 'Guardar Cambios' : 'Agregar a la Carta'}</button>
          {editing && <button type="button" className="secondary" onClick={() => { setEditing(null); setForm(blank); }}>Cancelar</button>}
        </form>
      </aside>
    </div>
  );
}

function Categories({ inventory, setInventory, toast }) {
  const categories = [...new Set(inventory.map(x => x.categoria))];
  const [name, setName] = useState('');
  const add = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    setInventory([...inventory, { id: uid(), nombre: `Especialidad (${name.trim()})`, categoria: name.trim(), stock: 10, minimo: 5, precio: 18, emoji: '✨' }]);
    setName('');
    toast('Categoría creada con un producto base editable.');
  };
  return (
    <div className="split-grid">
      <section className="panel">
        <div className="panel-title"><div><h2>Categorías de Carta e Inventario</h2><p>Organización activa por familias</p></div></div>
        {categories.map(c => (
          <div key={c} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid var(--line-soft)' }}>
            <strong>{c}</strong>
            <span className="status ready">{inventory.filter(x => x.categoria === c).length} productos</span>
          </div>
        ))}
      </section>
      <aside className="panel inventory-form">
        <h2>Crear Categoría</h2>
        <form onSubmit={add}>
          <label>Nombre de la categoría<input value={name} onChange={e => setName(e.target.value)} placeholder="Ej. Parrillas / Coctelería" /></label>
          <button type="submit" className="primary">Agregar Categoría</button>
        </form>
      </aside>
    </div>
  );
}

function Movements({ inventory, setInventory, toast }) {
  const [id, setId] = useState(inventory[0]?.id || '');
  const [qty, setQty] = useState(5);
  const [type, setType] = useState('entrada');

  const apply = (e) => {
    e.preventDefault();
    const n = Number(qty);
    setInventory(inventory.map(p => p.id === Number(id) ? { ...p, stock: Math.max(0, p.stock + (type === 'entrada' ? n : -n)) } : p));
    toast(`Movimiento de ${type} (+${n}) aplicado correctamente.`);
  };

  return (
    <div className="split-grid">
      <section className="panel">
        <div className="panel-title"><div><h2>Niveles de Stock en Almacén</h2><p>Monitoreo preventivo de reposición</p></div></div>
        <div style={{ display: 'grid', gap: '12px' }}>
          {inventory.map(p => (
            <div key={p.id} style={{ display: 'grid', gridTemplateColumns: '180px 1fr 44px', alignItems: 'center', gap: '12px' }}>
              <div>
                <strong style={{ fontSize: '12.5px', display: 'block' }}>{p.nombre}</strong>
                <small style={{ color: 'var(--muted)', fontSize: '10.5px' }}>{p.categoria}</small>
              </div>
              <div className="keyword-progress-track">
                <div className="keyword-progress-fill" style={{ width: `${Math.min(100, (p.stock / 50) * 100)}%` }} />
              </div>
              <b style={{ textAlign: 'right' }}>{p.stock}</b>
            </div>
          ))}
        </div>
      </section>
      <aside className="panel inventory-form">
        <h2>Registrar Entrada / Salida</h2>
        <form onSubmit={apply}>
          <label>Producto
            <select value={id} onChange={e => setId(e.target.value)}>
              {inventory.map(p => <option key={p.id} value={p.id}>{p.nombre} (Stock: {p.stock})</option>)}
            </select>
          </label>
          <label>Tipo de Movimiento
            <select value={type} onChange={e => setType(e.target.value)}>
              <option value="entrada">Entrada de Almacén (+)</option>
              <option value="salida">Salida / Merma (−)</option>
            </select>
          </label>
          <label>Cantidad<input type="number" min="1" value={qty} onChange={e => setQty(e.target.value)} /></label>
          <button type="submit" className="primary">Aplicar Movimiento</button>
        </form>
      </aside>
    </div>
  );
}

/* ==========================================================================
   VISTAS COMPLEMENTARIAS: GRÁFICOS, FORMULARIOS, TABLAS Y PERSONALIZADOS
   ========================================================================== */

function Charts({ type }) {
  return (
    <div className="analytics-grid" style={{ gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' }}>
      <div className="panel">
        <div className="panel-title"><div><h2>{type === 'flot' ? 'Gráfico Flot · Rendimiento' : 'Desempeño por Canal'}</h2><p>Actividad semanal consolidada</p></div></div>
        <BarChart />
      </div>
      <div className="panel">
        <div className="panel-title"><div><h2>Curva de Ingresos Horarios</h2><p>Tendencia operativa</p></div></div>
        <AreaWaveChart />
      </div>
      <div className="panel">
        <div className="panel-title"><div><h2>Participación de Canales</h2><p>Salón, Delivery y Recojo</p></div></div>
        <Donut />
      </div>
      <div className="panel">
        <div className="panel-title"><div><h2>Customer Map Compacto</h2><p>Densidad mensual</p></div></div>
        <CustomerBars period="Monthly" />
      </div>
    </div>
  );
}

function BarChart() {
  const vals = [48, 72, 54, 86, 65, 94, 80];
  const days = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
  return (
    <div className="bar-chart">
      {vals.map((v, i) => (
        <div key={days[i]}>
          <i style={{ height: `${v}%` }} />
          <span style={{ fontSize: '11px', color: 'var(--muted)' }}>{days[i]}</span>
        </div>
      ))}
    </div>
  );
}

function Donut() {
  return (
    <div className="donut-wrap">
      <div className="donut"><span>68%</span></div>
      <div style={{ display: 'grid', gap: '8px', fontSize: '12.5px' }}>
        <div><span style={{ color: 'var(--primary)', fontWeight: 700 }}>●</span> Salón Principal <b>46%</b></div>
        <div><span style={{ color: 'var(--accent)', fontWeight: 700 }}>●</span> Delivery Propio <b>33%</b></div>
        <div><span style={{ color: 'var(--purple)', fontWeight: 700 }}>●</span> Recojo en Tienda <b>21%</b></div>
      </div>
    </div>
  );
}

function Forms({ toast }) {
  const [step, setStep] = useState(1);
  return (
    <div className="panel" style={{ maxWidth: '760px' }}>
      <div className="panel-title"><div><h2>Asistente de Configuración del Restaurante</h2><p>Paso {step} de 3</p></div></div>
      <div style={{ display: 'grid', gap: '12px' }}>
        {step === 1 && (
          <>
            <label style={{ display: 'grid', gap: '6px', fontWeight: 600 }}>Nombre Comercial<input defaultValue="Lezato · MenuDe-Prueba" /></label>
            <label style={{ display: 'grid', gap: '6px', fontWeight: 600 }}>RUC / Identificación Fiscal<input defaultValue="20609874512" /></label>
          </>
        )}
        {step === 2 && (
          <>
            <label style={{ display: 'grid', gap: '6px', fontWeight: 600 }}>Moneda Principal<select><option>Soles Peruanos (PEN - S/)</option><option>Dólares (USD - $)</option></select></label>
            <label style={{ display: 'grid', gap: '6px', fontWeight: 600 }}>Zona Horaria<input defaultValue="America/Lima (UTC-5)" /></label>
          </>
        )}
        {step === 3 && (
          <div className="empty-state">Parámetros verificados y listos para guardar en el sistema.</div>
        )}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
          <button type="button" className="secondary" disabled={step === 1} onClick={() => setStep(step - 1)}>Anterior</button>
          {step < 3 ? (
            <button type="button" className="primary" onClick={() => setStep(step + 1)}>Siguiente</button>
          ) : (
            <button type="button" className="primary" onClick={() => toast('Configuración guardada correctamente.')}>Guardar Configuración</button>
          )}
        </div>
      </div>
    </div>
  );
}

function DataTables({ inventory }) {
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('nombre');
  const rows = [...inventory]
    .filter(x => x.nombre.toLowerCase().includes(query.toLowerCase()))
    .sort((a, b) => String(a[sort]).localeCompare(String(b[sort]), 'es', { numeric: true }));

  return (
    <div className="panel">
      <div className="list-toolbar">
        <div><h2>Data Table · Consulta Rápida</h2><p>Haz clic en los encabezados para ordenar columnas.</p></div>
        <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Filtrar tabla..." style={{ maxWidth: '240px' }} />
      </div>
      <div className="table-scroll">
        <table className="data-table">
          <thead>
            <tr>
              <th onClick={() => setSort('nombre')} style={{ cursor: 'pointer' }}>Producto ↕</th>
              <th onClick={() => setSort('categoria')} style={{ cursor: 'pointer' }}>Categoría ↕</th>
              <th onClick={() => setSort('stock')} style={{ cursor: 'pointer' }}>Stock ↕</th>
              <th onClick={() => setSort('precio')} style={{ cursor: 'pointer' }}>Precio ↕</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(p => (
              <tr key={p.id}>
                <td><strong>{p.emoji} {p.nombre}</strong></td>
                <td>{p.categoria}</td>
                <td>{p.stock}</td>
                <td><strong>{money(p.precio)}</strong></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function CustomPage({ active, customLinks, setCustomLinks, toast }) {
  const item = customLinks.find(x => x.key === active);
  const [note, setNote] = usePersistentState(`nota-${active}`, '');
  if (!item) return <div className="panel empty-state">Este submenú personalizado ya no existe.</div>;
  return (
    <div className="panel custom-page" style={{ maxWidth: '820px' }}>
      <div className="panel-title"><div><h2>{item.label}</h2><p>Módulo personalizado persistente</p></div></div>
      <label>
        Notas y registros de {item.label}
        <textarea rows="7" value={note} onChange={e => setNote(e.target.value)} placeholder="Escribe notas operativas, proveedores o recordatorios de esta sección..." />
      </label>
      <div style={{ display: 'flex', gap: '10px', marginTop: '14px' }}>
        <button type="button" className="primary" onClick={() => toast('Contenido guardado en el navegador.')}>Guardar</button>
        <button type="button" className="danger" onClick={() => setCustomLinks(customLinks.filter(x => x.key !== active))}>Eliminar submenú</button>
      </div>
    </div>
  );
}
