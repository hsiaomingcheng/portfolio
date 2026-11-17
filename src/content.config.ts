import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      // Shown on the home page cards
      title: z.string(),
      cardTitle: z.string(),
      summary: z.string(),
      category: z.string(),
      tags: z.array(z.string()),
      featured: z.boolean().default(false),
      order: z.number(),
      cover: image().optional(),
      coverAlt: z.string().optional(),
      links: z
        .object({
          live: z.url().optional(),
          github: z.url().optional(),
        })
        .optional(),
      hasCaseStudy: z.boolean().default(false),
      highlights: z.array(z.string()).optional(),

      // Case-study-only fields (used from Phase 7)
      role: z.string().optional(),
      timeline: z.string().optional(),
      tools: z.array(z.string()).optional(),
      status: z.string().optional(),
      decisions: z.array(z.object({ title: z.string(), text: z.string() })).optional(),
      results: z.array(z.object({ number: z.string(), label: z.string() })).optional(),
      beforeAfter: z
        .object({
          before: image(),
          after: image(),
          beforeAlt: z.string(),
          afterAlt: z.string(),
        })
        .optional(),
    }),
});

export const collections = { projects };
