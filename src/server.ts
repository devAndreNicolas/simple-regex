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

/**
 * Serve arquivos estáticos com qualquer extensão
 * usando regex para evitar erro do path-to-regexp.
 */
app.get(/^\/.*\..*$/, (req, res, next) => {
  // Primeiro tenta servir do root
  const fullPath = path.join(browserDistFolder, req.path);
  if (fs.existsSync(fullPath)) {
    return res.sendFile(fullPath);
  }

  // Tenta servir dentro das pastas de idioma
  const locales = ['pt-BR', 'en']; // Adicione outros idiomas se houver
  for (const locale of locales) {
    const localePath = path.join(browserDistFolder, locale, req.path);
    if (fs.existsSync(localePath)) {
      return res.sendFile(localePath);
    }
  }

  next();
});

/**
 * Rota principal do Angular Universal
 */
app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

/**
 * Start do servidor
 */
if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler usado pelo Angular CLI ou Cloud Functions
 */
export const reqHandler = createNodeRequestHandler(app);
