const MONTHS = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
];

const YEARS = ['2020', '2021', '2022', '2023', '2024'];

interface ChartConfig {
  count?: number;
  section?: string;
}

/**
 * Gera array de meses para gráficos
 */
export function months(
  config?: ChartConfig,
): string[] | { value: string; section: string }[] {
  const cfg = config || {};
  const count = cfg.count || 12;
  const section = cfg.section;
  const values: (string | { value: string; section: string })[] = [];

  for (let i = 0; i < count; i++) {
    const value = MONTHS[i % 12];
    values.push(section ? { value, section } : value);
  }

  return values as string[] | { value: string; section: string }[];
}

/**
 * Gera array de anos para gráficos
 */
export function years(config?: ChartConfig): string[] {
  const cfg = config || {};
  const count = cfg.count || 5;
  const values: string[] = [];

  for (let i = 0; i < count; i++) {
    values.push(YEARS[i % 5]);
  }

  return values;
}

// Alias para compatibilidade (nome original tinha typo "mouths")
export const mouths = months;
