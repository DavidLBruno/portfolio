# Portfolio – Bruno David

Sitio personal en [bruno-david.com](https://www.bruno-david.com). Angular 22 con SSR/prerender, i18n (ES/EN) con Transloco, tema claro/oscuro y formulario de contacto vía EmailJS.

## Scripts

| Comando | Descripción |
| --- | --- |
| `npm start` | Servidor de desarrollo en `http://localhost:4200` |
| `npm run build` | Build de producción en `dist/portfolio` (browser prerenderizado + server) |
| `npm test` | Tests unitarios (Vitest + jsdom) |
| `npm run serve:ssr:portfolio` | Sirve el build con Express (SSR) en `http://localhost:4000` |
| `node tools/cv/build-cv.js` | Generador alternativo desde HTML (requiere Chrome; sobrescribe el PDF de Canva) |

## Contenido

Todo el texto vive en `src/assets/i18n/es.json` y `en.json`; los componentes solo guardan claves, links, tags e imágenes. Al cambiar experiencia, proyectos o educación:

1. Editar ambos JSON (las claves deben coincidir; los tests fallan si falta una traducción).
2. Actualizar el [CV en Canva](https://www.canva.com/design/DAFJ_al7SH8/ReO1xqN0Gv_MoWYAqzRJRQ/edit), descargar todas las páginas como PDF digital y reemplazar `src/assets/cv.pdf`.

El CV publicado proviene de Canva. `tools/cv/cv.html` y su generador se conservan como alternativa; no regenerar el PDF desde HTML si se quiere mantener el diseño de Canva.

## Deploy

Vercel sirve `dist/portfolio/browser` como sitio estático. `vercel.json` define los headers de seguridad (CSP, HSTS, etc.) y el fallback a `index.html`.

El build de producción desactiva `optimization.styles.inlineCritical` para que Angular cargue el CSS sin generar eventos `onload` inline, bloqueados por `script-src 'self'`. `npm run build` verifica automáticamente que el HTML generado sea compatible con esta restricción.

Los IDs de EmailJS son públicos por diseño; el abuso se limita restringiendo **Allowed origins** al dominio de producción en el dashboard de EmailJS.
