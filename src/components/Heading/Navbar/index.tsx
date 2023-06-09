import { useEffect, useRef, useState } from "react";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import logo from "@/assets/logo/logoDefault.svg";
import { defaultTabs, mobileTabs } from "@/constants/ListLink";
import { useModal } from "@/Context/ContextModal";
import { useWindowDimensions } from "@/hooks/useWindowDimensions";

import DropdownTemas from "../Dropdown";
import { SearchBox } from "../SearchBox";
import { SignInButton } from "../SignInButton";

import {
  Container,
  HeaderContainer,
  HeaderContent,
  Li,
  Nav,
  SubContainer,
  Ul,
  Underline,
} from "./styles";

export const Navbar = () => {
  const { openModal } = useModal();
  const { isTablet } = useWindowDimensions();
  const tabs = isTablet ? mobileTabs : defaultTabs;

  const [shouldHideHeader, setShouldHideHeader] = useState(false);

  const router = useRouter();

  const lastScrollY = useRef(0);

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > lastScrollY.current && currentScrollY > 30) {
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
    <>
      <HeaderContainer isVisible={shouldHideHeader}>
        <HeaderContent>
          <Container>
            {isTablet ? (
              <button
                onClick={() => openModal()}
                style={{ backgroundColor: "transparent" }}
              >
                <Image alt="Logo Tsundoku" src={logo} height="40" />
              </button>
            ) : (
              <>
                <Link href="/" passHref>
                  <Image alt="Logo Tsundoku" src={logo} height="40" />
                </Link>
                <Nav>
                  <Ul>
                    {tabs.map((item) => (
                      <Li key={item.label}>
                        <Link
                          href={item.href}
                          style={
                            item.href === router.pathname
                              ? { fontWeight: "bold", color: "#259CC1" }
                              : { fontWeight: "normal" }
                          }
                        >
                          {item.label}
                        </Link>
                        {item.href === router.pathname ? (
                          <Underline
                            as={motion.div}
                            layoutId="underline"
                            transition={{ type: "spring", bounce: 0.4 }}
                          />
                        ) : null}
                      </Li>
                    ))}
                  </Ul>
                </Nav>
              </>
            )}
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
    </>
  );
};
