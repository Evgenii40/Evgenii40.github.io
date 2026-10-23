// Стадия публикации сайта.
// 'preview' — фаза 1: закрытый фидбек. Сайт виден только тем, кому дали адрес
//             GitHub Pages: meta noindex, robots.txt с Disallow, пустая карта сайта.
// 'public'  — фаза 2: сайт открыт для всех — обычные robots.txt и sitemap.xml.
export const STAGE: 'preview' | 'public' = 'preview';
