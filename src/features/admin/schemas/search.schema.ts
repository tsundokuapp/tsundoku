import { z } from 'zod';

export const formSearchSchema = z.object({
  search: z.string().min(1, { message: 'Digite uma obra para pesquisar' }),
});

export type InputFormSearch = z.infer<typeof formSearchSchema>;
