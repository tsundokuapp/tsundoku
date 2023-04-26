import { useEffect, useRef, useState } from "react";
import { SignInButton } from "../SignInButton";
import Link from "next/link";
import Image from "next/image";
import {
  HeaderContainer,
  HeaderContent,
  SubContainer,
  Container,
  Underline,
} from "./styles";
import { SIZES_RAW } from "@/constants/brakingPoints";
import logo from "@/assets/logo/logoDefault.svg";
import { SearchBox } from "../SearchBox";
import DropdownTemas from "../Dropdown";
import { useWindowDimensions } from "@/hooks/useWindowDimensions";
import { defaultTabs, mobileTabs } from "@/constants/ListLink";
import { motion } from "framer-motion";

export const Navbar = () => {
  const { width } = useWindowDimensions();
  const tabs = width < SIZES_RAW.TABLET ? mobileTabs : defaultTabs;

  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  const [shouldHideHeader, setShouldHideHeader] = useState(false);

  const lastScrollY = useRef(0);

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
              <ul>
                {tabs.map((item) => (
                  <li key={item.label} onClick={() => setSelectedTab(item)}>
                    <Link href={item.href}>{item.label}</Link>
                    {item === selectedTab ? (
                      <Underline as={motion.div} layoutId="underline" />
                    ) : null}
                  </li>
                ))}
              </ul>
            ) : (
              <ul>
                {tabs.map((item) => (
                  <li key={item.label} onClick={() => setSelectedTab(item)}>
                    <Link href={item.href}>{item.label}</Link>
                    {item === selectedTab ? (
                      <Underline
                        as={motion.div}
                        layoutId="underline"
                        transition={{ type: "spring", bounce: 0.4 }}
                      />
                    ) : null}
                  </li>
                ))}
              </ul>
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
