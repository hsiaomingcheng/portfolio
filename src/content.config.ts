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

      // Case-study-only fields (used by src/pages/projects/[slug].astro)
      intro: z.string().optional(), // lead paragraph under the case study title
      role: z.string().optional(),
      timeline: z.string().optional(),
      tools: z.array(z.string()).optional(),
      status: z.string().optional(),
      decisions: z.array(z.object({ title: z.string(), text: z.string() })).optional(),
      results: z.array(z.object({ number: z.string(), label: z.string() })).optional(),
      // Small caption under the results cards (e.g. where the numbers came from).
      resultsNote: z.string().optional(),
      beforeAfter: z
        .object({
          // Optional: a labelled placeholder shows until the screenshots exist.
          before: image().optional(),
          after: image().optional(),
          beforeAlt: z.string(),
          afterAlt: z.string(),
          // Shown instead of a placeholder when there is no `after` image (e.g. not yet public).
          afterNote: z.string().optional(),
        })
        .optional(),
    }),
});

export const collections = { projects };
