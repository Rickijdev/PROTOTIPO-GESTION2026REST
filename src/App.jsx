import React, { useEffect, useMemo, useState } from 'react';

const money = (value) => new Intl.NumberFormat('es-PE', {
  style: 'currency', currency: 'PEN'
}).format(value);

const uid = () => Date.now() + Math.floor(Math.random() * 10000);

const dayKey = (date = new Date()) => new Intl.DateTimeFormat('sv-SE', {
  timeZone: 'America/Lima', year: 'numeric', month: '2-digit', day: '2-digit'
}).format(date);

const timePE = (date = new Date()) => new Intl.DateTimeFormat('es-PE', {
  timeZone: 'America/Lima', hour: '2-digit', minute: '2-digit'
}).format(date);

const Icon = ({ name }) => {
  const icons = {
    home: '⌂', orders: '▤', detail: '⌕', users: '♙', analytics: '◫', star: '☆',
    table: '▦', kitchen: '♨', cash: '◉', summary: '◧', inventory: '▣',
    products: '◇', categories: '◈', movement: '⇄', charts: '⌁', forms: '✎',
    data: '▥', plus: '+', minus: '−', bell: '○', search: '⌕', menu: '☰',
    chevron: '›', close: '×', box: '□', check: '✓', trash: '⌫', edit: '✎'
  };
  return <span className="icon" aria-hidden="true">{icons[name] || '•'}</span>;
};

const initialInventory = [
  { id: 1, nombre: 'Lomo saltado', categoria: 'Platos', stock: 28, minimo: 8, precio: 28.00 },
  { id: 2, nombre: 'Ají de gallina', categoria: 'Platos', stock: 22, minimo: 8, precio: 22.00 },
  { id: 3, nombre: 'Arroz con pollo', categoria: 'Platos', stock: 18, minimo: 8, precio: 20.00 },
  { id: 4, nombre: 'Ceviche clásico', categoria: 'Platos', stock: 14, minimo: 6, precio: 30.00 },
  { id: 5, nombre: 'Hamburguesa de la casa', categoria: 'Platos', stock: 31, minimo: 10, precio: 18.00 },
  { id: 6, nombre: 'Porción de papas', categoria: 'Entradas', stock: 34, minimo: 10, precio: 10.00 },
  { id: 7, nombre: 'Papa a la huancaína', categoria: 'Entradas', stock: 12, minimo: 6, precio: 12.00 },
  { id: 8, nombre: 'Limonada', categoria: 'Bebidas', stock: 40, minimo: 12, precio: 7.00 },
  { id: 9, nombre: 'Chicha morada', categoria: 'Bebidas', stock: 38, minimo: 12, precio: 6.00 },
  { id: 10, nombre: 'Gaseosa personal', categoria: 'Bebidas', stock: 50, minimo: 15, precio: 5.00 },
  { id: 11, nombre: 'Arroz con leche', categoria: 'Postres', stock: 11, minimo: 5, precio: 8.00 },
  { id: 12, nombre: 'Torta de chocolate', categoria: 'Postres', stock: 8, minimo: 5, precio: 10.00 },
];

const initialOrders = [
  { id: 1048, mesa: 4, cliente: 'Mesa 04', total: 51, estado: 'En preparación', items: ['1 × Lomo saltado', '1 × Ají de gallina', '1 × Gaseosa personal'], hora: '13:08' },
  { id: 1047, mesa: 2, cliente: 'Mesa 02', total: 37, estado: 'Pendiente', items: ['1 × Ceviche clásico', '1 × Limonada'], hora: '12:54' },
  { id: 1046, mesa: 7, cliente: 'Mesa 07', total: 46, estado: 'Listo', items: ['2 × Hamburguesa de la casa', '2 × Gaseosa personal'], hora: '12:41' },
  { id: 1045, mesa: 1, cliente: 'Mesa 01', total: 30, estado: 'Entregado', items: ['1 × Arroz con pollo', '1 × Torta de chocolate'], hora: '12:20' },
];

const initialCustomers = [
  { id: 1, nombre: 'María Torres', pedidos: 18, gasto: 742, tipo: 'Frecuente' },
  { id: 2, nombre: 'Diego Ramos', pedidos: 12, gasto: 515, tipo: 'Frecuente' },
  { id: 3, nombre: 'Andrea León', pedidos: 7, gasto: 286, tipo: 'Regular' },
  { id: 4, nombre: 'Carlos Vega', pedidos: 4, gasto: 164, tipo: 'Nuevo' },
];

const NAV = [
  {
    key: 'dashboard', label: 'Dashboard', icon: 'home', children: [
      ['inicio', 'Panel principal'],
      ['mesas', 'Mesas y pedidos'],
      ['cocina', 'Cocina'],
      ['caja', 'Caja'],
      ['resumen', 'Resumen del día'],
      ['pedidos', 'Pedidos'],
      ['detalle-pedido', 'Detalle del pedido'],
      ['clientes', 'Clientes'],
      ['analitica', 'Analítica'],
      ['resenas', 'Reseñas'],
    ]
  },
  {
    key: 'inventario', label: 'Inventario', icon: 'inventory', children: [
      ['inventario-productos', 'Productos'],
      ['inventario-categorias', 'Categorías'],
      ['inventario-movimientos', 'Movimientos'],
    ]
  },
  {
    key: 'graficos', label: 'Gráficos', icon: 'charts', children: [
      ['grafico-flot', 'Flot'],
    ]
  }
];

const PAGE_META = Object.fromEntries(NAV.flatMap(g => g.children.map(([key, label]) => [key, { title: label, group: g.label }])));

