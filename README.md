# Lezato · MenuDe-Prueba — React + Vite (Edición Business & GitHub Pages)

Recreación completa y funcional inspirada en el diseño y arquitectura de **[Lezato Restaurant Admin Dashboard](https://lezato-vite.vercel.app/dashboard)**, adaptada al sistema operativo de restaurante **MenuDe-Prueba**.

## ✨ Novedades y Mejoras Principales

1. **Arquitectura y Diseño Idéntico a Lezato Dashboard (`/dashboard`)**:
   - **Fila Superior**: Cuadrícula `2×2` de tarjetas de métricas (*Total Menus*, *Total Revenue*, *Total Orders*, *Total Customers*) con **anillos circulares SVG Donut** + tarjeta **Today's Revenue** con gráfico de onda suave Bezier (*Area Wave Chart*) y badge de crecimiento (`+0.5% than last day`).
   - **Cuerpo Principal de 2 Columnas Asimétricas (`40% / 60%`)**:
     - **Columna Izquierda**: *Daily Trending Menus* (ranking `#1` a `#5` con precios, conteo `Order 89x` e icono de plato a la derecha) + *Trending Keyword* (barras de progreso horizontales y nube interactiva *Others tag*).
     - **Columna Derecha**: *Customer Map* (gráfico de barras verticales con filtros interactivos `Year`, `Monthly`, `Week`) + *Customers* (lista de miembros con badges `MEMBER` y `Regular Customer` + botón de expansión) + *Delivery Maps & Upcoming Shipping Schedule* (mapa punteado con red de nodos y programación de despachos con icono de avión y pines de ruta).
   - **Cabecera y Sidebar Lezato**: Botón hamburguesa funcional (colapsa la barra lateral en escritorio y abre menú en móvil), buscador global con autocompletado, botón *Recipe Guide / Carta*, campana de alertas con contador en vivo, monitor de despachos y selector rápido de paleta.

2. **Paleta de Colores de Negocios Optimizada (con Selector en Vivo + Modo Oscuro)**:
   - **Ejecutivo Gourmet (Activa por defecto)**: Azul Cobalto Ejecutivo (`#2563EB`) + Ámbar Culinario (`#EA580C`) + Púrpura Real (`#6C5DD3`) + Esmeralda (`#10B981`) sobre fondo Alabastro (`#F4F6FA`). Diseñada para reducir la fatiga visual en turnos largos de caja/administración y transmitir orden financiero.
   - Incluye selector en tiempo real para alternar entre **4 paletas de negocio** (*Ejecutivo Gourmet*, *Lezato Original #FF5C00*, *Esmeralda Corporativo*, *Borgoña & Oro Bistro*) y **Modo Claro / Modo Oscuro (`Dashboard Light` / `Dashboard Dark`)**.

3. **Sistema 100% Funcional con Persistencia Local (`localStorage`)**:
   - **Salón y Mesas (POS)**: 8 mesas interactivas, filtro de carta por categorías, control de cantidades `+`/`−` y envío directo a Cocina.
   - **Cocina (KDS Kanban)**: Flujo en vivo *Pendiente → En preparación → Listo → Entregado*.
   - **Caja y Cobros Acumulados**: Liquidación por *Yape, Plin, Efectivo o Tarjeta*. Liberar una mesa conserva intacto el dinero cobrado en el historial diario.
   - **Resumen del Día + Botón "Reiniciar día"**: Muestra el acumulado cobrado en la fecha actual de Perú (`America/Lima`) e incluye el botón **Reiniciar día** con diálogo de confirmación integrado que restablece el acumulado diario a `S/ 0.00` sin afectar pedidos activos ni inventario.
   - **Inventario, Clientes, Reseñas y Tareas (Task)**: Altas, bajas, edición de productos, categorías, movimientos de stock y checklist operativo.

---

## 🚀 Cómo desplegar en GitHub Pages (2 Opciones Listas)

### Opción A: Despliegue Instantáneo sin Compilar (Carpeta `/docs`)
1. Sube todos los archivos de este proyecto a tu repositorio de GitHub.
2. En tu repositorio de GitHub, ve a **Settings → Pages**.
3. En **Build and deployment → Source**, elige **Deploy from a branch**.
4. Selecciona la rama `main` (o `master`) y la carpeta **`/docs`**, y haz clic en **Save**.
5. ¡Listo! La carpeta `/docs` ya incluye la versión compilada (`docs/index.html` y `docs/404.html`).

### Opción B: Despliegue Automático con GitHub Actions (Vite Build)
1. El proyecto ya incluye `.github/workflows/deploy.yml` y `vite.config.js` con `base: './'`.
2. En GitHub, ve a **Settings → Pages** y en **Source** selecciona **GitHub Actions**.
3. En cada `git push` a `main`, GitHub instalará dependencias, ejecutará `npm run build` y publicará `dist/` automáticamente.

---

## 💻 Ejecución Local en Desarrollo

```bash
npm install
npm run dev
```
