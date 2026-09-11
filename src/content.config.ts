import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const cheats = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/cheats' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    order: z.number(),
    // Категория шпаргалки, например «Интеграция» или «Запросы»
    tag: z.string().optional(),
  }),
});

const glossary = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/glossary' }),
  schema: z.object({
    // Короткое название термина/аббревиатуры (заголовок записи)
    term: z.string(),
    // Расшифровка или полное название (показывается рядом с term)
    abbr: z.string().optional(),
    // Раздел глоссария: Общее / Интеграция / Администрирование / Настройка
    category: z.string(),
  }),
});

export const collections = { cheats, glossary };
