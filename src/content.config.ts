import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    canonicalUrl: z.string().url().optional(),
    draft: z.boolean().default(false),
  }),
});

const events = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/events' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    // Start of the event. Use ISO strings: "2026-08-15" (all-day) or "2026-08-15T18:00".
    startDate: z.coerce.date(),
    endDate: z.coerce.date().optional(),
    // Human-readable location name (e.g. "Adobe HQ").
    location: z.string().optional(),
    // Precise address used for the Google Maps embed. Falls back to `location` if omitted.
    address: z.string().optional(),
    image: z.string().optional(),
    // Optional external link (registration, RSVP, ticket page).
    url: z.string().url().optional(),
    draft: z.boolean().default(false),
  }),
});

const videos = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/videos' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    // The 11-character YouTube video ID (e.g. "dQw4w9WgXcQ" — the part after "v=" in the URL).
    youtubeId: z.string().min(5),
    // Optional override for the social share image. Defaults to the YouTube maxres
    // thumbnail; set this only for older videos that lack a maxresdefault.jpg.
    socialImage: z.string().optional(),
    // Optional start offset in seconds — the embedded player begins playback here.
    // Useful for linking to a specific moment in a long video (e.g. a keynote segment).
    startTime: z.number().int().nonnegative().optional(),
    // Tags used by the filter tabs on /videos. Lowercase, e.g. ["talks", "demos"].
    topics: z.array(z.string()).default([]),
    pubDate: z.coerce.date(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog, events, videos };
