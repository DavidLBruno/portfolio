# Revisión del portfolio

Fecha: 15 de septiembre de 2026.

## Actualización posterior a la revisión

- Expenses es el proyecto principal: ficha destacada, logo SVG oficial y enlace a https://expense.com.ar/.
- Su descripción incorpora finanzas personales y compartidas, cuotas, inversiones, PWA, GCP y Flutter. La app móvil está en prueba cerrada en Google Play.
- La ficha ya no carga gastos_compartidos.png: el archivo pesado se conserva como recurso antiguo.
- Preferencias se rediseñó con radios nativos, vistas previas de temas, cierre visible, título accesible y guardado inmediato. Se verificaron ambos idiomas, temas, móvil, Escape y contención del foco.
- Último build: 752,47 KB iniciales sin comprimir; transferencia estimada de 173,54 KB. Las cifras siguientes corresponden a la revisión inicial.
- Las 36 pruebas existentes pasan, incluidas las actualizadas para interactuar con los nuevos controles.


## Diagnóstico

El portfolio tiene una base sólida: componentes por sección, contenido centralizado en español e inglés, tema claro/oscuro, prerender de cuatro rutas, pruebas unitarias y verificación de CSP después del build. La mejora más importante es mostrar pruebas concretas del trabajo: interfaces reales, decisiones técnicas y resultados. Hoy varias tarjetas usan imágenes ilustrativas y descripciones demasiado breves para evaluar el aporte del desarrollador.

## Cambios implementados

- Marca de navegación y favicon SVG, conservando la forma de la marca original y sumando el acento violeta. El archivo sustituye en la navegación un PNG de 64 KB.
- Seis íconos de proyecto consistentes con Font Awesome, ya instalado; ícono de GitHub para los repositorios. Los campos de íconos anteriores no se renderizaban.
- Captura real de la portada del portfolio en su tarjeta. Las otras portadas se conservan hasta contar con capturas representativas de cada producto.
- Imágenes con proporción 16:9, espacio reservado y decodificación asíncrona. Se mantiene la carga diferida.
- Repositorio y demo siempre visibles, con área interactiva mínima de 44 px de alto y nombres accesibles que identifican el proyecto.
- Texto de inicio más breve en ambos idiomas, apoyado en las tecnologías y experiencia ya presentes.
- Enlace para saltar al contenido, región principal, foco visible, identificación de la página activa y respeto por la preferencia de movimiento reducido.
- Un único h1 en Experiencia; la sección de proyectos pasa a h2.
- Los elementos atenuados por el filtro vuelven a permitir interacción con mouse, manteniendo el comportamiento de resaltar coincidencias.

## Próximas mejoras, por prioridad

| Prioridad | Área | Hallazgo y propuesta | Criterio de aceptación |
| --- | --- | --- | --- |
| Alta | Contenido | Mostrar primero 2–3 casos destacados. Para cada uno: problema, rol personal, decisiones, stack y resultado verificable. Evitar inventar métricas. | Un visitante puede entender en un minuto qué hiciste y qué resolviste. |
| Alta | Imágenes | Reemplazar las otras ilustraciones por capturas reales de pantallas relevantes, con datos de demostración. | Las portadas muestran funcionalidades efectivamente implementadas. |
| Alta | Peso de imágenes | `gastos_compartidos.png` pesa 1.225.237 bytes. Generar variantes WebP/AVIF y tamaños adaptables al ancho de tarjeta; revisar también foto y nueva captura. | Medir bytes transferidos antes/después y verificar legibilidad visual. No se realizó esta conversión en esta revisión. |
| Alta | Modal de contacto | El componente maneja Escape, pero no implementa contención de foco ni restauración al cerrar. | Tab y Shift+Tab permanecen en el diálogo; al cerrar se recupera el foco del botón que lo abrió. |
| Media | SEO | El título, canonical y metadatos sociales del documento apuntan al inicio; las rutas no definen títulos propios. | Cada ruta prerenderizada tiene título, descripción y canonical específicos; agregar una portada social horizontal. |
| Media | Carga inicial | Las cuatro rutas importan sus componentes directamente. El build actual suma 775,06 KB sin comprimir, con transferencia estimada de 180,43 KB. Evaluar carga diferida de secciones y del modal de contacto. | Comparar el paquete inicial y la navegación posterior antes/después; mantener el prerender. |
| Media | Accesibilidad | Revisar contraste de textos secundarios y elementos atenuados en ambos temas. El filtro ordena y resalta, pero conserva todo. | Auditoría de contraste y recorrido completo por teclado; aclarar al usuario que se resaltan coincidencias. |
| Media | Navegación | Los proyectos aparecen después de toda la experiencia laboral. | Agregar acceso directo a proyectos destacados desde Inicio o un índice en Experiencia. |
| Media | Contacto y operación | El envío depende de EmailJS y la configuración externa de orígenes permitidos. | Verificar el dominio permitido en el servicio y probar entrega con un envío autorizado; ofrecer contacto alternativo visible. |
| Baja | Mantenimiento | Hay recursos de íconos antiguos que ya no se usan en las tarjetas. La ruta `tecnologies` contiene una errata. | Retirar recursos solo tras comprobar referencias; si se renombra la ruta, mantener una redirección. |

## Verificación y límites

- Build de producción correcto; cuatro rutas prerenderizadas.
- Control de CSP aprobado para los cinco HTML generados.
- 36 pruebas existentes aprobadas en 11 archivos.
- Revisión visual local de Inicio y tarjetas de proyectos; temas claro y oscuro; tarjetas a 390 px de ancho sin desbordamiento horizontal y con imágenes cargadas.
- No se enviaron mensajes ni se publicaron cambios. No se verificaron la disponibilidad de demos externas, la configuración del proveedor de correo ni métricas de usuarios reales.
- Esta es una revisión de código y presentación, no una auditoría exhaustiva de seguridad ni una medición Lighthouse/Core Web Vitals.
