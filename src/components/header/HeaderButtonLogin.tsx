'use client';
// Color Checked
// Components Checked
import { Spinner, User } from '@phosphor-icons/react/dist/ssr';
import { LayoutDashboard, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';

import { EnterAnimation } from '@/animation/EnterAnimation';
import { useToaster } from '@/contexts/ToasterContext';
import { auth } from '@/services/api/api';
import { useAuthStore } from '@/store/useAuthStore';

import { Avatar, AvatarFallback } from '../shadcn/avatar';

export function HeaderButtonLogin() {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const { toaster } = useToaster();
  const { username, logout, position, isPending } = useAuthStore();
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

  function getInitials(name: string) {
    const names = name.split(' ');
    const initials = names.map((n) => n.charAt(0).toUpperCase());
    return initials.slice(0, 2).join('');
  }

  const ItemList = ({
    icon,
    text,
    action,
  }: {
    icon: React.ReactNode;
    text: string;
    action: () => void;
  }) => {
    return (
      <li
        onClick={action}
        className="m-1 flex cursor-pointer items-center rounded-lg bg-appMenuBackground px-3 py-2 text-sm text-appMenuText hover:bg-appMenuHover"
      >
        {icon}
        <span className="ml-2">{text}</span>
      </li>
    );
  };

  const ItemsStaff = () => {
    if (position !== 'Admin' && position !== 'Staff') return;

    return (
      <ItemList
        icon={<LayoutDashboard size={16} />}
        text="Dashboad"
        action={() => router.push('/dashboard')}
      />
    );
  };

  return (
    <div ref={dropdownRef} className="relative">
      {isLogged ? (
        <button
          className="flex h-10 max-w-24 items-center justify-center rounded-md bg-transparent px-8 hover:bg-appButtonBackground"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Avatar className="border-background h-8 w-8 border-2 bg-appMenuBackground text-[10px]">
            <AvatarFallback className="bg-appMenuBackground font-medium text-appText">
              {getInitials(username)}
            </AvatarFallback>
          </Avatar>
          <div className="ml-2 flex flex-1 flex-col items-start justify-start">
            <p className="text-sm capitalize text-appText">{username}</p>
            <p className="text-xs capitalize text-appSubtitle">
              {position || 'Leitor'}
            </p>
          </div>
        </button>
      ) : (
        <button
          className="flex h-10 w-fit max-w-24 items-center justify-center rounded-md bg-transparent px-8 hover:bg-appButtonBackground"
          onClick={() => handleLogin()}
        >
          {isPending ? (
            <Spinner size={16} className="animate-spin" />
          ) : (
            <p>Logar</p>
          )}
        </button>
      )}

      {isOpen && (
        <EnterAnimation delay={0.3} className="relative z-10">
          <ul className="absolute right-0 mt-2 w-36 rounded-md bg-appMenuBackground p-1 shadow-md">
            <ItemsStaff />
            <ItemList
              icon={<User size={16} />}
              text="Perfil"
              action={() => {
                username
                  ? router.push(`/profile/${username}`)
                  : router.push('/auth');
              }}
            />
            <ItemList
              icon={<LogOut size={16} />}
              text="Sair"
              action={() => handleLogout()}
            />
          </ul>
        </EnterAnimation>
      )}
    </div>
  );
}
