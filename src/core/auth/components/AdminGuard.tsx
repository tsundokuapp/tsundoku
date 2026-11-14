'use client';

import { useRouter } from 'next/navigation';
import { useEffect, type ReactNode } from 'react';

import { useAuthStore } from '@/core/auth/stores/useAuthStore';

/**
 * Regra única de autorização administrativa reutilizada pelo `AdminGuard` e pela navegação.
 */
export function canAccessAdmin(
  username: string | null,
  position: string | null,
): boolean {
  return Boolean(username && (position === 'Admin' || position === 'Staff'));
}

export function AdminGuard({ children }: { children: ReactNode }) {
  const { username, position, isPending, hasHydrated } = useAuthStore();
  const router = useRouter();

  const isAuthorized = canAccessAdmin(username, position);

  useEffect(() => {
    if (!hasHydrated || isPending) return;

    if (!isAuthorized) {
      router.replace('/');
    }
  }, [hasHydrated, isPending, isAuthorized, router]);

  if (!hasHydrated || isPending) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="flex h-screen w-full items-center justify-center bg-appBackground"
      >
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-appMenuBorder border-t-appHeaderHighlight" />
        <span className="sr-only">Carregando painel administrativo...</span>
      </div>
    );
  }

  if (!isAuthorized) {
    return null;
  }

  return <>{children}</>;
}
