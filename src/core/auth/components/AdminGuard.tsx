'use client';

import { useRouter } from 'next/navigation';
import { useEffect, type ReactNode } from 'react';

import { useAuthStore } from '@/core/auth/stores/useAuthStore';

export function AdminGuard({ children }: { children: ReactNode }) {
  const { username, position, isPending, hasHydrated } = useAuthStore();
  const router = useRouter();

  const isAuthorized =
    username && (position === 'Admin' || position === 'Staff');

  useEffect(() => {
    if (!hasHydrated || isPending) return;

    if (!isAuthorized) {
      router.replace('/');
    }
  }, [hasHydrated, isPending, isAuthorized, router]);

  if (!hasHydrated || isPending) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-appBackground">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-appMenuBorder border-t-appHeaderHighlight" />
      </div>
    );
  }

  if (!isAuthorized) {
    return null;
  }

  return <>{children}</>;
}
