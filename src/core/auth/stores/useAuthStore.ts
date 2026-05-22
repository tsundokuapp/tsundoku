import { jwtDecode } from 'jwt-decode';
import { create } from 'zustand';

type PositionPossible = 'Admin' | 'Staff' | 'Apoiador' | 'Leitor';

interface JWTPayload {
  roles?: string[];
  exp?: number;
  iat?: number;
  sub?: string;
}

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
  isTokenExpired: () => boolean;
}

function isTokenExpired(token: string): boolean {
  try {
    const payload = jwtDecode<JWTPayload>(token);
    if (!payload.exp) return false;

    const currentTime = Math.floor(Date.now() / 1000);
    return payload.exp < currentTime;
  } catch {
    return true;
  }
}

function extractRolesFromToken(token: string): string[] {
  try {
    if (isTokenExpired(token)) {
      console.warn('Token expirado');
      return [];
    }

    const payload = jwtDecode<JWTPayload>(token);
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

export const useAuthStore = create<IAuthStore>((set, get) => ({
  username: null,
  setUsername: (username) => set({ username }),

  accessToken: null,
  setAccessToken: (token) => {
    if (token && isTokenExpired(token)) {
      console.warn('Token expirado ao tentar definir accessToken');
      set({
        accessToken: null,
        username: null,
        tsunId: null,
        roles: null,
        isAdmin: false,
        position: null,
      });
      return;
    }

    let roles = token ? extractRolesFromToken(token) : null;

    if (!token) {
      set({
        accessToken: null,
        username: null,
        tsunId: null,
        roles: null,
        isAdmin: false,
        position: null,
      });
      return;
    }

    if (roles === null || roles.length === 0 || !Array.isArray(roles)) {
      roles = ['Leitor'];
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

  isTokenExpired: () => {
    const token = get().accessToken;
    if (!token) return true;
    return isTokenExpired(token);
  },
}));
