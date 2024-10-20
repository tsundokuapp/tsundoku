/* eslint-disable @typescript-eslint/no-explicit-any */
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

// -------------------------------

const ROLES = [
  'Admin', // #FFFFFF
  'Editor', // #3498DB -> confirmado
  'Tradutor', // #ad1473 -> confirmado
  'Revisor', // #9B59B6 -> confirmado
  'Moderador', // #2FF438 -> confirmado
  'Staff', // #fc2ccc
  'User', // #faf234
  'Apoiador', // #f50057
  'Parceiro', // #a500f2 -> confirmado
];

export const colorByRole = (role: string) => {
  const rolesMap = {
    Admin: '#FFD700',
    Editor: '#3498DB',
    Tradutor: '#ad1473',
    Revisor: '#9B59B6',
    Moderador: '#2FF438',
    Staff: '#fc2ccc',
    User: '#faf234',
    Apoiador: '#f50057',
    Parceiro: '#a500f2',
  };
  return rolesMap[role as keyof typeof rolesMap];
};

export const roles = (config: any) => {
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

export const StaffMembers = [
  {
    id: Math.random() * 1000,
    name: 'Axios',
    inHouse: 'Tsundoku',
    role: 'Admin',
    activity: 'Download: Raw Chihara 51',
    typeActivity: 'down',
    date: '21/10/2024',
    avatar:
      'https://cdn.discordapp.com/avatars/116347060738850821/1facc3f48bb8b173ce2dc1696b68c3cf.png?size=1024',
  },
  {
    id: Math.random() * 1000,
    name: 'Rlc',
    inHouse: 'Tsundoku',
    role: 'Admin',
    activity: 'Upload: Tanya the Evil Vol. 2 - Cap. 3',
    typeActivity: 'up',
    date: '21/10/2024',
    avatar:
      'https://cdn.discordapp.com/avatars/409133348749836289/0639eeb28659b1c986a1973ba9fa0dcf.png?size=1024',
  },
  {
    id: Math.random() * 1000,
    name: 'Sky',
    inHouse: 'Tsundoku',
    role: 'Tradutor',
    activity: 'Download: Tradução Chihara 52',
    typeActivity: 'down',
    date: '21/10/2024',
    avatar:
      'https://cdn.discordapp.com/avatars/371389558312402945/28a35bba313500a95db75790c705aed6.png?size=1024',
  },
  {
    id: Math.random() * 1000,
    name: 'Detros',
    inHouse: 'Tsundoku',
    role: 'Editor',
    activity: 'Download: Raw Shadow 87',
    typeActivity: 'down',
    date: '21/10/2024',
    avatar:
      'https://cdn.discordapp.com/avatars/210734975023185921/e0699181fe56f826ce8ca49b067b200e.png?size=1024',
  },
  {
    id: Math.random() * 1000,
    name: 'Pride',
    inHouse: 'Parceiro - Farmacia-chan',
    role: 'Revisor',
    activity: 'Upload: Tanya the Evil Vol. 2 - Cap. 2',
    typeActivity: 'up',
    date: '21/10/2024',
    avatar:
      'https://cdn.discordapp.com/avatars/569944055044243477/aa3de5dd8f434f63f7a61593b4e37ae2.png?size=1024',
  },
];
