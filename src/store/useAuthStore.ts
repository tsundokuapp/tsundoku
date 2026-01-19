import { create } from 'zustand';

type PositionPossible = 'Admin' | 'Staff' | 'Apoiador' | 'Leitor';
interface IAuthStore {
  username: string | null;
  setUsername: (username: string | null) => void;
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
  tsunId: string | null;
  setTsunId: (tsunId: string) => void;
  logout: () => void;
  position: PositionPossible | null;
  setPosition: (position: PositionPossible | null) => void;
  roles: string[] | null;
  setRoles: (roles: string[] | null) => void;

  isAdmin?: boolean;
  setIsAdmin?: (isAdmin: boolean) => void;
  isPending: boolean;
  setIsPending: (isPending: boolean) => void;
}

function extractRolesFromToken(token: string): string[] {
  try {
    const payloadBase64 = token.split('.')[1];
    const payloadJson = atob(payloadBase64);
    const payload = JSON.parse(payloadJson);
    return payload.roles || [];
  } catch (error) {
    console.error('Erro ao recuperar permissões de acessos:', error);
    return [];
  }
}

function normalizeRole(role: string): string {
  return role.trim().toLowerCase();
}

function isUserAdmin(roles: string[] | null): boolean {
  if (!roles) return false;
  const rolesLower = roles.map(normalizeRole);
  return rolesLower.includes('admin');
}

function getUserPosition(roles: string[]): PositionPossible {
  const rolesLower = roles?.map(normalizeRole);

  if (rolesLower.includes('admin')) return 'Admin';
  if (rolesLower.includes('staff')) return 'Staff';
  if (rolesLower.includes('apoiador')) return 'Apoiador';
  return 'Leitor';
}

export const useAuthStore = create<IAuthStore>((set) => ({
  username: null,
  setUsername: (username) => set({ username }),

  accessToken: null,
  setAccessToken: (token) => {
    let roles = token ? extractRolesFromToken(token) : null;

    if (roles === null) {
      roles = ['Leitor'];
    }

    if (typeof roles === 'string') {
      roles = [roles];
    }

    set({
      accessToken: token,
      roles,
      isAdmin: isUserAdmin(roles),
      position: getUserPosition(roles),
    });
  },

  tsunId: null,
  setTsunId: (tsunId) => set({ tsunId }),

  logout: () => {
    set({
      username: null,
      accessToken: null,
      tsunId: null,
      position: null,
      roles: null,
      isAdmin: false,
    });
  },

  position: 'Leitor',
  setPosition: (position) => set({ position }),

  roles: null,
  setRoles: (roles) => set({ roles }),

  isAdmin: false,
  setIsAdmin: (isAdmin) => set({ isAdmin }),

  isPending: false,
  setIsPending: (isPending) => set({ isPending }),
}));
