import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import path, { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const angularApp = new AngularNodeAppEngine();
const browserDistFolder = join(__dirname, '../browser');

// Lista de idiomas suportados
const locales = ['pt-BR', 'en'];

// =======================
// 1️⃣ Servir arquivos estáticos (qualquer extensão)
app.get(/^\/.*\..*$/, (req, res, next) => {
  // Tenta servir do root
  let fullPath = path.join(browserDistFolder, req.path);
  if (fs.existsSync(fullPath)) return res.sendFile(fullPath);

  // Tenta dentro de cada idioma
  for (const locale of locales) {
    fullPath = path.join(browserDistFolder, locale, req.path);
    if (fs.existsSync(fullPath)) return res.sendFile(fullPath);
  }

  next();
});

// =======================
// 2️⃣ Redirecionar / dinamicamente baseado no Accept-Language
app.get('/', (req, res) => {
  const acceptLang = req.headers['accept-language'] || '';
  let target = 'pt-BR'; // idioma padrão

  if (acceptLang.includes('en')) {
    target = 'en';
  }

  res.redirect(`/${target}/`);
});

// =======================
// 3️⃣ Angular Universal SSR handler
app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then(response =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

// =======================
// 4️⃣ Fallback para SPA: qualquer rota desconhecida → pt-BR/index.html
app.use((req, res) => {
  const filePath = path.join(browserDistFolder, 'pt-BR', 'index.html');
  res.sendFile(filePath);
});

// =======================
// 5️⃣ Start do servidor
if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
    console.log(`Serving locales: ${locales.join(', ')}`);
  });
}

// =======================
// 6️⃣ Request handler para Angular CLI / Cloud Functions
export const reqHandler = createNodeRequestHandler(app);
