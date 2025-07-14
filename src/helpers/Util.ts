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

export const formatDate = (
  date: Date,
  extense: boolean,
  includesDayOfWeek: boolean,
) => {
  const day = date.getDate();
  const monthNumber = date.getMonth() + 1;
  const dayOfWeek = [
    'Domingo',
    'Segunda-feira',
    'Terça-feira',
    'Quarta-feira',
    'Quinta-feira',
    'Sexta-feira',
    'Sábado',
  ][date.getDay()];
  const month = [
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
  ][date.getMonth()];
  const year = date.getFullYear();

  const stringForExtense = extense
    ? `${day} de ${month} de ${year}`
    : `${day}/${monthNumber}/${year}`;

  const result = `${includesDayOfWeek ? `${dayOfWeek}, ` : ''} ${stringForExtense}`;

  return result;
};

// -------------------------------

export const colorByRole = (role: string) => {
  const rolesMap = {
    // Ordernado por importância
    Admin: '#D4AF37',
    Staff: '##1e40af',
    Moderador: '#92400e',
    Tradutor: '#9d174d',
    Revisor: '#86198f',
    Editor: '#0284c7',
    Parceiro: '#4b5563',
    Apoiador: '#065f46',
    User: '#3f6212',
  };

  return rolesMap[role as keyof typeof rolesMap];
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

// -------------------

const randomId = () => Math.floor(Math.random() * 1000);
const randomOptions = (options: string[]) => {
  return options[Math.floor(Math.random() * options.length)];
};

export const status = ['Em andamento', 'Concluído', 'Cancelado', 'Hiato'];

export const types = [
  'Manhwa',
  'Manhua',
  'Comic',
  'Light Novel',
  'Web Novel',
  'Novel',
];
export const privacy = ['Público', 'Privado'];
export const titles = [
  'Tanya the Evil',
  'Re:Zero',
  'Overlord',
  'Kumo desu ga, Nani ka?',
  'Youjo Senki',
  'Wandering Witch',
  'Shadow',
  'Konosuba',
  'Re:Monster',
  'The Rising of the Shield Hero',
  'The Eminence in Shadow',
  'The World of Otome Games is Tough for Mobs',
];

export const staff = [
  'Rlc',
  'Sky',
  'Detros',
  'Pride',
  'Axios',
  'Bravo',
  'Nero',
  'Cloe',
  'Plon',
];

export const nationality = [
  'Japonesa',
  'Coreana',
  'Chinesa',
  'Americana',
  'Brasileira',
  'Espanhola',
];

export const cargoObraDiscord = [
  'Tanya the Evil',
  'Re:Zero',
  'Overlord',
  'Kumo desu ga, Nani ka?',
  'Youjo Senki',
  'Wandering Witch',
];

export const ChaptersList = Array.from({ length: 10 }, () => ({
  id: randomId(),
  name: `Capítulo ${randomId()}`,
  author: randomOptions(staff),
  privacy: randomOptions(privacy),
  date: '21/10/2024',
  url: '/project/majo-no-tabitabi',
}));
