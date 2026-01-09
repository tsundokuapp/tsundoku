'use client';
// Color Checked
// Components Checked
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';

import { EnterAnimation } from '@/animation/EnterAnimation';
import { useToaster } from '@/contexts/ToasterContext';
import { auth } from '@/services/api/api';
import { useAuthStore } from '@/store/useAuthStore';

export function HeaderButtonLogin() {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const { toaster } = useToaster();
  const { username, logout } = useAuthStore();
  const router = useRouter();

  const isLogged = username;

  async function handleLogout() {
    await auth.get('logout');
    logout();

    toaster({
      type: 'info',
      msg: 'Você saiu da sua conta. Até breve!',
    });
  }

  function handleLogin() {
    router.push('/auth');
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative">
      {isLogged ? (
        <button
          className="flex h-10 w-10 items-center justify-center rounded-md bg-appButtonBackground px-8 text-appButtonIcon hover:bg-gradient-to-b hover:from-appButtonBackground hover:to-appButtonHover"
          onClick={() => setIsOpen(!isOpen)}
        >
          <p>{username}</p>
        </button>
      ) : (
        <button
          className="flex h-10 w-10 items-center justify-center rounded-md bg-appButtonBackground px-8 text-appButtonIcon hover:bg-gradient-to-b hover:from-appButtonBackground hover:to-appButtonHover"
          onClick={() => handleLogin()}
        >
          <p>{'Logar'}</p>
        </button>
      )}

      {isOpen && (
        <EnterAnimation delay={0.3} className="relative z-10">
          <ul className="absolute right-0 mt-2 w-36 rounded-md bg-appMenuBackground p-1 shadow-md">
            <li
              onClick={() => {
                router.push('/dashboard');
              }}
              className="m-1 flex cursor-pointer items-center rounded-lg bg-appMenuBackground px-3 py-2 text-sm text-appMenuText hover:bg-appMenuHover"
            >
              <span className="ml-2">Dashboad</span>
            </li>

            <li
              onClick={() => handleLogout()}
              className="m-1 flex cursor-pointer items-center rounded-lg bg-appMenuBackground px-3 py-2 text-sm text-appMenuText hover:bg-appMenuHover"
            >
              <span className="ml-2">Sair</span>
            </li>
          </ul>
        </EnterAnimation>
      )}
    </div>
  );
}
