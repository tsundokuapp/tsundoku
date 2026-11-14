'use client';
import { Spinner, User, UserCircle } from '@phosphor-icons/react/dist/ssr';
import {
  ChevronDown,
  ExternalLink,
  LayoutDashboard,
  LogOut,
} from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';

import { auth } from '@/core/api';
import { useAuthStore } from '@/core/auth/stores/useAuthStore';
import { EnterAnimation } from '@/shared/animations/EnterAnimation';
import { useToaster } from '@/shared/contexts/ToasterContext';
import { cn } from '@/shared/utils/cn';

import { Avatar, AvatarFallback } from '../../ui/avatar';

interface HeaderButtonLoginProps {
  compact?: boolean;
  compactStyle?: 'solid' | 'ghost' | 'gradient';
  compactLoggedView?: 'icon' | 'user-info';
  loggedOutLabel?: string;
  textTone?: 'header' | 'surface';
}

export function HeaderButtonLogin({
  compact = false,
  compactStyle = 'solid',
  compactLoggedView = 'icon',
  loggedOutLabel = 'Entrar',
  textTone = 'header',
}: HeaderButtonLoginProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const { toaster } = useToaster();
  const { username, logout, position, isPending } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  const isLogged = username;
  const adminRoutes = [
    '/dashboard',
    '/staff',
    '/noveladmin',
    '/mangaadmin',
    '/staffadmin',
    '/useradmin',
  ];
  const isOnAdmin = adminRoutes.some((route) => pathname.startsWith(route));

  async function handleLogout() {
    await auth.get('auth/logout');
    logout();
    setIsOpen(false);

    if (isOnAdmin) {
      router.push('/');
    }

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

    if (isOnAdmin) {
      return (
        <ItemList
          icon={<ExternalLink size={16} />}
          text="Ver Site"
          action={() => {
            router.push('/');
            setIsOpen(false);
          }}
        />
      );
    }

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
  const gradientButtonClass =
    'flex h-[30px] items-center justify-center rounded-[4px] bg-gradient-to-r from-appCtaGradientFrom to-appCtaGradientTo px-3 text-xs font-medium text-white shadow-sm transition-opacity hover:opacity-90';
  const primaryTextClass =
    textTone === 'surface' ? 'text-appText' : 'text-appHeaderText';
  const compactLoggedInfoButtonClass = cn(
    'flex h-10 min-w-[140px] items-center justify-start rounded-md border border-transparent bg-transparent px-2.5 transition-colors',
    textTone === 'surface'
      ? 'hover:bg-appGroupBackground'
      : 'hover:bg-appButtonBackground',
  );

  const compactClass =
    compactStyle === 'gradient'
      ? gradientButtonClass
      : compactStyle === 'ghost'
        ? compactGhostButtonClass
        : compactButtonClass;

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
                <p
                  className={`w-full truncate text-left text-sm font-semibold capitalize ${primaryTextClass}`}
                >
                  {username}
                </p>
                <p
                  className={`w-full truncate text-left text-xs font-medium capitalize opacity-80 ${primaryTextClass}`}
                >
                  {position || 'Leitor'}
                </p>
              </div>
              <ChevronDown
                size={16}
                className={`ml-2 shrink-0 opacity-70 ${primaryTextClass}`}
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
              {compactStyle === 'gradient' ? (
                <span className="whitespace-nowrap">{loggedOutLabel}</span>
              ) : compact ? (
                <UserCircle
                  size={24}
                  weight="duotone"
                  className={primaryTextClass}
                />
              ) : (
                <p
                  className={cn(
                    'flex items-center gap-1.5 whitespace-nowrap text-sm font-medium',
                    primaryTextClass,
                  )}
                >
                  <UserCircle size={20} weight="duotone" />
                  <span>{loggedOutLabel}</span>
                </p>
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
