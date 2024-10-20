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

const ROLES = [
  'Admin',
  'Editor',
  'Tradutor', // #ad1473
  'Revisor',
  'Moderador',
  'Staff',
  'User',
  'Apoiador',
  'Parceiro', // #a500f2
];

interface configRoles {
  section: 'staff' | 'user' | 'partner' | 'all';
}

export const roles = (config: configRoles) => {
  const cfg = config || {};
  const values = [];
  let i, value;

  for (i = 0; i < ROLES.length; i++) {
    value = ROLES[i];
    if (cfg.section === 'staff' && i < 6) {
      values.push(value);
    } else if (cfg.section === 'user' && i > 5 && i < 8) {
      values.push(value);
    } else if (cfg.section === 'partner' && i === 8) {
      values.push(value);
    } else if (cfg.section === 'all') {
      values.push(value);
    }
  }
};
