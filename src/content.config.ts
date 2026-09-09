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

export const collections = { cheats };
