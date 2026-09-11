// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://konfig-hab.ru',
  devToolbar: { enabled: false },
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: 'Inter',
      cssVariable: '--font-sans',
      weights: [400, 500, 600, 700],
      styles: ['normal'],
      subsets: ['cyrillic', 'latin'],
      fallbacks: ['system-ui', 'sans-serif'],
      optimizedFallbacks: true,
      display: 'swap',
    },
  ],
  markdown: {
    // тёплая тема подсветки кода вместо холодной github-dark
    shikiConfig: { theme: 'vitesse-dark' },
  },
  vite: {
    plugins: [
      {
        // В dev-режиме Astro отдаёт шрифты с Cache-Control: no-store, поэтому
        // браузер качает их заново при каждом переходе и текст «моргает».
        // Кэшируем только файлы шрифтов; в сборке этот плагин не работает.
        name: 'cache-fonts-in-dev',
        enforce: 'pre',
        configureServer(server) {
          server.middlewares.use((req, res, next) => {
            if (req.url && req.url.includes('/_astro/fonts/')) {
              const cache = 'public, max-age=31536000, immutable';
              const setHeader = res.setHeader.bind(res);
              const writeHead = res.writeHead.bind(res);
              res.setHeader = (name, value) =>
                String(name).toLowerCase() === 'cache-control'
                  ? setHeader(name, cache)
                  : setHeader(name, value);
              res.writeHead = (status, ...rest) => {
                const idx = rest.findIndex(
                  (a) => a && typeof a === 'object' && !Array.isArray(a),
                );
                if (idx !== -1) {
                  rest[idx] = { ...rest[idx], 'Cache-Control': cache };
                } else {
                  setHeader('Cache-Control', cache);
                }
                return writeHead(status, ...rest);
              };
            }
            next();
          });
        },
      },
    ],
  },
});
