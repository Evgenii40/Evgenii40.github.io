import { getCollection } from 'astro:content';

const clean = (s: string) =>
  s
    .replace(/```/g, ' ')
    .replace(/[#>*`|\[\]]/g, ' ')
    .replace(/\s+/g, ' ')
    .toLowerCase();

export async function GET() {
  const cheats = (await getCollection('cheats')).sort(
    (a, b) => a.data.order - b.data.order
  );
  const glossary = (await getCollection('glossary')).sort((a, b) =>
    a.data.term.localeCompare(b.data.term, 'ru')
  );

  const items = [
    ...cheats.map((cheat) => ({
      url: `/cheats/${cheat.id}/`,
      title: cheat.data.title,
      tag: cheat.data.tag ?? '',
      // текст без разметки — по нему ищем
      text: clean(cheat.body ?? ''),
    })),
    ...glossary.map((entry) => ({
      url: `/glossary/#${entry.id}`,
      title: entry.data.abbr
        ? `${entry.data.term} (${entry.data.abbr})`
        : entry.data.term,
      tag: entry.data.category ?? 'Глоссарий',
      text: clean(`${entry.data.term} ${entry.data.abbr ?? ''} ${entry.body ?? ''}`),
    })),
  ];

  return new Response(JSON.stringify(items), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}
