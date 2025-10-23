import fs from 'fs';
import path from 'path';

const browserDir = path.join(process.cwd(), 'dist/regex-generator-app/browser');
const locales = ['pt-BR', 'en']; // suas pastas de idioma

for (const locale of locales) {
  const localeDir = path.join(browserDir, locale);
  const filesToCopy = [
    'favicon.ico',
    'favicon-16x16.png',
    'favicon-32x32.png',
    'apple-touch-icon.png',
    'og.png',
    'twitter.png',
    'site.webmanifest'
  ];

  for (const file of filesToCopy) {
    const src = path.join(localeDir, file);
    const dest = path.join(browserDir, file);
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, dest);
      console.log(`Copied ${file} from ${locale} to browser root`);
    }
  }
}

console.log('Assets copied to browser root.');