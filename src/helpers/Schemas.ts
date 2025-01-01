import { z } from 'zod';

export const formProjectSchema = z.object({
  title: z.string().min(1, { message: 'Título é obrigatório' }),
  'title-alternative': z
    .string()
    .min(1, { message: 'Título alternativo é obrigatório' }),
  author: z.string().min(1, { message: 'Autor é obrigatório' }),
  illustration: z.string().min(1, { message: 'Ilustrador é obrigatório' }),
  'year-release': z.custom(
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
  description: z.string().min(1, { message: 'Descrição é obrigatória' }),
  status: z.string({ message: 'Status é obrigatório' }),
  genres: z
    .array(z.string(), { message: 'Gêneros é obrigatório' })
    .min(1, { message: 'A obra deve ter pelo menos um gênero' }),
  types: z.string({ message: 'Tipo é obrigatório' }),
  privacy: z.string({ message: 'Privacidade é obrigatório' }),
  notes: z.optional(z.string()),
  nationality: z.string({ message: 'Nacionalidade é obrigatória' }),
  recomendation: z.optional(z.string()),
  'hex-color': z.custom(
    (value) => {
      return typeof value === 'string'
        ? /^[0-9a-fA-F]{3}$|^[0-9a-fA-F]{6}$/.test(value)
        : false;
    },
    {
      message: 'Cor é obrigátoria e deve ser um hexadecimal sem #',
    },
  ),
  'discord-role': z.optional(z.string()),
  adult: z.string({ message: 'Classificação é obrigatória' }),
});

export type InputFormProject = z.infer<typeof formProjectSchema>;
