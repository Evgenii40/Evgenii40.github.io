import { getCollection } from 'astro:content';

export async function GET() {
  const cheats = (await getCollection('cheats')).sort(
    (a, b) => a.data.order - b.data.order
  );

  const items = cheats.map((cheat) => ({
    url: `/cheats/${cheat.id}/`,
    title: cheat.data.title,
    tag: cheat.data.tag ?? '',
    // текст без разметки — по нему ищем
    text: (cheat.body ?? '')
      .replace(/```/g, ' ')
      .replace(/[#>*`|\[\]]/g, ' ')
      .replace(/\s+/g, ' ')
      .toLowerCase(),
  }));

  return new Response(JSON.stringify(items), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}