function usePersistentState(key, fallback) {
  const [value, setValue] = useState(() => {
    try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; }
  });
  useEffect(() => { localStorage.setItem(key, JSON.stringify(value)); }, [key, value]);
  return [value, setValue];
}

export default function App() {
  const [active, setActive] = useState('inicio');
  const [openGroups, setOpenGroups] = useState({ dashboard: true, inventario: true });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [inventory, setInventory] = usePersistentState('menu-prueba-inventario', initialInventory);
  const [orders, setOrders] = usePersistentState('menu-prueba-pedidos', initialOrders);
  const [payments, setPayments] = usePersistentState('menu-prueba-cobros', []);
  const [customLinks, setCustomLinks] = usePersistentState('menu-prueba-personalizados', []);
  const [toast, setToast] = useState('');

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(''), 2600);
    return () => clearTimeout(t);
  }, [toast]);

  const allPages = useMemo(() => [
    ...NAV.flatMap(g => g.children.map(([key, label]) => ({ key, label, group: g.label }))),
    ...customLinks.map(x => ({ ...x, group: 'Personalizados' }))
  ], [customLinks]);

  const searchResults = search.trim()
    ? allPages.filter(p => p.label.toLowerCase().includes(search.toLowerCase())).slice(0, 7)
    : [];

  const go = (key) => {
    setActive(key);
    setSearch('');
    setSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const meta = PAGE_META[active] || customLinks.find(x => x.key === active) || { title: 'Panel principal', group: 'Dashboard' };

  return (
    <div className="app-shell">
      <Sidebar active={active} go={go} openGroups={openGroups} setOpenGroups={setOpenGroups}
        open={sidebarOpen} close={() => setSidebarOpen(false)} customLinks={customLinks} setCustomLinks={setCustomLinks} />

      <div className="main-column">
        <header className="topbar">
          <button className="icon-button mobile-menu" onClick={() => setSidebarOpen(true)} aria-label="Abrir menú"><Icon name="menu" /></button>
          <div className="global-search">
            <Icon name="search" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar una sección..." />
            {searchResults.length > 0 && (
              <div className="search-popover">
                {searchResults.map(r => <button key={r.key} onClick={() => go(r.key)}><span>{r.label}</span><small>{r.group}</small></button>)}
              </div>
            )}
          </div>
          <div className="topbar-actions">
            <button className="recipe-button" onClick={() => go('inventario-productos')}>Nuevo producto</button>
            <button className="icon-button" aria-label="Notificaciones"><Icon name="bell" /><span className="notification-dot" /></button>
            <div className="profile-chip"><span className="avatar">MP</span><div><strong>Administrador</strong><small>MenuDe-Prueba</small></div></div>
          </div>
        </header>

        <main className="content">
          <div className="page-head">
            <h1>{meta.title}</h1>
            <div className="breadcrumb"><span>{meta.group}</span><b>/</b><strong>{meta.title}</strong></div>
          </div>

          <PageRouter active={active} inventory={inventory} setInventory={setInventory}
            orders={orders} setOrders={setOrders} payments={payments} setPayments={setPayments}
            toast={setToast} customLinks={customLinks} setCustomLinks={setCustomLinks} go={go} />
        </main>
        <footer className="footer">MenuDe-Prueba · Panel administrativo React</footer>
      </div>
      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}

function Sidebar({ active, go, openGroups, setOpenGroups, open, close, customLinks, setCustomLinks }) {
  const [manage, setManage] = useState(false);
  const [name, setName] = useState('');
  const addCustom = (e) => {
    e.preventDefault();
    const clean = name.trim(); if (!clean) return;
    setCustomLinks([...customLinks, { key: `custom-${uid()}`, label: clean }]);
    setName('');
  };
  return <>
    <aside className={`sidebar ${open ? 'open' : ''}`}>
      <div className="brand"><span className="brand-mark">M</span><div><strong>MenuDe-Prueba</strong><small>ADMIN RESTAURANTE</small></div><button className="sidebar-close" onClick={close}><Icon name="close" /></button></div>
      <div className="sidebar-label">MENÚ PRINCIPAL</div>
      <nav className="side-nav">
        {NAV.map(group => {
          const expanded = !!openGroups[group.key];
          const childActive = group.children.some(([k]) => k === active);
          return <div className="nav-group" key={group.key}>
            <button className={`nav-parent ${childActive ? 'has-active' : ''}`} onClick={() => setOpenGroups({ ...openGroups, [group.key]: !expanded })}>
              <span className="nav-parent-left"><Icon name={group.icon} />{group.label}</span><span className={`chevron ${expanded ? 'down' : ''}`}><Icon name="chevron" /></span>
            </button>
            {expanded && <div className="nav-children">
              {group.children.map(([key, label]) => <button key={key} className={active === key ? 'active' : ''} onClick={() => go(key)}><span className="tiny-dot" />{label}</button>)}
            </div>}
          </div>;
        })}

        <div className="nav-group">
          <button className="nav-parent" onClick={() => setManage(v => !v)}><span className="nav-parent-left"><Icon name="plus" />Personalizados</span><span className={`chevron ${manage ? 'down' : ''}`}><Icon name="chevron" /></span></button>
          {manage && <div className="custom-menu-box">
            <form onSubmit={addCustom}><input value={name} onChange={e => setName(e.target.value)} placeholder="Nuevo submenú" /><button type="submit">Agregar</button></form>
            {customLinks.map(link => <div className="custom-link" key={link.key}><button onClick={() => go(link.key)}>{link.label}</button><button className="remove-mini" onClick={() => setCustomLinks(customLinks.filter(x => x.key !== link.key))}>×</button></div>)}
            {!customLinks.length && <small>Aquí puedes agregar y quitar tus propios submenús.</small>}
          </div>}
        </div>
      </nav>
      <div className="sidebar-card"><span>MENÚ PERSONALIZABLE</span><strong>Agrega accesos sin tocar código</strong><p>Usa “Personalizados” para crear o quitar submenús.</p></div>
    </aside>
    {open && <button className="sidebar-backdrop" onClick={close} aria-label="Cerrar menú" />}
  </>;
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
  if (active === 'clientes') return <Customers />;
  if (active === 'analitica') return <Analytics />;
  if (active === 'resenas') return <Reviews />;
  if (active === 'inventario-productos') return <Inventory {...props} />;
  if (active === 'inventario-categorias') return <Categories {...props} />;
  if (active === 'inventario-movimientos') return <Movements {...props} />;
  if (active.startsWith('grafico-')) return <Charts type={active.replace('grafico-', '')} />;
  if (active.startsWith('custom-')) return <CustomPage active={active} {...props} />;
  return <Dashboard {...props} />;
}

function Dashboard({ orders, inventory, payments = [], go }) {
  const today = dayKey();
  const revenue = payments.filter(p => p.dia === today).reduce((s, p) => s + p.total, 0);
  const low = inventory.filter(i => i.stock <= i.minimo).length;
  const totalOrders = orders.length + 243;
  return <>
    <section className="lezato-top-grid">
      <div className="lezato-stats-grid">
        <StatCard label="Total menús" value={inventory.length + 447} detail="Productos registrados" symbol="♨" />
        <StatCard label="Ingresos de hoy" value={money(revenue)} detail="Cobros acumulados del día" symbol="S/" />
        <StatCard label="Total pedidos" value={totalOrders} detail="Pedidos registrados" symbol="▤" />
        <StatCard label="Total clientes" value="872" detail={low ? `${low} productos con stock bajo` : 'Inventario saludable'} symbol="♙" alert={low > 0} />
      </div>

      <article className="panel revenue-panel dashboard-revenue">
        <PanelTitle title="Ingresos de hoy" subtitle="Comportamiento de ventas durante el día" action="Hoy" />
        <div className="revenue-headline"><div><strong>{money(revenue)}</strong><span>+8.4% desde ayer</span></div></div>
        <AreaChart />
      </article>
    </section>

    <section className="lezato-middle-grid">
      <article className="panel trending-panel">
        <PanelTitle title="Menús en tendencia" subtitle="Los más pedidos del día" />
        <div className="menu-ranking">
          {inventory.slice(0, 5).map((p, i) => <div key={p.id}><span className="rank-thumb">{['🍛','🍲','🍗','🐟','🍔'][i]}</span><span><strong>{p.nombre}</strong><small>{89 - i * 8} pedidos</small></span><b>{money(p.precio)}</b></div>)}
        </div>
        <button className="text-link" onClick={() => go('inventario-productos')}>Ver inventario →</button>
      </article>

      <article className="panel customer-map-panel">
        <PanelTitle title="Mapa de clientes" subtitle="Actividad de clientes durante el mes" action="Mensual" />
        <CustomerBars />
      </article>
    </section>

    <section className="lezato-bottom-grid">
      <article className="panel keyword-panel">
        <PanelTitle title="Palabras en tendencia" subtitle="Búsquedas y etiquetas" />
        <div className="keyword-list">
          <div><span>#ceviche</span><b>452 veces</b></div>
          <div><span>#almuerzo</span><b>197 veces</b></div>
          <div><span>#lomo</span><b>156 veces</b></div>
          <div><span>#postres</span><b>98 veces</b></div>
        </div>
      </article>

      <article className="panel customer-panel">
        <PanelTitle title="Clientes" subtitle="Actividad reciente" action="Ver todos" />
        {initialCustomers.map(c => <div className="customer-row" key={c.id}><span className="avatar small">{c.nombre.split(' ').map(x=>x[0]).join('').slice(0,2)}</span><span><strong>{c.nombre}</strong><small>{c.tipo}</small></span><b>{c.pedidos}</b></div>)}
      </article>

      <article className="panel delivery-panel">
        <PanelTitle title="Mapa de entregas" subtitle="Pedidos activos y rutas" action="•••" />
        <DeliveryMap />
      </article>
    </section>
  </>;
}

function CustomerBars() {
  const values = [36,52,71,48,66,83,58,62,77,51,68,89,73,61,55,79,64,44,57,82,60,74,49,67];
  return <div className="customer-bars" aria-label="Gráfico de barras de clientes">
    <div className="chart-grid-lines"><i/><i/><i/><i/></div>
    <div className="bars">{values.map((v,i)=><span key={i} style={{height:`${v}%`}} />)}</div>
    <div className="bars-axis"><span>01</span><span>06</span><span>12</span><span>18</span><span>24</span></div>
  </div>;
}

function DeliveryMap() {
  const nodes = [[12,27],[31,21],[53,31],[76,19],[89,48],[67,65],[46,80],[24,69],[7,54]];
  return <div className="delivery-map" aria-label="Diagrama de entregas">
    <svg viewBox="0 0 100 100" preserveAspectRatio="none">
      {[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,8],[8,0],[0,5],[1,6],[2,7],[3,8],[1,4],[0,3]].map(([a,b],i)=><line key={i} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} />)}
      {nodes.map(([x,y],i)=><circle key={i} cx={x} cy={y} r="2.4" />)}
    </svg>
    <div className="delivery-summary"><strong>45 pedidos</strong><span>10:45 AM</span></div>
  </div>;
}

