export const PROJECT_STATUS = [
  'Em andamento',
  'Concluído',
  'Cancelado',
  'Hiato',
] as const;

export const PROJECT_TYPES = [
  'Manhwa',
  'Manhua',
  'Mangá',
  'Comic',
  'Light Novel',
  'Web Novel',
  'Novel',
] as const;

export const PROJECT_PRIVACY = ['Público', 'Privado'] as const;

export const PROJECT_NATIONALITY = [
  'Japonesa',
  'Coreana',
  'Chinesa',
  'Americana',
  'Brasileira',
  'Espanhola',
] as const;

export const DISCORD_ROLES = [
  'Tanya the Evil',
  'Re:Zero',
  'Overlord',
  'Kumo desu ga, Nani ka?',
  'Youjo Senki',
  'Wandering Witch',
] as const;

// Aliases para compatibilidade com código legado
export const status = [...PROJECT_STATUS];
export const types = [...PROJECT_TYPES];
export const privacy = [...PROJECT_PRIVACY];
export const nationality = [...PROJECT_NATIONALITY];
export const cargoObraDiscord = [...DISCORD_ROLES];

export type ProjectStatus = (typeof PROJECT_STATUS)[number];
export type ProjectType = (typeof PROJECT_TYPES)[number];
export type ProjectPrivacy = (typeof PROJECT_PRIVACY)[number];
export type ProjectNationality = (typeof PROJECT_NATIONALITY)[number];
