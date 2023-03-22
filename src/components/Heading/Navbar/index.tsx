// import { SignInButton } from '../SignInButton';
import Link from 'next/link';
import Image from 'next/image';
import { HeaderContainer, HeaderContent } from './styles';

// TODO: fazer a troca da logo de acordo com o tema;
import logo from '@/assets/logo/temaDark.svg';
import { SearchBox } from '../SearchBox';
import DropdownTemas from '../Dropdown';

export const Navbar = () => {
  return (
    <HeaderContainer>
      <HeaderContent>
        <Image alt="logo tsundoku" src={logo} height="40" />
        <nav>
          <Link href="/">Home</Link>
          <Link href="/novels">Novels</Link>
          <Link href="/comics">Comics</Link>
          <Link href="/about">Sobre Nós</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/contact">Contato</Link>
        </nav>

        <SearchBox placeholder="Novel, Comic, Gênero..." />
        <div>
          {/* <SignInButton /> */}
          <DropdownTemas />
        </div>
      </HeaderContent>
    </HeaderContainer>
  );
};
