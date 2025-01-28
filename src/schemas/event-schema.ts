import { z } from 'zod';

export const eventSchema = z.object({
  id: z.string(),
  date: z.string(),
  title: z.string().min(5),
  description: z.string().min(5),
  hour: z.string(),
});

export type Event = z.infer<typeof eventSchema>;
