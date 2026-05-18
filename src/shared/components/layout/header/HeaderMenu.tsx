import { List } from '@phosphor-icons/react/dist/ssr';
import { LogOut } from 'lucide-react';
import { useRef, useState } from 'react';

import { auth } from '@/core/api';
import { useAuthStore } from '@/core/auth/stores/useAuthStore';
import { SideAnimation } from '@/shared/animations/SideAnimation';
import { useToaster } from '@/shared/contexts/ToasterContext';
import { cn } from '@/shared/utils/cn';

import { LinkButton } from '../../ui/LinkButton';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../ui/dialog';
import { ThemeToggleList } from '../../ui/theme/ThemeToggleList';
import { HeaderIcon } from './HeaderIcon';
import { HeaderLink } from './HeaderLink';
import { HeaderSearch } from './HeaderSearch';

export function HeaderMenu() {
  const searchRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const { toaster } = useToaster();
  const { username, position, logout } = useAuthStore();

  const isLogged = Boolean(username);
  const canAccessAdmin = position === 'Admin' || position === 'Staff';

  const handleLogout = async () => {
    try {
      await auth.get('logout');
    } finally {
      logout();
      setOpen(false);
      toaster({
        type: 'info',
        msg: 'Voce saiu da sua conta. Ate breve!',
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger data-testid="header-menu-trigger">
        <HeaderIcon>
          <List size={24} />
        </HeaderIcon>
      </DialogTrigger>
      <DialogContent
        onOpenAutoFocus={(event) => {
          event.preventDefault();
          searchRef.current?.focus();
        }}
        className="!left-auto right-0 top-0 flex h-full max-w-[480px] !translate-y-0 flex-col border-appHeaderBackground bg-appHeaderBackground transition-transform duration-300 data-[state=closed]:translate-x-full data-[state=open]:translate-x-0 sm:rounded-none"
      >
        <SideAnimation className="flex h-full flex-col">
          <DialogHeader className="px-4 py-2">
            <DialogTitle className="flex gap-2 text-3xl font-extrabold text-appHeaderText">
              <span className="text-appHeaderHighlight">/</span>
              Tsundoku
              <span className="text-appHeaderHighlight">/</span>
            </DialogTitle>
          </DialogHeader>
          <div id="dialog-description" className="sr-only">
            Menu de nagação do site
          </div>
          <div className="flex-1 px-6 py-6 sm:px-8">
            <div className="flex flex-col gap-6">
              <HeaderSearch
                icon="Search"
                className="w-full"
                onOpenChangeDialog={setOpen}
                ref={searchRef}
              />
              <DialogClose asChild>
                <HeaderLink
                  className="mt-6 pb-1 text-xl sm:text-xl"
                  text="Home"
                />
              </DialogClose>
              <DialogClose asChild>
                <HeaderLink
                  className="pb-1 text-xl sm:text-xl"
                  text="Novels"
                  action="/novels"
                />
              </DialogClose>
              <DialogClose asChild>
                <HeaderLink
                  className="pb-1 text-xl sm:text-xl"
                  text="Comics"
                  action="/comics"
                />
              </DialogClose>
              <DialogClose asChild>
                <HeaderLink
                  className="pb-1 text-xl sm:text-xl"
                  text="Blog"
                  action="/blog"
                />
              </DialogClose>
              <DialogClose asChild>
                <HeaderLink
                  className="pb-1 text-xl sm:text-xl"
                  text="Sobre Nós"
                  action="/about"
                />
              </DialogClose>
            </div>
          </div>
          <DialogFooter className="mt-auto px-6 pb-6 sm:px-8">
            <div className="flex w-full flex-col gap-6">
              <LinkButton
                text="Discord"
                action="https://discord.com/invite/x4MyhMn3TQ"
                className={cn(
                  'flex h-12 w-full items-center justify-center rounded-md border border-appButtonBorder',
                  'font-bold uppercase text-appButtonText hover:bg-appButtonHover',
                )}
              />

              {isLogged && (
                <div className="rounded-lg border border-appMenuBorder bg-appMenuBackground px-4 py-3">
                  <p className="text-sm font-semibold text-appMenuText">
                    {username}
                  </p>
                  <p className="text-xs text-appMenuTitle">
                    {position || 'Leitor'}
                  </p>
                </div>
              )}

              {!isLogged && (
                <DialogClose asChild>
                  <LinkButton
                    text="Entrar"
                    action="/login"
                    className={cn(
                      'flex h-12 w-full items-center justify-center rounded-md border border-appButtonBorder',
                      'font-bold uppercase text-appButtonText hover:bg-appButtonHover',
                    )}
                  />
                </DialogClose>
              )}

              {isLogged && (
                <div className="rounded-lg border border-appMenuBorder bg-appMenuBackground p-2">
                  <p className="px-2 pb-2 text-xs font-semibold uppercase tracking-wide text-appMenuTitle">
                    Menu do Usuario
                  </p>

                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    <DialogClose asChild>
                      <LinkButton
                        text="Perfil"
                        action={`/profile/${username}`}
                        className={cn(
                          'inline-flex h-11 w-full items-center justify-center gap-2 rounded-md border border-appMenuBorder px-3 text-sm font-semibold text-appMenuText hover:bg-appMenuHover',
                        )}
                      />
                    </DialogClose>

                    {canAccessAdmin && (
                      <DialogClose asChild>
                        <LinkButton
                          text="Administracao"
                          action="/dashboard"
                          className={cn(
                            'inline-flex h-11 w-full items-center justify-center gap-2 rounded-md border border-appMenuBorder px-3 text-sm font-semibold text-appMenuText hover:bg-appMenuHover',
                          )}
                        />
                      </DialogClose>
                    )}

                    <button
                      type="button"
                      onClick={handleLogout}
                      className={cn(
                        'inline-flex h-11 w-full items-center justify-center gap-2 rounded-md border border-appMenuBorder px-3 text-sm font-semibold text-appMenuText hover:bg-appMenuHover',
                        canAccessAdmin ? 'sm:col-span-2' : 'sm:col-span-1',
                      )}
                    >
                      <LogOut size={16} />
                      Sair
                    </button>
                  </div>
                </div>
              )}
              <div className="border-t border-appMenuBorder pt-4">
                <div
                  className="theme-toggle-list"
                  data-testid="theme-toggle-list"
                  tabIndex={-1}
                >
                  <ThemeToggleList />
                </div>
              </div>
            </div>
          </DialogFooter>
        </SideAnimation>
      </DialogContent>
    </Dialog>
  );
}
