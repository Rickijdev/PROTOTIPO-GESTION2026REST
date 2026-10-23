# MenuDe-Prueba · Gestión de restaurante

Aplicación React para mesas, pedidos, cocina, caja e inventario, preparada para GitHub Pages. Rediseño basado en la distribución de Lezato, con una implementación propia y una paleta verde petróleo. Incluye una segunda paleta naranja seleccionable en **Configuración y respaldo**.

## Publicar en GitHub Pages sin instalar nada

La carpeta **`docs` ya está compilada** y lista para publicar.

1. Descomprime el ZIP.
2. Abre la carpeta `MenuDe-Prueba-react`.
3. Crea un repositorio en GitHub. Para GitHub Pages con una cuenta gratuita, utiliza un repositorio público.
4. En el repositorio entra a **Add file → Upload files**.
5. Sube **el contenido de `MenuDe-Prueba-react`**, de manera que `package.json`, `src` y `docs` queden en la raíz del repositorio. **No subas el ZIP ni una carpeta adicional que los envuelva**.
6. Guarda los cambios con **Commit changes**.
7. Abre **Settings → Pages**.
8. En **Build and deployment → Source**, elige **Deploy from a branch**.
9. Selecciona la rama **main** (o la rama que hayas usado), carpeta **/docs**, y pulsa **Save**.
10. Cuando GitHub termine, abre **Visit site** desde esa misma página. La publicación puede tardar unos minutos.

No tienes que cambiar el nombre del repositorio en el código. Los recursos usan rutas relativas y las pantallas rutas `#/...`, por lo que recargar una sección no genera un error 404.

**Esta entrega está preparada para publicar; no se ha publicado en una cuenta de GitHub.**

### Publicación automática al modificar el código

El proyecto incluye `.github/workflows/deploy.yml` y `package-lock.json`.

1. Sube también la carpeta `.github`.
2. En **Settings → Pages → Source**, selecciona **GitHub Actions**.
3. En **Actions → Publicar MenuDe en GitHub Pages → Run workflow**, ejecuta el flujo sobre la rama principal. También se ejecuta al hacer un push a `main` o `master` si es la rama predeterminada.
4. El flujo instala dependencias, ejecuta las pruebas, compila y publica `dist`.

Elige una de las dos formas de publicación. Si publicas desde `/docs` y después modificas `src`, ejecuta `npm run build` y sube también la carpeta `docs` actualizada.

## Abrir y editar en Visual Studio Code

Requisito: **Node.js 24 LTS**, o una versión compatible ≥ 22.12.

1. Abre Visual Studio Code.
2. Selecciona **File → Open Folder** y abre `MenuDe-Prueba-react` (la carpeta que contiene `package.json`).
3. Abre **Terminal → New Terminal**.
4. Ejecuta:

```bash
npm ci
npm run dev
```

5. Abre la dirección indicada por Vite, normalmente `http://127.0.0.1:5173`.

Para comprobar la compilación de publicación:

```bash
npm test
npm run build
npm run preview
```

`npm ci` instala las versiones exactas de `package-lock.json`. **No reemplaza el diseño ni modifica `src`**. No abras `index.html` con doble clic; la aplicación debe servirse por HTTP, con Vite o GitHub Pages.

## Primer uso

- Si no hay datos anteriores, aparece un aviso visible de **datos de ejemplo**. El catálogo, las ventas y los clientes iniciales sirven para explorar el sistema.
- En **Configuración y respaldo → Comenzar con mis datos**, puedes retirar la actividad de ejemplo. Se conserva la carta y el stock queda en cero para registrar tus existencias reales desde **Inventario → Movimientos**.
- No hay un inicio de sesión simulado: esta edición funciona localmente en el navegador.
- Si el mismo navegador y origen contienen los datos de la versión anterior (`menu-prueba-*`), se importan automáticamente al primer inicio. Las claves anteriores se conservan. Los importes anteriores se mantienen, incluso si un pedido tenía un total diferente a la suma de los precios actuales. Los pedidos importados no reponen stock al anularse, porque la versión anterior no lo descontaba. Un producto importado con precio cero requiere completar su precio para venderlo.
- Al cambiar de dominio o puerto se utiliza un almacenamiento distinto. La migración automática no puede leer los datos de otro dominio; exporta e importa un respaldo desde esta versión para trasladarlos.

## Flujo de trabajo

1. **Mesas y pedidos**: selecciona una mesa libre o pulsa **Nuevo pedido**. También puedes elegir **Para llevar**.
2. Agrega productos, ajusta cantidades, asocia un cliente y escribe indicaciones para cocina.
3. **Enviar a cocina** registra el pedido y descuenta el stock. Rechaza cantidades no disponibles y mesas ocupadas.
4. En **Cocina**, avanza por **Pendiente → En preparación → Listo → Entregado**.
5. En **Caja**, verifica el pago recibido y selecciona **Efectivo, Yape, Plin o Tarjeta**. En efectivo se calcula el vuelto.
6. Confirma el cobro. La mesa se libera y el dinero **se suma** a los cobros anteriores de la jornada. Un pedido no puede cobrarse dos veces.
7. Puedes imprimir una **constancia interna**, que no es un comprobante fiscal SUNAT.
8. **Resumen del día → Reiniciar día** guarda el cierre y abre otra jornada con S/ 0.00. Los cobros quedan en **Historial completo**; los pedidos activos y el inventario no se borran.

