// Todas las cantidades monetarias se almacenan como céntimos enteros.
export const STORE_KEY = 'menude-sistema-v2';
export const STATES = ['Pendiente', 'En preparación', 'Listo', 'Entregado', 'Pagado', 'Cancelado'];
export const METHODS = ['Efectivo', 'Yape', 'Plin', 'Tarjeta'];
export const money = cents => new Intl.NumberFormat('es-PE', {style:'currency',currency:'PEN'}).format((cents || 0) / 100);
export const dayKey = (value = new Date()) => new Intl.DateTimeFormat('sv-SE', {timeZone:'America/Lima',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date(value));
export const hour = value => new Intl.DateTimeFormat('es-PE', {timeZone:'America/Lima',hour:'2-digit',minute:'2-digit',hour12:false}).format(new Date(value));
export const dateLabel = value => new Intl.DateTimeFormat('es-PE', {timeZone:'America/Lima',day:'2-digit',month:'short',year:'numeric'}).format(new Date(value));
export const uid = () => globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`;
export const isActive = order => !['Pagado','Cancelado'].includes(order.status);
export const orderTotal = order => order.items.reduce((sum,item)=>sum + item.price * item.qty, 0) + (order.adjustment || 0);
export const initialProducts = [
 ['Lomo saltado', 'Platos', 28, 8, 2800, 'lomo'], ['Ají de gallina', 'Platos', 22, 8, 2200, 'aji'],
 ['Arroz con pollo', 'Platos', 18, 8, 2000, 'arroz'], ['Ceviche clásico', 'Platos', 14, 6, 3000, 'ceviche'],
 ['Hamburguesa de la casa', 'Platos', 31, 10, 1800, 'burger'], ['Porción de papas', 'Entradas', 34, 10, 1000, 'papas'],
 ['Papa a la huancaína', 'Entradas', 12, 6, 1200, 'papa'], ['Limonada', 'Bebidas', 40, 12, 700, 'limonada'],
 ['Chicha morada', 'Bebidas', 38, 12, 600, 'chicha'], ['Gaseosa personal', 'Bebidas', 50, 15, 500, 'gaseosa'],
 ['Arroz con leche', 'Postres', 11, 5, 800, 'leche'], ['Torta de chocolate', 'Postres', 4, 5, 1000, 'torta']
].map(([name,category,stock,min,price,art],i)=>({id:String(i+1),name,category,stock,min,price,art,archived:false}));
const cleanText = (value, label, max = 120) => {const text=String(value??'').trim(); if(!text || text.length>max)throw new Error(`${label}: escribe entre 1 y ${max} caracteres.`);return text;};
const integer = (value, label, min = 0, max = 100000000) => {const n=Number(value); if(!Number.isSafeInteger(n)||n<min||n>max)throw new Error(`${label}: ingresa un entero entre ${min} y ${max}.`);return n;};
export function baseState(now = new Date()) {
 return {version:2,revision:0,demo:false,settings:{name:'MenuDe-Prueba',owner:'Administrador',tableCount:8,theme:'petroleo'},products:structuredClone(initialProducts),categories:['Platos','Entradas','Bebidas','Postres','Insumos'],orders:[],payments:[],customers:[],reviews:[],movements:[],closures:[],links:[],nextOrder:1045,session:{id:uid(),day:dayKey(now),startedAt:new Date(now).toISOString()},updatedAt:new Date(now).toISOString()};
}
export function seedState(now = new Date()) {
 const s=baseState(now);s.demo=true;
 s.customers=['María Torres','Diego Ramos','Andrea León','Carlos Vega'].map((name,i)=>({id:`c${i}`,name,phone:'',email:'',note:'Cliente de ejemplo',archived:false}));
 // Historial explícitamente de demostración. Todos los indicadores se calculan a partir de estos registros.
 for(let d=13;d>=0;d--) {
  for(let j=0;j<(d===0?3:2+(d%3));j++) {
   const time=new Date(`${dayKey(now)}T17:00:00.000Z`);time.setUTCDate(time.getUTCDate()-d);time.setUTCHours(17+j,12+j*7);
   const product=s.products[(d+j*2)%7], drink=s.products[7+(j%3)];
   const order={id:s.nextOrder++,table:(j%8)+1,customerId:`c${(d+j)%4}`,notes:'',items:[{productId:product.id,name:product.name,price:product.price,qty:1+(j%2)},{productId:drink.id,name:drink.name,price:drink.price,qty:1}],status:'Pagado',createdAt:time.toISOString(),updatedAt:time.toISOString(),history:[{status:'Pagado',at:time.toISOString()}],adjustment:0};
   s.orders.push(order);s.payments.push({id:uid(),orderId:order.id,table:order.table,customerId:order.customerId,total:orderTotal(order),method:METHODS[(d+j)%4],received:orderTotal(order),change:0,day:dayKey(time),createdAt:time.toISOString(),sessionId:d===0?s.session.id:`demo-${d}`});
  }
 }
 const pairs=[{table:4,ids:[1,2,10],status:'En preparación'},{table:2,ids:[4,8],status:'Pendiente'},{table:7,ids:[5,10],status:'Listo'},{table:1,ids:[3,12],status:'Entregado'}];
 pairs.forEach((entry,i)=>{
  const at=new Date(new Date(now).getTime()-(35-i*6)*60000).toISOString();
  const items=entry.ids.map(id=>{const p=s.products.find(x=>x.id===String(id));p.stock--;return {productId:p.id,name:p.name,price:p.price,qty:1};});
  s.orders.push({id:s.nextOrder++,table:entry.table,customerId:i<2?`c${i}`:'',notes:i===1?'Sin ají, por favor.':'',items,status:entry.status,createdAt:at,updatedAt:at,history:STATES.slice(0,STATES.indexOf(entry.status)+1).map(status=>({status,at})),adjustment:0});
 });
 s.products.forEach(p=>s.movements.push({id:uid(),productId:p.id,name:p.name,delta:p.stock,balance:p.stock,reason:'Stock inicial de demostración',createdAt:new Date(now).toISOString()}));
 s.reviews=[{id:uid(),name:'María Torres',rating:5,text:'Muy buena atención y el pedido llegó caliente.',reply:'',createdAt:new Date(now).toISOString()},{id:uid(),name:'Diego Ramos',rating:4,text:'El lomo saltado estuvo muy bueno.',reply:'',createdAt:new Date(now).toISOString()}];
 return s;
}
export function currentPayments(s){return s.payments.filter(p=>p.sessionId===s.session.id);}
export function rotateDay(state, now = new Date()) {
 if(state.session.day===dayKey(now))return state;
 const s=structuredClone(state);const rows=currentPayments(s);
 s.closures.unshift({id:uid(),...s.session,closedAt:new Date(now).toISOString(),total:rows.reduce((a,p)=>a+p.total,0),count:rows.length,reason:'Cambio de fecha'});
 s.session={id:uid(),day:dayKey(now),startedAt:new Date(now).toISOString()};return s;
}
function move(s,p,delta,reason,now){p.stock+=delta;s.movements.unshift({id:uid(),productId:p.id,name:p.name,delta,balance:p.stock,reason,createdAt:now});}
export function transact(state, action, now = new Date()) {
 const s=structuredClone(rotateDay(state,now)), stamp=new Date(now).toISOString(), a=action;
 const findOrder=()=>{const o=s.orders.find(o=>o.id===Number(a.id));if(!o)throw new Error('No se encontró el pedido.');return o;};
 switch(a.type){
  case 'NEW_ORDER': {
   const table=integer(a.table,'Mesa',0,s.settings.tableCount);
   if(table && s.orders.some(o=>o.table===table && isActive(o)))throw new Error('Esta mesa ya tiene un pedido activo.');
   if(!Array.isArray(a.items)||!a.items.length)throw new Error('Agrega al menos un producto.');
   const ids=new Set();const items=a.items.map(item=>{
    const p=s.products.find(p=>p.id===String(item.productId)&&!p.archived);
    if(!p)throw new Error('Uno de los productos ya no está disponible.');
    if(p.price<=0)throw new Error(`Completa el precio de ${p.name} en Inventario antes de venderlo.`);
    if(ids.has(p.id))throw new Error('Producto duplicado en el pedido.');ids.add(p.id);
    const qty=integer(item.qty,'Cantidad',1,10000);if(qty>p.stock)throw new Error(`Stock insuficiente de ${p.name}. Disponible: ${p.stock}.`);
    return {productId:p.id,name:p.name,price:p.price,qty};
   });
   if(a.customerId&&!s.customers.some(c=>c.id===a.customerId&&!c.archived))throw new Error('Selecciona un cliente disponible.');
   const order={id:s.nextOrder++,table,customerId:a.customerId||'',notes:String(a.notes||'').trim().slice(0,500),items,status:'Pendiente',createdAt:stamp,updatedAt:stamp,history:[{status:'Pendiente',at:stamp}],adjustment:0};
   items.forEach(item=>move(s,s.products.find(p=>p.id===item.productId),-item.qty,`Pedido #${order.id}`,stamp));s.orders.unshift(order);break;
  }
  case 'ADVANCE_ORDER': {
   const o=findOrder();const i=STATES.indexOf(o.status);if(i<0||i>2)throw new Error('Este pedido ya no puede avanzar en cocina.');
   o.status=STATES[i+1];o.updatedAt=stamp;o.history.push({status:o.status,at:stamp});break;
  }
  case 'CANCEL_ORDER': {
   const o=findOrder();if(!isActive(o))throw new Error('Este pedido ya está cerrado.');
   if(a.restock&&o.stockReserved!==false)o.items.forEach(item=>{const p=s.products.find(p=>p.id===item.productId);if(p)move(s,p,item.qty,`Anulación #${o.id}`,stamp);});
   o.status='Cancelado';o.updatedAt=stamp;o.history.push({status:'Cancelado',at:stamp});o.cancelReason=cleanText(a.reason,'Motivo',300);break;
  }
  case 'PAY_ORDER': {
   const o=findOrder();if(o.status!=='Entregado'||s.payments.some(p=>p.orderId===o.id))throw new Error('El pedido debe estar entregado y sin cobro previo.');
   if(!METHODS.includes(a.method))throw new Error('Método de pago inválido.');
   const total=orderTotal(o);const received=a.method==='Efectivo'?integer(a.received,'Monto recibido',total):total;
   s.payments.unshift({id:uid(),orderId:o.id,table:o.table,customerId:o.customerId,total,method:a.method,received,change:received-total,day:dayKey(now),createdAt:stamp,sessionId:s.session.id});
   o.status='Pagado';o.updatedAt=stamp;o.history.push({status:'Pagado',at:stamp});break;
  }
  case 'CLOSE_DAY': {
   const rows=currentPayments(s);s.closures.unshift({id:uid(),...s.session,closedAt:stamp,total:rows.reduce((v,p)=>v+p.total,0),count:rows.length,reason:'Cierre manual'});
   s.session={id:uid(),day:dayKey(now),startedAt:stamp};break;
  }
  case 'SAVE_PRODUCT': {
   const p=a.product;const name=cleanText(p.name,'Nombre');if(!s.categories.includes(p.category))throw new Error('Selecciona una categoría válida.');
   if(s.products.some(x=>x.id!==p.id&&!x.archived&&x.name.toLocaleLowerCase('es')===name.toLocaleLowerCase('es')))throw new Error('Ya existe un producto con ese nombre.');
   const stock=integer(p.stock,'Stock',0,1000000),min=integer(p.min,'Mínimo',0,1000000),price=integer(p.price,'Precio',1,10000000);
   let existing=s.products.find(x=>x.id===p.id);if(p.id&&!existing)throw new Error('No se encontró el producto.');
   if(existing){const difference=stock-existing.stock;Object.assign(existing,{name,category:p.category,min,price});if(difference)move(s,existing,difference,'Ajuste desde edición',stamp);}
   else {existing={id:uid(),name,category:p.category,stock:0,min,price,art:'default',archived:false};s.products.push(existing);move(s,existing,stock,'Alta de producto',stamp);}break;
  }
  case 'ARCHIVE_PRODUCT': {const p=s.products.find(p=>p.id===a.id);if(!p)throw new Error('Producto no encontrado.');p.archived=true;break;}
  case 'STOCK': {
   const p=s.products.find(p=>p.id===a.id&&!p.archived);if(!p)throw new Error('Selecciona un producto disponible.');
   const qty=integer(a.qty,'Cantidad',1,1000000),sign=a.direction==='in'?1:a.direction==='out'?-1:0;if(!sign)throw new Error('Tipo de movimiento inválido.');
   if(p.stock+sign*qty<0)throw new Error(`Solo quedan ${p.stock} unidades de ${p.name}.`);move(s,p,sign*qty,cleanText(a.reason,'Motivo',200),stamp);break;
  }
  case 'SAVE_CATEGORY': {
   const name=cleanText(a.name,'Categoría',50);if(s.categories.some(c=>c.toLowerCase()===name.toLowerCase()&&c!==a.oldName))throw new Error('Ya existe esa categoría.');
   if(a.oldName){if(!s.categories.includes(a.oldName))throw new Error('Categoría no encontrada.');s.categories=s.categories.map(c=>c===a.oldName?name:c);s.products.forEach(p=>{if(p.category===a.oldName)p.category=name;});}
   else s.categories.push(name);break;
  }
  case 'DELETE_CATEGORY': {if(s.products.some(p=>p.category===a.name&&!p.archived))throw new Error('Mueve o elimina sus productos antes de eliminar la categoría.');s.categories=s.categories.filter(c=>c!==a.name);break;}
  case 'SAVE_CUSTOMER': {
   const c=a.customer,name=cleanText(c.name,'Nombre',100),phone=String(c.phone||'').trim(),email=String(c.email||'').trim();
   if(phone&&!/^[+\d ()-]{6,25}$/.test(phone))throw new Error('Ingresa un teléfono válido.');if(email&&!/^\S+@\S+\.\S+$/.test(email))throw new Error('Ingresa un correo válido.');
   const data={id:c.id||uid(),name,phone,email,note:String(c.note||'').slice(0,500),archived:false};
   if(c.id){const index=s.customers.findIndex(x=>x.id===c.id);if(index<0)throw new Error('Cliente no encontrado.');s.customers[index]=data;}else s.customers.push(data);break;
  }
  case 'ARCHIVE_CUSTOMER': {const c=s.customers.find(c=>c.id===a.id);if(!c)throw new Error('Cliente no encontrado.');c.archived=true;break;}
  case 'ADD_REVIEW': s.reviews.unshift({id:uid(),name:cleanText(a.name,'Nombre',100),rating:integer(a.rating,'Calificación',1,5),text:cleanText(a.text,'Reseña',1000),reply:'',createdAt:stamp});break;
  case 'REPLY_REVIEW': {const r=s.reviews.find(r=>r.id===a.id);if(!r)throw new Error('Reseña no encontrada.');r.reply=cleanText(a.text,'Respuesta',1000);break;}
  case 'DELETE_REVIEW': s.reviews=s.reviews.filter(r=>r.id!==a.id);break;
  case 'SAVE_LINK': {
   const title=cleanText(a.title,'Nombre',60);if(a.id){const link=s.links.find(l=>l.id===a.id);if(!link)throw new Error('Sección no encontrada.');link.title=title;link.note=String(a.note||'').slice(0,30000);}
   else s.links.push({id:uid(),title,note:''});break;
  }
  case 'DELETE_LINK': s.links=s.links.filter(l=>l.id!==a.id);break;
  case 'SETTINGS': {
   const count=integer(a.settings.tableCount,'Número de mesas',1,30);if(s.orders.some(o=>isActive(o)&&o.table>count))throw new Error('Hay pedidos activos en las mesas que deseas retirar.');
   if(!['petroleo','lezato'].includes(a.settings.theme))throw new Error('Paleta no válida.');s.settings={name:cleanText(a.settings.name,'Negocio',50),owner:cleanText(a.settings.owner,'Administrador',60),tableCount:count,theme:a.settings.theme};break;
  }
  case 'START_REAL': {if(!s.demo)throw new Error('Los datos actuales ya son propios.');const fresh=baseState(now);fresh.settings=s.settings;fresh.products=s.products.map(p=>({...p,stock:0}));fresh.categories=s.categories;fresh.nextOrder=s.nextOrder;fresh.links=s.links;s.orders=[];s.payments=[];s.customers=[];s.reviews=[];s.movements=[];s.closures=[];Object.assign(s,fresh);break;}
  default:throw new Error('Operación desconocida.');
 }
 s.revision=state.revision+1;s.updatedAt=stamp;return s;
}
export function migrateLegacy(storage, now = new Date()) {
 const read=(key,fallback)=>{try{return JSON.parse(storage.getItem(key))??fallback;}catch{return fallback;}};
 if(!['menu-prueba-inventario','menu-prueba-pedidos','menu-prueba-cobros'].some(k=>storage.getItem(k)!==null))return null;
 const s=baseState(now);s.migrated=true;
 const products=read('menu-prueba-inventario',null);if(Array.isArray(products))s.products=products.map(p=>({id:String(p.id),name:String(p.nombre),category:String(p.categoria),stock:Math.max(0,Math.floor(Number(p.stock)||0)),min:Math.max(0,Math.floor(Number(p.minimo)||0)),price:Math.max(0,Math.round((Number(p.precio)||0)*100)),art:initialProducts.find(x=>x.name===p.nombre)?.art||'default',archived:false}));
 s.categories=[...new Set([...s.categories,...s.products.map(p=>p.category)])];
 const oldOrders=read('menu-prueba-pedidos',[]);s.orders=(Array.isArray(oldOrders)?oldOrders:[]).map(o=>{
  const items=(o.items||[]).map(text=>{const match=String(text).match(/^(\d+)\s*[×x]\s*(.*)$/);const name=match?match[2]:String(text),qty=match?Number(match[1]):1,p=s.products.find(p=>p.name===name);return {productId:p?.id||`legacy-${uid()}`,name,qty,price:p?.price||0};});
  const createdAt=new Date(`${dayKey(now)}T${/^\d{2}:\d{2}$/.test(o.hora)?o.hora:'12:00'}:00-05:00`).toISOString();const total=Math.round(Number(o.total)*100);
  const status=STATES.includes(o.estado)?o.estado:'Pendiente';
  return {id:Number(o.id),table:Number(o.mesa)||0,customerId:'',legacy:true,stockReserved:false,notes:'Importado de la versión anterior.',items,status,createdAt,updatedAt:createdAt,history:[{status,at:createdAt}],adjustment:total-items.reduce((v,i)=>v+i.price*i.qty,0)};
 });
 // La versión anterior no descontaba existencias al tomar pedidos. La migración conserva el stock existente.
 const oldPayments=read('menu-prueba-cobros',[]);s.payments=(Array.isArray(oldPayments)?oldPayments:[]).map(p=>({id:String(p.id),orderId:Number(p.pedidoId),table:Number(p.mesa)||0,customerId:'',total:Math.round(Number(p.total)*100),method:METHODS.includes(p.metodo)?p.metodo:'Efectivo',received:Math.round(Number(p.total)*100),change:0,day:p.dia,createdAt:p.creadoEn||`${p.dia}T17:00:00.000Z`,sessionId:p.dia===s.session.day?s.session.id:`legacy-${p.dia}`}));
 s.orders.forEach(o=>{if(s.payments.some(p=>p.orderId===o.id))o.status='Pagado';});
 s.nextOrder=Math.max(1044,...s.orders.map(o=>o.id),...s.payments.map(p=>p.orderId))+1;
 s.links=read('menu-prueba-personalizados',[]).map(l=>({id:l.key,title:l.label,note:read(`nota-${l.key}`,'')}));
 return s;
}
export function validateState(s) {
 if(!s||s.version!==2||!Number.isSafeInteger(s.revision)||s.revision<0||!s.session||!s.settings)throw new Error('El archivo no corresponde a un respaldo de MenuDe versión 2.');
 for(const key of ['products','categories','orders','payments','customers','reviews','movements','closures','links'])if(!Array.isArray(s[key]))throw new Error(`Respaldo incompleto: ${key}.`);
 if(s.products.length>10000||s.orders.length>100000||s.payments.length>100000)throw new Error('El respaldo supera el tamaño admitido.');
 if(!s.categories.every(c=>typeof c==='string'&&c.length<=50))throw new Error('Categorías inválidas.');
 const uniq=arr=>new Set(arr.map(x=>String(x.id))).size===arr.length;
 if(!['products','orders','payments','customers','reviews','links'].every(k=>uniq(s[k])))throw new Error('El respaldo contiene identificadores duplicados.');
 const str=(x,max=30000)=>typeof x==='string'&&x.length<=max;const num=x=>Number.isSafeInteger(x)&&x>=0;
 const date=x=>str(x,40)&&!Number.isNaN(Date.parse(x));
 if(!str(s.settings.name,50)||!str(s.settings.owner,60)||!num(s.settings.tableCount)||s.settings.tableCount<1||s.settings.tableCount>30||!['petroleo','lezato'].includes(s.settings.theme)||!str(s.session.id)||!date(s.session.startedAt)||!/^\d{4}-\d{2}-\d{2}$/.test(s.session.day))throw new Error('Configuración inválida.');
 if(!s.products.every(p=>str(p.id)&&str(p.name,120)&&str(p.category,50)&&num(p.stock)&&num(p.min)&&num(p.price)))throw new Error('Hay productos inválidos en el respaldo.');
 if(!s.orders.every(o=>num(o.id)&&num(o.table)&&o.table<=30&&str(o.customerId)&&str(o.notes)&&STATES.includes(o.status)&&date(o.createdAt)&&date(o.updatedAt)&&Array.isArray(o.items)&&o.items.length>0&&o.items.every(i=>str(i.productId)&&str(i.name,120)&&num(i.price)&&num(i.qty)&&i.qty>0)&&Number.isSafeInteger(o.adjustment??0)&&orderTotal(o)>=0&&Array.isArray(o.history)&&o.history.every(h=>STATES.includes(h.status)&&date(h.at))))throw new Error('Hay pedidos inválidos en el respaldo.');
 if(!s.payments.every(p=>str(p.id)&&num(p.orderId)&&num(p.table)&&num(p.total)&&METHODS.includes(p.method)&&num(p.received)&&num(p.change)&&p.received-p.change===p.total&&str(p.sessionId)&&date(p.createdAt)&&/^\d{4}-\d{2}-\d{2}$/.test(p.day)))throw new Error('Hay cobros inválidos en el respaldo.');
 if(new Set(s.payments.map(p=>p.orderId)).size!==s.payments.length)throw new Error('Hay cobros duplicados.');
 if(!s.customers.every(c=>str(c.id)&&str(c.name,100)&&str(c.phone,25)&&str(c.email,150)&&str(c.note,500)))throw new Error('Clientes inválidos.');
 if(!s.reviews.every(r=>str(r.id)&&str(r.name,100)&&num(r.rating)&&r.rating>=1&&r.rating<=5&&str(r.text,1000)&&str(r.reply,1000)&&date(r.createdAt)))throw new Error('Reseñas inválidas.');
 if(!s.movements.every(m=>str(m.name,120)&&Number.isSafeInteger(m.delta)&&num(m.balance)&&str(m.reason,200)&&date(m.createdAt)))throw new Error('Movimientos inválidos.');
 if(!s.closures.every(c=>str(c.id)&&str(c.day,10)&&date(c.closedAt)&&num(c.total)&&num(c.count)))throw new Error('Cierres inválidos.');
 if(!s.links.every(l=>str(l.id)&&str(l.title,60)&&str(l.note)))throw new Error('Secciones inválidas.');
 if(!num(s.nextOrder)||s.nextOrder<=Math.max(0,...s.orders.map(o=>o.id),...s.payments.map(p=>p.orderId)))throw new Error('La numeración de pedidos no es válida.');
 const active=s.orders.filter(o=>isActive(o)&&o.table);if(new Set(active.map(o=>o.table)).size!==active.length&&!active.every(o=>active.filter(x=>x.table===o.table).length===1||o.legacy===true))throw new Error('Hay más de un pedido activo en una mesa.');
 return s;
}
export function chartSeries(s,period='week',now=new Date()) {
 const n=period==='month'?30:period==='today'?24:7;
 const date=new Date(`${dayKey(now)}T17:00:00Z`);const rows=[];
 for(let i=0;i<n;i++){
  let label,payments;
  if(period==='today'){label=`${String(i).padStart(2,'0')}:00`;payments=currentPayments(s).filter(p=>Number(hour(p.createdAt).slice(0,2))===i);}
  else {const d=new Date(date);d.setUTCDate(d.getUTCDate()-(n-i-1));const key=dayKey(d);label=key.slice(8);payments=s.payments.filter(p=>p.day===key);}
  rows.push({label,total:payments.reduce((v,p)=>v+p.total,0),count:payments.length});
 }return rows;
}
export function exportCSV(headers,rows){const escape=v=>{let text=String(v??'');if(/^[=+@\-\t\r]/.test(text))text="'"+text;return '"'+text.replaceAll('"','""')+'"';};return '\uFEFF'+[headers,...rows].map(r=>r.map(escape).join(';')).join('\r\n');}
