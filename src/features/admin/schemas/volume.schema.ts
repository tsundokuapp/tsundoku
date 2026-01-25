import { z } from 'zod';

// TODO: fazer o number ser opcional se o oneshot for true
export const formVolumesSchema = z.object({
  type: z.literal('volume'),
  title: z.optional(z.string()),
  cover: z.optional(z.any()),
  number: z.preprocess(
    (val) => (typeof val === 'string' ? Number(val) : val),
    z
      .number()
      .min(1, { message: 'Número do volume é obrigatório' })
      .positive({ message: 'Número do volume deve ser positivo' }),
  ),
  oneshot: z.optional(z.boolean()),
  description: z.optional(z.string()),
});

export type InputFormVolumes = z.infer<typeof formVolumesSchema>;

export const formChapterSchema = z.object({
  type: z.literal('chapter'),
  title: z.optional(z.string()),
  volume: z.preprocess(
    (val) => (typeof val === 'string' ? Number(val) : val),
    z
      .number()
      .min(1, { message: 'Número do volume é obrigatório' })
      .positive({ message: 'Número do volume deve ser positivo' }),
  ),
  number: z.preprocess(
    (val) => (typeof val === 'string' ? Number(val) : val),
    z
      .number()
      .min(1, { message: 'Número do capítulo é obrigatório' })
      .positive({ message: 'Número do capítulo deve ser positivo' }),
  ),
  part: z.optional(
    z.preprocess(
      (val) => (typeof val === 'string' ? Number(val) : val),
      z.number(),
    ),
  ),
  order: z.preprocess(
    (val) => (typeof val === 'string' ? Number(val) : val),
    z
      .number()
      .min(1, { message: 'Ordem do capítulo é obrigatório' })
      .positive({ message: 'Ordem deve ser positivo' }),
  ),
});

export type InputFormChapter = z.infer<typeof formChapterSchema>;

export const unifiedVolumeAndChapterSchema = z.discriminatedUnion('type', [
  formVolumesSchema,
  formChapterSchema,
]);

export type InputFormUnifiedVolumeAndChapter = z.infer<
  typeof unifiedVolumeAndChapterSchema
>;
