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

export type UserRole = keyof typeof ROLE_COLORS;

/**
 * Retorna a cor hexadecimal associada a um cargo/role
 */
export function colorByRole(role: string): string | undefined {
  return ROLE_COLORS[role as UserRole];
}