Las fechas y los cambios de día usan la zona horaria **America/Lima**. El cambio de fecha cierra la jornada anterior automáticamente al volver a operar o durante la actualización periódica de la aplicación.

## Módulos incluidos

| Módulo | Funciones |
|---|---|
| Panel principal | Indicadores calculados, ventas por hora, productos más vendidos, clientes y mapa interactivo del salón. |
| Mesas y pedidos | Mesas ocupadas/libres, pedidos para llevar, cantidades, cliente y notas. |
| Cocina | Avance de estados y orden de atención. |
| Caja | Cobros acumulados, métodos de pago, vuelto y constancias imprimibles. |
| Resumen del día | Jornada actual, historial, filtro de fecha, CSV y cierres sin perder datos. |
| Pedidos y detalle | Búsqueda, estados, ordenamiento, paginación, historial y anulación con reposición opcional. |
| Clientes | Alta, edición, retiro del directorio y consumo calculado a partir de cobros. |
| Analítica | Ingresos, ticket promedio, ventas por producto y métodos de pago. |
| Reseñas | Registro interno, calificaciones y respuestas guardadas. No envía mensajes a terceros. |
| Productos | Alta, edición, retiro de la carta, filtros, stock mínimo y CSV. |
| Categorías | Alta, renombrado y eliminación de categorías vacías. |
| Movimientos | Entradas, salidas, ajustes y trazabilidad del stock. |
| Gráficos → Flot | Flot real, gráficos de líneas/barras y datos conectados a los cobros. |
| Personalizados | Crear, editar y eliminar secciones con notas persistentes. |
| Configuración | Nombre del negocio, administrador, mesas, paletas y respaldos. |

Se mantiene el menú principal simplificado: **Dashboard, Inventario y Gráficos → Flot**. No se reincorporan los grupos de formularios ni tablas de demostración.

## Datos y alcance

- Los datos se guardan en **localStorage del navegador**. GitHub Pages aloja archivos estáticos: no ejecuta Node, PHP ni una base SQL.
- Esta edición es funcional para operar en **un navegador/dispositivo**. No incluye cuentas autenticadas, permisos por usuario, sincronización entre cajas/cocina en equipos distintos ni una base compartida.
- Yape, Plin y Tarjeta son **registros de pagos que ya recibiste**; la aplicación no procesa cargos ni verifica transferencias.
- El stock representa unidades vendibles. No incluye recetas de insumos, costos ni contabilidad tributaria.
- Los respaldos JSON permiten trasladar todos los datos. Importarlos reemplaza el estado actual, previa validación y confirmación. CSV sirve para consultar registros en Excel.
- Eliminar productos/clientes los retira de las listas activas y conserva las referencias históricas. Anular un pedido conserva el historial; puedes decidir si sus unidades vuelven al inventario.
- Borrar los datos del navegador elimina el almacenamiento local. Exporta respaldos periódicos y no los subas a un repositorio público si contienen información real.

## Organización del proyecto

```text
src/
  App.jsx                 Menú, cabecera, buscador y navegación por hash
  model.js                Operaciones, validación, dinero y migración
  store.jsx               Persistencia y transacciones del estado
  styles.css              Diseño y adaptación a pantallas pequeñas
  components/UI.jsx       Componentes y gráficos de la interfaz
  pages/Dashboard.jsx     Panel, analítica y Flot
  pages/Operations.jsx    Mesas, cocina, caja, resumen y pedidos
  pages/Management.jsx    Inventario, clientes, reseñas y configuración
public/favicon.svg        Icono propio
scripts/prepare-pages.mjs Copia la compilación a docs
scripts/build-ui-test.mjs Genera la versión de prueba de interfaz
.github/workflows/        Publicación automática
tests/                   Pruebas del sistema y de interfaz
docs/                    Versión compilada lista para GitHub Pages
```

`node_modules` no se incluye en el ZIP; se obtiene con `npm ci`. El ZIP incluye `docs` compilada. `dist` se genera con `npm run build`.

## Diseño y fuentes

- Referencia solicitada: https://lezato-vite.vercel.app/dashboard
- La versión Vite redirigió a una pantalla de acceso durante la revisión. Se utilizó también el dashboard público oficial de la misma plantilla: https://lezato.dexignzone.com/xhtml/index.html
- Se recrean la distribución, la navegación blanca, las tarjetas redondeadas, el estilo de tipografía y la jerarquía visual, adaptados al sistema del ZIP. No es una copia del paquete comercial ni incluye su código, fotografías o licencia.
- Fuentes **MuseoModerno** y **Open Sans**, iconos **Lucide** y gráficos **Flot**, incluidos localmente. Las miniaturas de comida son ilustraciones CSS propias. Véase `THIRD_PARTY_NOTICES.md`.
- Paletas y razones de uso: `PALETA.md`.

Documentación de publicación consultada:

- https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
- https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages
- https://vite.dev/guide/static-deploy.html
