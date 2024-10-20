const MOUTHS = [
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

export const mouths = (config: any) => {
  const cfg = config || {};
  const count = cfg.count || 12;
  const section = cfg.section;
  const values = [];
  let i, value;

  for (i = 0; i < count; i++) {
    value = MOUTHS[i % 12];
    values.push(section ? { value, section } : value);
  }

  return values;
};

export const years = (config: any) => {
  const cfg = config || {};
  const count = cfg.count || 5;
  const values = [];
  let i, value;

  for (i = 0; i < count; i++) {
    value = YEARS[i % 5];
    values.push(value);
  }

  return values;
};
