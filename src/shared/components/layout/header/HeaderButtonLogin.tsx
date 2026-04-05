'use client';
import { Spinner, User, UserCircle } from '@phosphor-icons/react/dist/ssr';
import { ChevronDown, LayoutDashboard, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';

import { auth } from '@/core/api';
import { useAuthStore } from '@/core/auth/stores/useAuthStore';
import { EnterAnimation } from '@/shared/animations/EnterAnimation';
import { useToaster } from '@/shared/contexts/ToasterContext';

import { Avatar, AvatarFallback } from '../../ui/avatar';

interface HeaderButtonLoginProps {
  compact?: boolean;
  compactStyle?: 'solid' | 'ghost';
  compactLoggedView?: 'icon' | 'user-info';
}

export function HeaderButtonLogin({
  compact = false,
  compactStyle = 'solid',
  compactLoggedView = 'icon',
}: HeaderButtonLoginProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const { toaster } = useToaster();
  const { username, logout, position, isPending } = useAuthStore();
  const router = useRouter();

  const isLogged = username;

  async function handleLogout() {
    await auth.get('logout');
    logout();
    setIsOpen(false);

    toaster({
      type: 'info',
      msg: 'Você saiu da sua conta. Até breve!',
    });
  }

  function handleLogin() {
    router.push('/login');
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
        text="Dashboard"
        action={() => {
          router.push('/dashboard');
          setIsOpen(false);
        }}
      />
    );
  };

  const compactButtonClass =
    'flex h-10 w-10 items-center justify-center rounded-md border border-appMenuBorder bg-appInputBackground text-appText hover:bg-appGroupBackground';
  const compactGhostButtonClass =
    'flex h-10 w-10 items-center justify-center rounded-md bg-transparent text-appButtonIcon hover:bg-appButtonBackground';
  const compactLoggedInfoButtonClass =
    'flex h-10 min-w-[160px] items-center justify-start rounded-md border border-transparent bg-transparent px-3 hover:bg-appButtonBackground';

  const compactClass =
    compactStyle === 'ghost' ? compactGhostButtonClass : compactButtonClass;

  return (
    <div ref={dropdownRef} className="relative">
      {isLogged ? (
        <button
          className={
            compact
              ? compactLoggedView === 'user-info'
                ? compactLoggedInfoButtonClass
                : compactClass
              : 'flex h-10 max-w-24 items-center justify-center rounded-md bg-transparent px-8 hover:bg-appButtonBackground'
          }
          onClick={() => setIsOpen(!isOpen)}
        >
          {compact && compactLoggedView === 'user-info' ? (
            <>
              <Avatar className="border-background h-8 w-8 border-2 bg-appMenuBackground text-[10px]">
                <AvatarFallback className="bg-appMenuBackground font-medium text-appText">
                  {getInitials(username)}
                </AvatarFallback>
              </Avatar>
              <div className="ml-2 flex min-w-0 flex-1 flex-col items-start justify-center text-left">
                <p className="w-full truncate text-left text-sm font-semibold capitalize text-appHeaderText">
                  {username}
                </p>
                <p className="w-full truncate text-left text-xs font-medium capitalize text-appHeaderText opacity-80">
                  {position || 'Leitor'}
                </p>
              </div>
              <ChevronDown
                size={16}
                className="ml-2 shrink-0 text-appHeaderText opacity-70"
                aria-hidden="true"
              />
            </>
          ) : compactStyle === 'ghost' ? (
            <UserCircle size={24} weight="duotone" />
          ) : (
            <Avatar className="border-background h-8 w-8 border-2 bg-appMenuBackground text-[10px]">
              <AvatarFallback className="bg-appMenuBackground font-medium text-appText">
                {getInitials(username)}
              </AvatarFallback>
            </Avatar>
          )}

          {!compact && (
            <div className="ml-2 flex flex-1 flex-col items-start justify-start">
              <p className="text-sm capitalize text-appText">{username}</p>
              <p className="text-xs capitalize text-appSubtitle">
                {position || 'Leitor'}
              </p>
            </div>
          )}
        </button>
      ) : (
        <button
          className={
            compact
              ? compactClass
              : 'flex h-10 w-fit max-w-24 items-center justify-center rounded-md bg-transparent px-8 hover:bg-appButtonBackground'
          }
          onClick={() => handleLogin()}
        >
          {isPending ? (
            <Spinner size={16} className="animate-spin" />
          ) : (
            <>
              {compact ? (
                <UserCircle size={24} weight="duotone" />
              ) : (
                <p>Entrar</p>
              )}
            </>
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
                  : router.push('/login');
                setIsOpen(false);
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
