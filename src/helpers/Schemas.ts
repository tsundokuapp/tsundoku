import { z } from 'zod';

const MAX_FILE_SIZE = 5000000; // 5MB
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

export const formProjectSchema = z.object({
  title: z.string().min(1, { message: 'Título é obrigatório' }),
  aliasTitle: z.string().min(1, { message: 'Alias é obrigatório' }),
  titleAlternative: z
    .string()
    .min(1, { message: 'Título alternativo é obrigatório' }),
  author: z.string().min(1, { message: 'Autor é obrigatório' }),
  illustration: z.string().min(1, { message: 'Ilustrador é obrigatório' }),
  yearRelease: z.custom(
    (value) => {
      const valueOk = typeof value === 'string' ? /^\d{4}$/.test(value) : false;
      const valueValid =
        parseInt(value) >= 1900 && parseInt(value) <= new Date().getFullYear();
      return valueOk && valueValid;
    },
    {
      message: `Ano de lançamento deve ser entre 1900 e ${new Date().getFullYear()}`,
    },
  ),
  synopsis: z.string().min(1, { message: 'Descrição é obrigatória' }),
  status: z.string({ message: 'Status é obrigatório' }),
  genres: z
    .array(z.string(), { message: 'Gêneros é obrigatório' })
    .min(1, { message: 'A obra deve ter pelo menos um gênero' }),
  type: z.string({ message: 'Tipo é obrigatório' }),
  // TODO: Tornar obrigatório quando ajustado na API
  privacy: z.optional(z.string()),
  notes: z.optional(z.string()),
  nationality: z.string({ message: 'Nacionalidade é obrigatória' }),
  isRecommendation: z.optional(z.string()),
  hexColor: z.custom(
    (value) => {
      return typeof value === 'string'
        ? /^#[0-9a-fA-F]{3}$|^#[0-9a-fA-F]{6}$/.test(value)
        : false;
    },
    {
      message: 'Cor é obrigátoria e deve ser um hexadecimal iniciando com #',
    },
  ),
  discordRole: z.optional(z.string()),
  isAdult: z.string({ message: 'Classificação é obrigatória' }),
});

export type InputFormProject = z.infer<typeof formProjectSchema>;

export const formCreateProjectSchema = z.object({
  title: z.string().min(1, { message: 'Título é obrigatório' }),
  aliasTitle: z.string().min(1, { message: 'Alias é obrigatório' }),
  titleAlternative: z
    .string()
    .min(1, { message: 'Título alternativo é obrigatório' }),
  author: z.string().min(1, { message: 'Autor é obrigatório' }),
  yearRelease: z.custom(
    (value) => {
      const valueOk = typeof value === 'string' ? /^\d{4}$/.test(value) : false;
      const valueValid =
        parseInt(value) >= 1900 && parseInt(value) <= new Date().getFullYear();
      return valueOk && valueValid;
    },
    {
      message: `Ano de lançamento deve ser entre 1900 e ${new Date().getFullYear()}`,
    },
  ),
  synopsis: z.string().min(1, { message: 'Descrição é obrigatória' }),
  status: z.string({ message: 'Status é obrigatório' }),
  genres: z
    .array(z.string(), { message: 'Gêneros é obrigatório' })
    .min(1, { message: 'A obra deve ter pelo menos um gênero' }),
  type: z.string({ message: 'Tipo é obrigatório' }),
  nationality: z.string({ message: 'Nacionalidade é obrigatória' }),
  hexColor: z.custom(
    (value) => {
      return typeof value === 'string'
        ? /^#[0-9a-fA-F]{3}$|^#[0-9a-fA-F]{6}$/.test(value)
        : false;
    },
    {
      message: 'Cor é obrigátoria e deve ser um hexadecimal iniciando com #',
    },
  ),
  cover: z
    .any()
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Tamanho máximo é 5MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      'Apensa .jpg, .jpeg, .png and .webp são aceitos.',
    ),
  UsuarioInclusao: z.optional(z.string()),
});

export type InputFormCreateProject = z.infer<typeof formCreateProjectSchema>;

// --------------
// TODO: fazer o number ser opcional se o oneshot for true
export const formVolumesSchema = z.object({
  type: z.literal('volume'),
  title: z.optional(z.string()),
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

// --------------
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
