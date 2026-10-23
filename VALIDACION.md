# Validación de la entrega

- **25 pruebas del modelo:** flujo pedido-cocina-cobro, acumulación, prevención de duplicados, vuelto, stock, anulaciones, precios históricos, categorías, clientes, cambio de día en Lima, cierres, migración y validación de respaldos.
- **4 pruebas de interfaz en DOM simulado:** dos pedidos cobrados con cierre, creación de categoría/producto y reposición, clientes/reseñas/paleta, y navegación/persistencia después de recargar.
- **Compilación de producción completada** con Vite. `docs` contiene el resultado ya compilado.
- **Recursos estáticos verificados:** scripts, estilos, fuentes, favicon, rutas relativas, licencias y `.nojekyll`.

Ejecutar `npm test` repite las pruebas de lógica e interacción. Las pruebas de interfaz usan jsdom y no verifican el renderizado visual ni la impresión.

La referencia pública de Lezato se inspeccionó visualmente. La revisión visual del resultado final no pudo realizarse en el navegador remoto de este entorno: el servidor local no era accesible y el navegador no permite abrir archivos locales. No se afirma una comparación de píxeles ni una prueba visual en dispositivos reales. Los estilos incluyen puntos de adaptación para escritorio, tableta y móvil.

La publicación real en GitHub Pages requiere subir los archivos y activar Pages en la cuenta del usuario; no se realizó un despliegue en esta entrega.
