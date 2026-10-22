# Lezato · MenuDe-Prueba — Edición Precompilada para GitHub Pages (Cero Pantalla en Blanco)

## ✅ Por qué antes salía en blanco en GitHub Pages y cómo está solucionado

1. **Causa del problema en GitHub Pages**:
   - Cuando activas GitHub Pages desde una rama (`Deploy from a branch -> main / root`), GitHub sirve `index.html` como archivo estático.
   - Si `index.html` apunta a `/src/main.jsx` (código React sin compilar) o si los archivos quedaron dentro de una subcarpeta `MenuDe-Prueba-react/`, el navegador no puede ejecutar archivos `.jsx` directamente y muestra una página en blanco.

2. **Solución incluida en este `.zip`**:
   - **Precompilación completa a JavaScript puro (`./assets/app.js`)**: Compilado con `@babel/core` + `@babel/preset-react`, sin archivos `.jsx` en tiempo de ejecución.
   - **Pre-renderizado HTML estático (SSR) dentro de `<div id="root">`**: El panel principal ya viene pre-renderizado en el propio `index.html`, por lo que carga visualmente desde el primer milisegundo.
   - **Motor local autónomo (`./assets/react-fallback.js`)**: No depende de ningún CDN externo que pueda fallar o bloquearse.
   - **Triple ruta compatible (`/`, `/docs` y `/MenuDe-Prueba-react`)**: Funciona sin importar si subes los archivos sueltos a la raíz, si eliges la carpeta `/docs`, o si subes la carpeta `MenuDe-Prueba-react`.
