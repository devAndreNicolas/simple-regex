import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import path, { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import compression from 'compression';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const angularApp = new AngularNodeAppEngine();
const browserDistFolder = join(__dirname, '../browser');

// =======================
// 0️⃣ Ativar compressão
app.use(compression());

// =======================
// 1️⃣ Servir arquivos estáticos (favicon, assets, etc.)
app.use(express.static(browserDistFolder, { maxAge: '1y', index: false }));

// =======================
// 2️⃣ Angular Universal SSR handler
app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) => (response ? writeResponseToNodeResponse(response, res) : next()))
    .catch(next);
});

// =======================
// 3️⃣ Start do servidor
if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

// =======================
// 4️⃣ Request handler para Angular CLI / Cloud Functions
export const reqHandler = createNodeRequestHandler(app);
