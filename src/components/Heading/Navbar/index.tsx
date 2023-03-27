import { SignInButton } from '../SignInButton';
import Link from 'next/link';
import Image from 'next/image';
import {
  HeaderContainer,
  HeaderContent,
  SubContainer,
  Container,
} from './styles';
import { SIZES_RAW } from '@/constants/brakingPoints';

// TODO: fazer a troca da logo de acordo com o tema;
import logo from '@/assets/logo/temaDark.svg';
import { SearchBox } from '../SearchBox';
import DropdownTemas from '../Dropdown';
import { useWindowDimensions } from '@/hooks/useWindowDimensions';
import { useEffect, useState } from 'react';

export const Navbar = () => {
  const { width } = useWindowDimensions();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <HeaderContainer>
      <HeaderContent>
        <Container>
          <Link href="/">
            <Image alt="Logo Tsundoku" src={logo} height="40" />
          </Link>
          <nav>
            {mounted && width < SIZES_RAW.TABLET ? (
              <>
                {width > SIZES_RAW.MOBILE && (
                  <>
                    <Link href="/novels">Novels</Link>
                    <Link href="/comics">Comics</Link>
                    <Link href="/blog">Blog</Link>
                  </>
                )}
              </>
            ) : (
              <>
                <Link href="/">Home</Link>
                <Link href="/novels">Novels</Link>
                <Link href="/comics">Comics</Link>
                <Link href="/about">Sobre Nós</Link>
                <Link href="/blog">Blog</Link>
                <Link href="/contact">Contato</Link>
              </>
            )}
          </nav>
        </Container>

        <Container>
          <SearchBox placeholder="Novel, Comic, Gênero..." />
          <SubContainer>
            <DropdownTemas />
            <SignInButton />
          </SubContainer>
        </Container>
      </HeaderContent>
    </HeaderContainer>
  );
};
