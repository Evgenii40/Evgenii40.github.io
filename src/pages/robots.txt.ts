import { STAGE } from '../site';

export function GET() {
  const body =
    STAGE === 'preview'
      ? 'User-agent: *\nDisallow: /\n'
      : 'User-agent: *\nAllow: /\n\nSitemap: https://konfig-hab.ru/sitemap.xml\n';

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
