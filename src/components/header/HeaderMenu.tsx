import { List } from '@phosphor-icons/react';
import { useRef, useState } from 'react';

import { cn } from '@/helpers/twUtils';

import { HeaderIcon } from './HeaderIcon';
import { HeaderLink } from './HeaderLink';
import { HeaderSearch } from './HeaderSearch';
import { LinkButton } from '../common/LinkButton';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogClose,
  DialogHeader,
  DialogFooter,
} from '../shadcn/dialog';
import { ThemeToggleList } from '../theme/ThemeToogleList';

export function HeaderMenu() {
  const searchRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);

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
        <div className="flex-1 p-12">
          <div className="flex flex-col gap-6">
            <HeaderSearch
              icon="Search"
              className="w-full"
              onOpenChangeDialog={setOpen}
            />
            <DialogClose asChild>
              <HeaderLink
                className="mt-12 pb-1 text-xl sm:text-xl"
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
        <DialogFooter>
          <div className="flex w-full flex-col gap-6">
            <div className="flex w-full gap-6">
              <LinkButton
                text="Discord"
                action="https://discord.com/invite/x4MyhMn3TQ"
                className={cn(
                  'flex h-12 w-full max-w-xs items-center justify-center rounded-md border border-appButtonBorder',
                  'font-bold uppercase text-appButtonText hover:bg-appButtonHover',
                )}
              />
              <DialogClose asChild>
                <LinkButton
                  text="Entrar"
                  action="/"
                  className={cn(
                    'flex h-12 w-full max-w-xs items-center justify-center rounded-md border border-appButtonBorder',
                    'font-bold uppercase text-appButtonText hover:bg-appButtonHover',
                  )}
                />
              </DialogClose>
            </div>
            <div
              className="theme-toggle-list"
              data-testid="theme-toggle-list"
              tabIndex={-1}
            >
              <ThemeToggleList />
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
