import {
  MagnifyingGlass,
  DiscordLogo,
  User,
} from '@phosphor-icons/react/dist/ssr';
import Link from 'next/link';

import { HeaderIcon } from './header-icon';
import { HeaderLink } from './header-link';

export function Header() {
  return (
    <div className="flex items-center justify-between bg-slate-900 h-[120px] px-[180px]">
      <div className="flex items-center">
        <Link
          className="flex items-center gap-2 text-2xl font-extrabold text-white"
          href="/"
        >
          <span className="text-sky-600">/</span>
          Tsundoku
          <span className="text-sky-600">/</span>
        </Link>
      </div>
      <div className="flex items-center gap-8">
        <HeaderLink text="Home" active />
        <HeaderLink text="Novels" action="novels/" />
        <HeaderLink text="Comics" action="comics/" />
        <HeaderLink text="Blog" action="blog/" />
        <HeaderLink text="Sobre Nós" action="about/" />
      </div>
      <div className="flex items-center gap-4">
        <HeaderIcon>
          <MagnifyingGlass size={24}></MagnifyingGlass>
        </HeaderIcon>
        <HeaderIcon action="https://discord.com/invite/x4MyhMn3TQ">
          <DiscordLogo size={24}></DiscordLogo>
        </HeaderIcon>
        <HeaderIcon>
          <User size={24}></User>
        </HeaderIcon>
      </div>
    </div>
  );
}
