import React, {createContext,useContext,useEffect,useRef,useState} from 'react';
import {STORE_KEY,seedState,migrateLegacy,transact,rotateDay,validateState,uid} from './model';
const Context=createContext(null);
function load(){
 try {
  const raw=localStorage.getItem(STORE_KEY);
  if(raw)return {state:validateState(JSON.parse(raw)),error:''};
  return {state:migrateLegacy(localStorage)||seedState(),error:''};
 }catch{return {state:null,error:'No se pudieron leer los datos guardados. Puedes descargar los datos originales e importar un respaldo válido; no se han sobrescrito.'};}
}
export function Provider({children}){
 const [initial]=useState(load);const [state,setState]=useState(initial.state);const stateRef=useRef(state);const [error,setError]=useState(initial.error);const [notice,setNotice]=useState(null);
 const notify=(message,kind='success')=>setNotice({id:uid(),message,kind});
 useEffect(()=>{if(!notice)return;const timer=setTimeout(()=>setNotice(null),5500);return()=>clearTimeout(timer);},[notice]);
 function persist(next){try{localStorage.setItem(STORE_KEY,JSON.stringify(next));stateRef.current=next;setState(next);setError('');return true;}catch{setError('No hay espacio para guardar o el navegador bloquea el almacenamiento. Exporta un respaldo; la operación no se aplicó.');notify('No se pudo guardar. No se modificaron los datos.','error');return false;}}
 const act=(action,message)=>{
  try{
   // Lee el estado más reciente antes de cada transacción, incluso si cambió en otra pestaña.
   const raw=localStorage.getItem(STORE_KEY);const current=raw?validateState(JSON.parse(raw)):stateRef.current;
   const next=transact(current,action);if(!persist(next))return false;if(message)notify(message);return next;
  }catch(e){notify(e.message||'No se pudo completar la operación.','error');return false;}
 };
 useEffect(()=>{
  if(initial.state&&!localStorage.getItem(STORE_KEY))persist(initial.state);
  const onStorage=e=>{if(e.key!==STORE_KEY||!e.newValue)return;try{const next=validateState(JSON.parse(e.newValue));stateRef.current=next;setState(next);notify('Datos actualizados desde otra pestaña.');}catch{setError('Otra pestaña guardó datos inválidos. Recarga o restaura un respaldo.');}};
  window.addEventListener('storage',onStorage);const timer=setInterval(()=>{
   try{const raw=localStorage.getItem(STORE_KEY);if(!raw)return;const prev=validateState(JSON.parse(raw));const next=rotateDay(prev);if(next!==prev){next.revision++;persist(next);}}catch{/* El aviso inicial protege los datos ilegibles. */}
  },30000);return()=>{window.removeEventListener('storage',onStorage);clearInterval(timer);};
 },[]);
 const restore=raw=>{try{const next=validateState(raw);next.revision=Math.max(next.revision,stateRef.current?.revision||0)+1;if(persist(next)){notify('Respaldo restaurado correctamente.');return true;}}catch(e){notify(e.message,'error');}return false;};
 return <Context.Provider value={{state,act,notify,notice,error,restore}}>{children}</Context.Provider>;
}
export const useStore=()=>useContext(Context);
export function download(name,content,type='application/json'){
 const url=URL.createObjectURL(new Blob([content],{type}));const link=document.createElement('a');link.href=url;link.download=name;document.body.appendChild(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),1500);
}
