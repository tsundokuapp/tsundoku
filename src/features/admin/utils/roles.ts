const ROLE_COLORS = {
  Admin: '#D4AF37',
  Staff: '#1e40af',
  Moderador: '#92400e',
  Tradutor: '#9d174d',
  Revisor: '#86198f',
  Editor: '#0284c7',
  Parceiro: '#4b5563',
  Apoiador: '#065f46',
  User: '#3f6212',
} as const;

const ROLE_COLORS_NORMALIZED: Record<string, string> = {
  admin: '#D4AF37',
  staff: '#1e40af',
  moderador: '#92400e',
  tradutor: '#9d174d',
  revisor: '#86198f',
  editor: '#0284c7',
  parceiro: '#4b5563',
  apoiador: '#065f46',
  user: '#3f6212',
  leitor: '#3f6212',
  dev: '#10b981',
};

export type UserRole = keyof typeof ROLE_COLORS;

/**
 * Retorna a cor hexadecimal associada a um cargo/role
 */
export function colorByRole(role: string): string {
  if (!role) return '#6b7280';
  const colorSelected = ROLE_COLORS[role as UserRole];
  if (colorSelected) {
    return colorSelected;
  }
  const normalized = role.trim().toLowerCase();
  if (ROLE_COLORS_NORMALIZED[normalized]) {
    return ROLE_COLORS_NORMALIZED[normalized];
  }
  return '#6b7280'; // Cor padrão cinza se o cargo não for encontrado
}
