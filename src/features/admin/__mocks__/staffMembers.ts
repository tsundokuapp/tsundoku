/**
 * Mock data para membros do staff - usado para desenvolvimento/testes
 * TODO: Substituir por dados reais da API
 */

const AVATAR_DEFAULT =
  'https://cdn.discordapp.com/avatars/210734975023185921/e0699181fe56f826ce8ca49b067b200e.png?size=1024';

export interface StaffMember {
  id: number;
  name: string;
  inHouse: string;
  role: string;
  activity: string;
  typeActivity: 'up' | 'down';
  date: string;
  avatar: string;
}

export const StaffMembers: StaffMember[] = [
  {
    id: 1,
    name: 'Axios',
    inHouse: 'Tsundoku',
    role: 'Admin',
    activity: 'Download: Raw Chihara 51',
    typeActivity: 'down',
    date: '21/10/2024',
    avatar: AVATAR_DEFAULT,
  },
  {
    id: 2,
    name: 'Rlc',
    inHouse: 'Tsundoku',
    role: 'Admin',
    activity: 'Upload: Tanya the Evil Vol. 2 - Cap. 3',
    typeActivity: 'up',
    date: '21/10/2024',
    avatar: AVATAR_DEFAULT,
  },
  {
    id: 3,
    name: 'Sky',
    inHouse: 'Tsundoku',
    role: 'Tradutor',
    activity: 'Download: Tradução Chihara 52',
    typeActivity: 'down',
    date: '21/10/2024',
    avatar: AVATAR_DEFAULT,
  },
  {
    id: 4,
    name: 'Detros',
    inHouse: 'Tsundoku',
    role: 'Editor',
    activity: 'Download: Raw Shadow 87',
    typeActivity: 'down',
    date: '21/10/2024',
    avatar: AVATAR_DEFAULT,
  },
  {
    id: 5,
    name: 'Pride',
    inHouse: 'Parceiro - Farmacia-chan',
    role: 'Revisor',
    activity: 'Upload: Tanya the Evil Vol. 2 - Cap. 2',
    typeActivity: 'up',
    date: '21/10/2024',
    avatar: AVATAR_DEFAULT,
  },
];
