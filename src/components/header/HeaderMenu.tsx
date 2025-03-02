import { List } from '@phosphor-icons/react';

import { cn } from '@/helpers/twUtils';

import { HeaderIcon } from './HeaderIcon';
import { HeaderLink } from './HeaderLink';
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
  return (
    <Dialog>
      <DialogTrigger>
        <HeaderIcon>
          <List size={24} />
        </HeaderIcon>
      </DialogTrigger>
      <DialogContent className="!left-auto right-0 top-0 flex h-full max-w-[480px] !translate-y-0 flex-col border-appHeaderBackground bg-appHeaderBackground transition-transform duration-300 data-[state=closed]:translate-x-full data-[state=open]:translate-x-0 sm:rounded-none">
        <DialogHeader className="px-4 py-2">
          <DialogTitle className="flex gap-2 text-3xl font-extrabold text-appHeaderText">
            <span className="text-appHeaderHighlight">/</span>
            Tsundoku
            <span className="text-appHeaderHighlight">/</span>
          </DialogTitle>
        </DialogHeader>
        <div className="flex-1 p-12">
          <div className="flex flex-col gap-6">
            <DialogClose asChild>
              <HeaderLink className="pb-1 text-xl sm:text-xl" text="Home" />
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
                  action="/dashboard"
                  className={cn(
                    'flex h-12 w-full max-w-xs items-center justify-center rounded-md border border-appButtonBorder',
                    'font-bold uppercase text-appButtonText hover:bg-appButtonHover',
                  )}
                />
              </DialogClose>
            </div>
            <ThemeToggleList />
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
