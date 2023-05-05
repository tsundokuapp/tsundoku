import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

import {
  HeaderContainer,
  HeaderContent,
  SubContainer,
  Container,
  Underline,
  Nav,
  Ul,
  Li,
} from "./styles";

import { SignInButton } from "../SignInButton";
import logo from "@/assets/logo/logoDefault.svg";
import { SearchBox } from "../SearchBox";
import DropdownTemas from "../Dropdown";
import { useWindowDimensions } from "@/hooks/useWindowDimensions";
import { defaultTabs, mobileTabs } from "@/constants/ListLink";
import { useModal } from "@/Context/ContextModal";
interface ITabsProps {
  label: string;
  href: string;
}

export const Navbar = () => {
  const { openModal } = useModal();
  const { isTablet } = useWindowDimensions();
  const tabs = isTablet ? mobileTabs : defaultTabs;

  const [selectedTab, setSelectedTab] = useState<ITabsProps | null>(null);
  const [shouldHideHeader, setShouldHideHeader] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const tab = tabs.find((item) => item.href === router.pathname);
    if (tab) {
      setSelectedTab(tab);
    }
  }, [router.pathname, tabs]);

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
                      <Li key={item.label} onClick={() => setSelectedTab(item)}>
                        <Link
                          href={item.href}
                          style={
                            item === selectedTab
                              ? { fontWeight: "bold", color: "#259CC1" }
                              : { fontWeight: "normal" }
                          }
                        >
                          {item.label}
                        </Link>
                        {item === selectedTab ? (
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
