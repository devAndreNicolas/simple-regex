import fs from 'fs';
import path from 'path';

const browserFolder = path.join(process.cwd(), 'dist/regex-generator-app/browser');
const locales = ['pt-BR', 'en']; // idiomas suportados

let redirectsContent = '';

// 1️⃣ Redirecionamento raiz -> idioma padrão
redirectsContent += `/          /pt-BR/ 302\n`;

// 2️⃣ Rotas de cada idioma
locales.forEach(locale => {
  redirectsContent += `/${locale}/*    /${locale}/index.html 200\n`;
});

// 3️⃣ Assets (favicon, imagens, scripts, etc.)
redirectsContent += `/favicon.ico /favicon.ico 200\n`;
redirectsContent += `/assets/*    /assets/:splat 200\n`;

// 4️⃣ Outros arquivos que podem existir na raiz
redirectsContent += `/site.webmanifest /site.webmanifest 200\n`;
redirectsContent += `/apple-touch-icon.png /apple-touch-icon.png 200\n`;
redirectsContent += `/favicon-16x16.png /favicon-16x16.png 200\n`;
redirectsContent += `/favicon-32x32.png /favicon-32x32.png 200\n`;
redirectsContent += `/og.png /og.png 200\n`;
redirectsContent += `/twitter.png /twitter.png 200\n`;

const filePath = path.join(browserFolder, '_redirects');

// Cria a pasta browser caso não exista
if (!fs.existsSync(browserFolder)) {
  fs.mkdirSync(browserFolder, { recursive: true });
}

// Escreve o arquivo
fs.writeFileSync(filePath, redirectsContent, 'utf-8');

console.log('✅ _redirects gerado automaticamente em browser/_redirects');