function StatCard({ label, value, detail, symbol, alert }) {
  return <article className="stat-card"><div><span>{label}</span><strong>{value}</strong><small className={alert ? 'danger-text' : ''}>{detail}</small></div><span className="stat-icon">{symbol}</span></article>;
}
function PanelTitle({ title, subtitle, action }) { return <div className="panel-title"><div><h2>{title}</h2><p>{subtitle}</p></div>{action && <button>{action}</button>}</div>; }

function AreaChart() {
  const pts = '0,118 45,92 90,108 135,55 180,72 225,34 270,62 315,26 360,51 405,20 450,42 500,18';
  return <div className="chart-wrap"><svg viewBox="0 0 500 140" preserveAspectRatio="none" role="img" aria-label="Gráfico de ingresos"><defs><linearGradient id="area" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="currentColor" stopOpacity=".28"/><stop offset="100%" stopColor="currentColor" stopOpacity=".02"/></linearGradient></defs><polyline points={pts} fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/><polygon points={`0,140 ${pts} 500,140`} fill="url(#area)"/></svg><div className="axis"><span>08:00</span><span>11:00</span><span>14:00</span><span>17:00</span><span>20:00</span></div></div>;
}

function TablesView({ orders, setOrders, inventory, toast }) {
  const [selected, setSelected] = useState(null);
  const [cart, setCart] = useState([]);
  const tables = Array.from({length: 8}, (_,i)=>i+1);
  const tableOrder = (n) => orders.find(o => o.mesa === n && o.estado !== 'Entregado');
  const add = p => setCart(c => {
    const found = c.find(x=>x.id===p.id); return found ? c.map(x=>x.id===p.id?{...x,qty:x.qty+1}:x) : [...c,{...p,qty:1}];
  });
  const total = cart.reduce((s,p)=>s+p.precio*p.qty,0);
  const send = () => {
    if(!selected || !cart.length) return;
    const order = { id: Math.max(...orders.map(o=>o.id),1000)+1, mesa:selected, cliente:`Mesa ${String(selected).padStart(2,'0')}`, total, estado:'Pendiente', items:cart.map(p=>`${p.qty} × ${p.nombre}`), hora:new Date().toLocaleTimeString('es-PE',{hour:'2-digit',minute:'2-digit'}) };
    setOrders([order,...orders]); setCart([]); setSelected(null); toast('Pedido enviado a cocina.');
  };
  return <>
    <div className="section-tools"><div><h2>Salón</h2><p>Selecciona una mesa para crear un pedido.</p></div><span className="legend"><i className="free"/>Libre <i className="busy"/>Ocupada</span></div>
    <div className="tables-grid">{tables.map(n=>{const o=tableOrder(n);return <button key={n} className={`table-card ${o?'busy':''}`} onClick={()=>setSelected(n)}><div><strong>Mesa {String(n).padStart(2,'0')}</strong><span className={`status ${o?'pending':'paid'}`}>{o?o.estado:'Libre'}</span></div><p>{o?`Pedido #${o.id}`:'Disponible para atender'}</p><footer><span>{o?'Saldo actual':'Capacidad'}</span><b>{o?money(o.total):`${[2,4,4,6,2,4,6,4][n-1]} pers.`}</b></footer></button>})}</div>
    {selected && <div className="modal-layer" onMouseDown={()=>setSelected(null)}><div className="modal-card order-modal" onMouseDown={e=>e.stopPropagation()}><div className="modal-head"><div><small>NUEVO PEDIDO</small><h2>Mesa {String(selected).padStart(2,'0')}</h2></div><button onClick={()=>setSelected(null)}>×</button></div><div className="order-builder"><div><h3>Carta</h3><div className="product-pick">{inventory.filter(p=>p.stock>0).map(p=><button key={p.id} onClick={()=>add(p)}><span><strong>{p.nombre}</strong><small>{p.categoria}</small></span><b>{money(p.precio)}</b><i>+</i></button>)}</div></div><div className="cart-panel"><h3>Pedido</h3>{!cart.length?<div className="empty-state">Agrega productos desde la carta.</div>:cart.map(p=><div className="cart-row" key={p.id}><span><strong>{p.nombre}</strong><small>{p.qty} × {money(p.precio)}</small></span><b>{money(p.qty*p.precio)}</b><button onClick={()=>setCart(cart.filter(x=>x.id!==p.id))}>×</button></div>)}<div className="cart-total"><span>Total</span><strong>{money(total)}</strong></div><button className="primary" disabled={!cart.length} onClick={send}>Enviar a cocina</button></div></div></div></div>}
  </>;
}

