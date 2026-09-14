# Portfolio – Bruno David

Sitio personal en [bruno-david.com](https://www.bruno-david.com). Angular 22 con SSR/prerender, i18n (ES/EN) con Transloco, tema claro/oscuro y formulario de contacto vía EmailJS.

## Scripts

| Comando | Descripción |
| --- | --- |
| `npm start` | Servidor de desarrollo en `http://localhost:4200` |
| `npm run build` | Build de producción en `dist/portfolio` (browser prerenderizado + server) |
| `npm test` | Tests unitarios (Vitest + jsdom) |
| `npm run serve:ssr:portfolio` | Sirve el build con Express (SSR) en `http://localhost:4000` |
| `node tools/cv/build-cv.js` | Regenera `src/assets/cv.pdf` desde `tools/cv/cv.html` (requiere Chrome) |

## Contenido

Todo el texto vive en `src/assets/i18n/es.json` y `en.json`; los componentes solo guardan claves, links, tags e imágenes. Al cambiar experiencia, proyectos o educación:

1. Editar ambos JSON (las claves deben coincidir; los tests fallan si falta una traducción).
2. Actualizar `tools/cv/cv.html` y regenerar el PDF.

## Deploy

Vercel sirve `dist/portfolio/browser` como sitio estático. `vercel.json` define los headers de seguridad (CSP, HSTS, etc.) y el fallback a `index.html`.

Los IDs de EmailJS son públicos por diseño; el abuso se limita restringiendo **Allowed origins** al dominio de producción en el dashboard de EmailJS.
