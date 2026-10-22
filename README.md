# MenuDe-Prueba — React + Vite

Versión corregida del panel administrativo.

## Cambios principales

- Diseño reajustado para seguir mucho más de cerca la estructura visual del dashboard de Lezato.
- Tipografía principal: **Poppins**.
- Paleta propia turquesa + violeta.
- Sidebar clara, cabecera superior, tarjetas y dashboard con proporciones más cercanas a la referencia.
- Menú simplificado: **Dashboard**, **Inventario** y **Gráficos → Flot**.
- Se eliminaron del menú **Formularios** y **Tablas**, además de los grupos retirados previamente.
- Inventario conserva altas, edición y eliminación de productos.
- Se conservan los submenús personalizados para agregar o quitar accesos.
- Persistencia local mediante `localStorage`.

## Ejecutar

```bash
npm install
npm run dev
```

Luego abre la URL que indique Vite, normalmente `http://localhost:5173`.


## Cobros acumulados

Los cobros registrados en **Caja** se guardan en un historial persistente (`localStorage`) y el **Resumen del día** suma todos los pagos realizados en la fecha local de Perú. Liberar una mesa no borra el dinero cobrado.

## Cambio: reinicio del resumen diario
- En Resumen del día se añadió el botón **Reiniciar día**.
- Borra únicamente los cobros registrados en la fecha actual.
- Reinicia el acumulado de Resumen y Dashboard a S/ 0.00.
- No modifica pedidos activos ni inventario.
