import { getCollection } from 'astro:content';

export async function GET({ site }) {
  const cheats = (await getCollection('cheats')).sort(
    (a, b) => a.data.order - b.data.order
  );

  const base = site ?? new URL('https://konfig-hab.ru');
  const paths = ['/', '/cheats/', ...cheats.map((cheat) => `/cheats/${cheat.id}/`)];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map((path) => `  <url><loc>${new URL(path, base).href}</loc></url>`).join('\n')}
</urlset>
`;

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
}