function Kitchen({ orders, setOrders, toast }) {
  const states = ['Pendiente','En preparación','Listo'];
  const advance = (id) => setOrders(orders.map(o=>o.id===id?{...o,estado:o.estado==='Pendiente'?'En preparación':o.estado==='En preparación'?'Listo':'Entregado'}:o));
  return <div className="kanban">{states.map(st=><section key={st} className="kanban-col"><header><h2>{st}</h2><span>{orders.filter(o=>o.estado===st).length}</span></header>{orders.filter(o=>o.estado===st).map(o=><article className="kitchen-ticket" key={o.id}><div><strong>Mesa {o.mesa}</strong><small>{o.hora}</small></div><p>Pedido #{o.id}</p><ul>{o.items.map((x,i)=><li key={i}>{x}</li>)}</ul><button className="primary" onClick={()=>{advance(o.id);toast('Estado del pedido actualizado.')}}>{st==='Pendiente'?'Comenzar preparación':st==='En preparación'?'Marcar listo':'Marcar entregado'}</button></article>)}{!orders.some(o=>o.estado===st)&&<div className="empty-state">Sin pedidos.</div>}</section>)}</div>;
}

function Cashier({ orders, setOrders, payments, setPayments, toast }) {
  const pending = orders.filter(o => o.estado === 'Entregado');
  const [methods, setMethods] = useState({});

  const registerPayment = (order) => {
    const now = new Date();
    const payment = {
      id: uid(),
      pedidoId: order.id,
      mesa: order.mesa,
      total: order.total,
      metodo: methods[order.id] || 'Yape',
      dia: dayKey(now),
      hora: timePE(now),
      creadoEn: now.toISOString()
    };

    // El cobro se guarda en un historial independiente antes de liberar la mesa.
    // Por eso el Resumen del día siempre suma los cobros previos en lugar de reiniciarse.
    setPayments([payment, ...(payments || [])]);
    setOrders(orders.filter(x => x.id !== order.id));
    toast(`Cobro de ${money(order.total)} registrado. El total del día fue actualizado.`);
  };

  return <div className="cards-grid">{pending.map(o=><article className="cash-card" key={o.id}><div className="cash-head"><div><small>CUENTA</small><h2>Mesa {o.mesa}</h2></div><span className="status ready">Pedido #{o.id}</span></div>{o.items.map((x,i)=><div className="line-item" key={i}><span>{x}</span></div>)}<div className="cash-total"><span>Total a cobrar</span><strong>{money(o.total)}</strong></div><select value={methods[o.id] || 'Yape'} onChange={e=>setMethods({...methods,[o.id]:e.target.value})}><option>Efectivo</option><option>Yape</option><option>Plin</option><option>Tarjeta</option></select><button className="primary" onClick={()=>registerPayment(o)}>Registrar cobro</button></article>)}{!pending.length&&<div className="panel empty-state wide">No hay cuentas listas para cobrar. Marca un pedido como entregado desde Cocina.</div>}</div>;
}

function Summary({ orders, inventory, payments = [], setPayments, toast }) {
  const today = dayKey();
  const todayPayments = payments.filter(p => p.dia === today);
  const totalToday = todayPayments.reduce((s,p)=>s+p.total,0);
  const currentOrdersTotal = orders.reduce((s,o)=>s+o.total,0);

  const resetDay = () => {
    if (!todayPayments.length) return;
    const confirmed = window.confirm(
      '¿Iniciar un nuevo día? Se borrarán del resumen los cobros acumulados de hoy y el total volverá a S/ 0.00.'
    );
    if (!confirmed) return;

    // Solo elimina los cobros del día actual. Los pedidos activos y el inventario no se modifican.
    setPayments(payments.filter(p => p.dia !== today));
    toast('Resumen diario reiniciado. El acumulado volvió a S/ 0.00.');
  };

  return <>
    <section className="stats-grid">
      <StatCard label="Cobrado hoy" value={money(totalToday)} detail="Suma de todos los cobros del día" symbol="S/"/>
      <StatCard label="Cobros del día" value={todayPayments.length} detail="Pagos registrados hoy" symbol="✓"/>
      <StatCard label="Pedidos activos" value={orders.length} detail={`${money(currentOrdersTotal)} aún en pedidos`} symbol="▤"/>
      <StatCard label="Unidades stock" value={inventory.reduce((s,p)=>s+p.stock,0)} detail="Disponibles" symbol="□"/>
    </section>
    <div className="panel">
      <div className="summary-toolbar">
        <PanelTitle title="Cobros de hoy" subtitle="Cada cobro de Caja se acumula en este resumen"/>
        <button
          type="button"
          className="danger summary-reset"
          onClick={resetDay}
          disabled={!todayPayments.length}
          title="Borrar el acumulado del día actual y empezar desde cero"
        >
          <Icon name="trash" />
          Reiniciar día
        </button>
      </div>
      {todayPayments.length ? <div className="table-scroll"><table className="data-table"><thead><tr><th>Pedido</th><th>Mesa</th><th>Hora</th><th>Método</th><th>Total</th></tr></thead><tbody>{todayPayments.map(p=><tr key={p.id}><td><strong>#{p.pedidoId}</strong></td><td>Mesa {p.mesa}</td><td>{p.hora}</td><td>{p.metodo}</td><td><strong>{money(p.total)}</strong></td></tr>)}</tbody></table></div> : <div className="empty-state">El resumen del día está en S/ 0.00. Registra un cobro en Caja para comenzar.</div>}
    </div>
  </>;
}

function Orders({ orders, setOrders, toast }) {
  const [filter, setFilter] = useState('Todos');
  const visible = filter==='Todos'?orders:orders.filter(o=>o.estado===filter);
  const remove = id => {setOrders(orders.filter(o=>o.id!==id));toast('Pedido eliminado.');};
  return <div className="panel"><div className="list-toolbar"><div><h2>Todos los pedidos</h2><p>Administra el flujo del restaurante.</p></div><select value={filter} onChange={e=>setFilter(e.target.value)}><option>Todos</option><option>Pendiente</option><option>En preparación</option><option>Listo</option><option>Entregado</option></select></div><OrderTable orders={visible} onRemove={remove}/></div>;
}
function OrderTable({ orders, compact=false, onRemove }) { return <div className="table-scroll"><table className="data-table"><thead><tr><th>Pedido</th><th>Mesa</th><th>Hora</th><th>Estado</th><th>Total</th>{!compact&&<th/>}</tr></thead><tbody>{orders.map(o=><tr key={o.id}><td><strong>#{o.id}</strong></td><td>Mesa {o.mesa}</td><td>{o.hora}</td><td><span className={`status ${statusClass(o.estado)}`}>{o.estado}</span></td><td><strong>{money(o.total)}</strong></td>{!compact&&<td>{onRemove&&<button className="danger-icon" onClick={()=>onRemove(o.id)}><Icon name="trash" /></button>}</td>}</tr>)}</tbody></table></div>; }
const statusClass = st => st==='Pendiente'?'pending':st==='En preparación'?'progress':st==='Listo'?'ready':'paid';

function OrderDetail({ orders }) {
  const o = orders[0];
  if(!o) return <div className="panel empty-state">No hay pedidos disponibles.</div>;
  return <div className="detail-layout"><article className="panel order-detail-card"><div className="detail-hero"><div><small>PEDIDO #{o.id}</small><h2>Mesa {o.mesa}</h2><p>Creado a las {o.hora}</p></div><span className={`status ${statusClass(o.estado)}`}>{o.estado}</span></div><h3>Productos</h3>{o.items.map((x,i)=><div className="detail-line" key={i}><span>{x}</span><span>Incluido</span></div>)}<div className="detail-total"><span>Total</span><strong>{money(o.total)}</strong></div></article><aside className="panel timeline"><h2>Seguimiento</h2>{['Pedido recibido','Confirmado por cocina','Preparación','Listo para servir','Entregado'].map((x,i)=><div className={`timeline-step ${i<3?'done':''}`} key={x}><i>{i<3?'✓':i+1}</i><span><strong>{x}</strong><small>{i<3?'Completado':'Pendiente'}</small></span></div>)}</aside></div>;
}

function Customers() { return <div className="panel"><PanelTitle title="Clientes" subtitle="Historial y segmentación"/><div className="customer-grid">{initialCustomers.map(c=><article className="customer-card" key={c.id}><span className="avatar big">{c.nombre.split(' ').map(x=>x[0]).join('').slice(0,2)}</span><h3>{c.nombre}</h3><span className="status paid">{c.tipo}</span><div><span><small>Pedidos</small><strong>{c.pedidos}</strong></span><span><small>Gasto</small><strong>{money(c.gasto)}</strong></span></div></article>)}</div></div>; }

function Analytics() { return <><section className="stats-grid"><StatCard label="Conversión" value="68.4%" detail="+4.2 puntos" symbol="%"/><StatCard label="Ticket promedio" value="S/ 36.80" detail="+S/ 2.40" symbol="S/"/><StatCard label="Tiempo medio" value="18 min" detail="-3 min" symbol="⌁"/><StatCard label="Satisfacción" value="4.7/5" detail="142 reseñas" symbol="☆"/></section><div className="analytics-grid"><div className="panel"><PanelTitle title="Ventas semanales" subtitle="Últimos 7 días"/><BarChart /></div><div className="panel"><PanelTitle title="Canales" subtitle="Distribución de pedidos"/><Donut /></div></div></>; }

function Reviews() { const reviews=[['Lucía P.','Excelente atención y pedido rápido.',5],['Jorge M.','Buena comida, el tiempo fue correcto.',4],['Rosa C.','Todo llegó bien presentado.',5]];return <div className="panel"><PanelTitle title="Reseñas" subtitle="Opiniones recientes"/>{reviews.map((r,i)=><article className="review" key={i}><span className="avatar small">{r[0][0]}</span><div><strong>{r[0]}</strong><div className="stars">{'★★★★★'.slice(0,r[2])}</div><p>{r[1]}</p></div><small>Hoy</small></article>)}</div>; }

function Inventory({ inventory, setInventory, toast }) {
  const blank={nombre:'',categoria:'Platos',stock:0,minimo:5,precio:0};
  const [form,setForm]=useState(blank); const [editing,setEditing]=useState(null); const [query,setQuery]=useState('');
  const save=e=>{e.preventDefault(); if(!form.nombre.trim())return; if(editing){setInventory(inventory.map(p=>p.id===editing?{...form,id:editing}:p));toast('Producto actualizado.');}else{setInventory([...inventory,{...form,id:uid()}]);toast('Producto agregado.');}setForm(blank);setEditing(null);};
  const edit=p=>{setEditing(p.id);setForm({...p});};
  const remove=id=>{setInventory(inventory.filter(p=>p.id!==id));toast('Producto eliminado del inventario.');};
  const list=inventory.filter(p=>p.nombre.toLowerCase().includes(query.toLowerCase()));
  return <div className="inventory-layout"><section className="panel"><div className="list-toolbar"><div><h2>Inventario de productos</h2><p>{inventory.length} productos registrados.</p></div><input className="search-input" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Buscar producto"/></div><div className="table-scroll"><table className="data-table"><thead><tr><th>Producto</th><th>Categoría</th><th>Stock</th><th>Mínimo</th><th>Precio</th><th>Acciones</th></tr></thead><tbody>{list.map(p=><tr key={p.id}><td><strong>{p.nombre}</strong></td><td>{p.categoria}</td><td><span className={`stock-badge ${p.stock<=p.minimo?'low':''}`}>{p.stock}</span></td><td>{p.minimo}</td><td>{money(p.precio)}</td><td className="actions"><button onClick={()=>edit(p)}><Icon name="edit"/></button><button className="danger-icon" onClick={()=>remove(p.id)}><Icon name="trash"/></button></td></tr>)}</tbody></table></div></section><aside className="panel inventory-form"><h2>{editing?'Editar producto':'Agregar producto'}</h2><p>Los cambios se guardan en el navegador.</p><form onSubmit={save}><label>Nombre<input value={form.nombre} onChange={e=>setForm({...form,nombre:e.target.value})} placeholder="Ej. Agua mineral"/></label><label>Categoría<select value={form.categoria} onChange={e=>setForm({...form,categoria:e.target.value})}><option>Platos</option><option>Entradas</option><option>Bebidas</option><option>Postres</option><option>Insumos</option></select></label><div className="form-grid"><label>Stock<input type="number" min="0" value={form.stock} onChange={e=>setForm({...form,stock:+e.target.value})}/></label><label>Mínimo<input type="number" min="0" value={form.minimo} onChange={e=>setForm({...form,minimo:+e.target.value})}/></label></div><label>Precio (S/)<input type="number" min="0" step="0.1" value={form.precio} onChange={e=>setForm({...form,precio:+e.target.value})}/></label><button className="primary" type="submit">{editing?'Guardar cambios':'Agregar producto'}</button>{editing&&<button type="button" className="secondary" onClick={()=>{setEditing(null);setForm(blank)}}>Cancelar</button>}</form></aside></div>;
}

function Categories({ inventory, setInventory, toast }) {
  const categories=[...new Set(inventory.map(x=>x.categoria))]; const [name,setName]=useState('');
  const add=e=>{e.preventDefault();if(!name.trim())return;setInventory([...inventory,{id:uid(),nombre:`Nuevo producto (${name.trim()})`,categoria:name.trim(),stock:0,minimo:5,precio:0}]);setName('');toast('Categoría creada con un producto editable.');};
  return <div className="split-grid"><section className="panel"><PanelTitle title="Categorías" subtitle="Agrupación del inventario"/>{categories.map(c=><div className="category-row" key={c}><span><i>{c[0]}</i><strong>{c}</strong></span><b>{inventory.filter(x=>x.categoria===c).length} productos</b></div>)}</section><aside className="panel inventory-form"><h2>Nueva categoría</h2><p>Crea una categoría para organizar productos.</p><form onSubmit={add}><label>Nombre<input value={name} onChange={e=>setName(e.target.value)} placeholder="Ej. Desayunos"/></label><button className="primary">Agregar categoría</button></form></aside></div>;
}

function Movements({ inventory, setInventory, toast }) {
  const [id,setId]=useState(inventory[0]?.id||''); const [qty,setQty]=useState(1); const [type,setType]=useState('entrada');
  const apply=e=>{e.preventDefault();const n=Number(qty);setInventory(inventory.map(p=>p.id===Number(id)?{...p,stock:Math.max(0,p.stock+(type==='entrada'?n:-n))}:p));toast('Movimiento aplicado al stock.');};
  return <div className="split-grid"><section className="panel"><PanelTitle title="Estado de stock" subtitle="Vista rápida"/><div className="stock-list">{inventory.slice(0,8).map(p=><div key={p.id}><span><strong>{p.nombre}</strong><small>{p.categoria}</small></span><div className="stock-bar"><i style={{width:`${Math.min(100,p.stock/50*100)}%`}}/></div><b>{p.stock}</b></div>)}</div></section><aside className="panel inventory-form"><h2>Registrar movimiento</h2><form onSubmit={apply}><label>Producto<select value={id} onChange={e=>setId(e.target.value)}>{inventory.map(p=><option key={p.id} value={p.id}>{p.nombre}</option>)}</select></label><label>Tipo<select value={type} onChange={e=>setType(e.target.value)}><option value="entrada">Entrada</option><option value="salida">Salida</option></select></label><label>Cantidad<input type="number" min="1" value={qty} onChange={e=>setQty(e.target.value)}/></label><button className="primary">Aplicar movimiento</button></form></aside></div>;
}

function Charts({ type }) {
  const titles={flot:'Gráfico Flot',morris:'Gráfico Morris',chartjs:'Chart.js',chartist:'Chartist',sparkline:'Sparkline',peity:'Peity'};
  return <div className="charts-page"><div className="panel"><PanelTitle title={titles[type]} subtitle="Demostración interactiva visual"/><BarChart /></div><div className="panel"><PanelTitle title="Tendencia" subtitle="Serie de datos"/><AreaChart /></div><div className="panel"><PanelTitle title="Distribución" subtitle="Participación porcentual"/><Donut /></div><div className="panel"><PanelTitle title="Indicadores" subtitle="Valores destacados"/><MiniMetrics /></div></div>;
}
function BarChart(){const vals=[45,68,38,82,58,92,74];return <div className="bar-chart">{vals.map((v,i)=><div key={i}><i style={{height:`${v}%`}}/><span>{['L','M','M','J','V','S','D'][i]}</span></div>)}</div>}
function Donut(){return <div className="donut-wrap"><div className="donut"><span>68%</span></div><div className="donut-legend"><p><i className="c1"/>Salón <b>45%</b></p><p><i className="c2"/>Delivery <b>33%</b></p><p><i className="c3"/>Recojo <b>22%</b></p></div></div>}
function MiniMetrics(){return <div className="mini-metrics">{[['Pedidos','247'],['Clientes','872'],['Mesas','8'],['Ticket','S/ 36.8']].map(x=><div key={x[0]}><small>{x[0]}</small><strong>{x[1]}</strong><span>↑ 8%</span></div>)}</div>}

function Forms({ type, toast }) {
  if(type==='asistente') return <Wizard toast={toast}/>;
  if(type==='editor') return <Editor toast={toast}/>;
  if(type==='selectores') return <Selectors/>;
  if(type==='validacion') return <Validation toast={toast}/>;
  return <FormElements/>;
}
function FormElements(){return <div className="panel form-demo"><PanelTitle title="Elementos de formulario" subtitle="Campos preparados para reutilizar"/><div className="form-showcase"><label>Texto<input placeholder="Nombre del producto"/></label><label>Correo<input type="email" placeholder="admin@ejemplo.com"/></label><label>Selección<select><option>Selecciona una opción</option><option>Opción 1</option></select></label><label>Área de texto<textarea rows="4" placeholder="Escribe una observación..."/></label><label className="checkline"><input type="checkbox"/> Activar notificaciones</label><label>Rango<input type="range"/></label></div></div>}
function Wizard({toast}){const[step,setStep]=useState(1);return <div className="panel wizard"><div className="steps">{[1,2,3].map(s=><span className={s<=step?'active':''} key={s}>{s}<small>{['Datos','Preferencias','Confirmar'][s-1]}</small></span>)}</div><div className="wizard-body"><h2>Paso {step}</h2>{step===1&&<><label>Nombre<input placeholder="Tu nombre"/></label><label>Correo<input type="email" placeholder="correo@ejemplo.com"/></label></>}{step===2&&<><label>Tipo de cuenta<select><option>Administrador</option><option>Operador</option></select></label><label className="checkline"><input type="checkbox"/> Recibir resumen diario</label></>}{step===3&&<div className="empty-state">Revisa los datos y termina el asistente.</div>}<div className="wizard-actions"><button className="secondary" disabled={step===1} onClick={()=>setStep(step-1)}>Anterior</button>{step<3?<button className="primary" onClick={()=>setStep(step+1)}>Siguiente</button>:<button className="primary" onClick={()=>toast('Asistente completado.')}>Finalizar</button>}</div></div></div>}
function Editor({toast}){const[text,setText]=useState('Escribe aquí el contenido de tu comunicado...');return <div className="panel editor"><PanelTitle title="Editor de texto" subtitle="Editor simple funcional"/><div className="editor-toolbar"><button onClick={()=>setText(text.toUpperCase())}>ABC</button><button onClick={()=>setText(`**${text}**`)}>B</button><button onClick={()=>setText(`${text}\n• Nuevo punto`)}>• Lista</button></div><textarea value={text} onChange={e=>setText(e.target.value)} rows="12"/><button className="primary" onClick={()=>toast('Contenido guardado localmente.')}>Guardar contenido</button></div>}
function Selectors(){return <div className="panel form-demo"><PanelTitle title="Selectores" subtitle="Controles de selección"/><div className="form-showcase"><label>Fecha<input type="date"/></label><label>Hora<input type="time"/></label><label>Color<input type="color" defaultValue="#14b8a6"/></label><label>Categoría<select><option>Platos</option><option>Bebidas</option><option>Postres</option></select></label></div></div>}
function Validation({toast}){const[email,setEmail]=useState('');const[name,setName]=useState('');const[errors,setErrors]=useState({});const submit=e=>{e.preventDefault();const er={};if(name.trim().length<3)er.name='Escribe al menos 3 caracteres.';if(!/^\S+@\S+\.\S+$/.test(email))er.email='Correo no válido.';setErrors(er);if(!Object.keys(er).length)toast('Formulario válido.');};return <div className="panel inventory-form validation"><h2>Validación</h2><form onSubmit={submit}><label>Nombre<input value={name} onChange={e=>setName(e.target.value)}/>{errors.name&&<small className="error">{errors.name}</small>}</label><label>Correo<input value={email} onChange={e=>setEmail(e.target.value)}/>{errors.email&&<small className="error">{errors.email}</small>}</label><button className="primary">Validar</button></form></div>}

function DataTables({ mode, inventory }) { const[query,setQuery]=useState('');const[sort,setSort]=useState('nombre');const rows=[...inventory].filter(x=>x.nombre.toLowerCase().includes(query.toLowerCase())).sort((a,b)=>String(a[sort]).localeCompare(String(b[sort]),'es',{numeric:true}));return <div className="panel"><div className="list-toolbar"><div><h2>{mode==='basica'?'Tabla básica':'Tabla de datos'}</h2><p>{mode==='basica'?'Presentación limpia y responsive.':'Con búsqueda y ordenamiento.'}</p></div>{mode==='datos'&&<input className="search-input" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Buscar..."/>}</div><div className="table-scroll"><table className="data-table"><thead><tr><th onClick={()=>setSort('nombre')}>Producto</th><th onClick={()=>setSort('categoria')}>Categoría</th><th onClick={()=>setSort('stock')}>Stock</th><th onClick={()=>setSort('precio')}>Precio</th></tr></thead><tbody>{rows.map(p=><tr key={p.id}><td><strong>{p.nombre}</strong></td><td>{p.categoria}</td><td>{p.stock}</td><td>{money(p.precio)}</td></tr>)}</tbody></table></div></div>}

function CustomPage({ active, customLinks, setCustomLinks, toast }) { const item=customLinks.find(x=>x.key===active);const[note,setNote]=usePersistentState(`nota-${active}`,'');if(!item)return <div className="panel empty-state">Este submenú ya no existe.</div>;return <div className="panel custom-page"><PanelTitle title={item.label} subtitle="Submenú personalizado"/><p>Puedes usar este espacio como base para una nueva sección.</p><label>Notas de esta sección<textarea rows="8" value={note} onChange={e=>setNote(e.target.value)} placeholder="Escribe aquí..."/></label><div className="custom-actions"><button className="primary" onClick={()=>toast('Nota guardada automáticamente.')}>Guardar</button><button className="danger" onClick={()=>setCustomLinks(customLinks.filter(x=>x.key!==active))}>Eliminar submenú</button></div></div>}
