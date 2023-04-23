import { SignInButton } from "../SignInButton";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import {
  HeaderContainer,
  HeaderContent,
  SubContainer,
  Container,
  LinkText,
} from "./styles";
import { SIZES_RAW } from "@/constants/brakingPoints";
import { useEffect, useRef, useState } from "react";

// TODO: fazer a troca da logo de acordo com o tema;
import logo from "@/assets/logo/temaDark.svg";
import { SearchBox } from "../SearchBox";
import DropdownTemas from "../Dropdown";
import { useWindowDimensions } from "@/hooks/useWindowDimensions";

export const Navbar = () => {
  const { width } = useWindowDimensions();
  const router = useRouter();

  const lastScrollY = useRef(0);
  const [shouldHideHeader, setShouldHideHeader] = useState(false);

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > lastScrollY.current) {
      setShouldHideHeader(true);
    } else if (currentScrollY < lastScrollY.current) {
      setShouldHideHeader(false);
    }
    lastScrollY.current = currentScrollY;
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <HeaderContainer isVisible={shouldHideHeader}>
      <HeaderContent>
        <Container>
          <Link href="/" passHref>
            <Image alt="Logo Tsundoku" src={logo} height="40" />
          </Link>
          <nav>
            {width < SIZES_RAW.TABLET ? (
              <>
                {width > SIZES_RAW.MOBILE && (
                  <>
                    <Link href="/novels" passHref>
                      <LinkText href="/novels" pathName={router.pathname}>
                        Novels
                      </LinkText>
                    </Link>
                    <Link href="/comics" passHref>
                      <LinkText href="/comics" pathName={router.pathname}>
                        Comics
                      </LinkText>
                    </Link>
                    <Link href="/blog" passHref>
                      <LinkText href="/blog" pathName={router.pathname}>
                        Blog
                      </LinkText>
                    </Link>
                  </>
                )}
              </>
            ) : (
              <>
                <Link href="/" passHref>
                  <LinkText href="/" pathName={router.pathname}>
                    Home
                  </LinkText>
                </Link>
                <Link href="/novels" passHref>
                  <LinkText href="/novels" pathName={router.pathname}>
                    Novels
                  </LinkText>
                </Link>
                <Link href="/comics" passHref>
                  <LinkText href="/comics" pathName={router.pathname}>
                    Comics
                  </LinkText>
                </Link>
                <Link href="/blog" passHref>
                  <LinkText href="/blog" pathName={router.pathname}>
                    Blog
                  </LinkText>
                </Link>
                <Link href="/about" passHref>
                  <LinkText href="/about" pathName={router.pathname}>
                    Sobre Nós
                  </LinkText>
                </Link>
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
