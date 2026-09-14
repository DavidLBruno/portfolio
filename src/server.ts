import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { join } from 'node:path';

const browserDistFolder = join(import.meta.dirname, '../browser');

const app = express();
// Hosts the SSR engine may render for (SSRF protection). Extend with NG_ALLOWED_HOSTS
// (comma separated) when serving behind another domain.
const allowedHosts = [
  'localhost',
  'bruno-david.com',
  'www.bruno-david.com',
  ...(process.env['NG_ALLOWED_HOSTS']
    ?.split(',')
    .map(h => h.trim())
    .filter(Boolean) ?? []),
];
const angularApp = new AngularNodeAppEngine({ allowedHosts });

// Security headers for the Node server. The Vercel deployment applies the
// same set through vercel.json; keep both in sync.
app.use((_req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=()',
  );
  next();
});

// Serve static files from /browser
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

// Handle all other requests by rendering the Angular application.
app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then(response =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

// Start the server if this module is the main entry point.
if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, error => {
    if (error) {
      throw error;
    }
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

// Request handler used by the Angular CLI (dev-server and build).
export const reqHandler = createNodeRequestHandler(app);
