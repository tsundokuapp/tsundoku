import React, { Suspense, useState } from "react";
import Head from "next/head";

import { Button } from "@/components/Button";
import { TrilhaPathManga } from "@/components/TrilhaPath";
import { Footer } from "@/components/Footer";

import { Container, Content, Navigation, Chapter } from "./styles";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface ILayoutMainProps {
  children: React.ReactNode;
  title: string;
}

type TypeViewPage = "singlePage" | "longStrip";

export const LayoutMangaChapter = ({ children, title }: ILayoutMainProps) => {
  const [viewMode, setViewMode] = useState<TypeViewPage>("singlePage");

  const toggleViewMode = () => {
    if (viewMode === "singlePage") {
      setViewMode("longStrip");
      return;
    }
    setViewMode("singlePage");
  };

  const NavigationSection = () => {
    return (
      <Navigation>
        <TrilhaPathManga />
        <div>
          <FaChevronLeft size={20} onClick={() => alert("volta")} />
          <h3>Página 12 de 33</h3>
          <FaChevronRight size={20} onClick={() => alert("avança")} />
        </div>
        <Button label="Reportar Error" />
      </Navigation>
    );
  };

  return (
    <>
      <Container>
        <Head>
          <title>{title}</title>
          <meta
            name="description"
            content="Site de traduções de Light Novels e mangás"
          />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Content>
          <NavigationSection />
          <Chapter>
            <div>
              <Suspense fallback={<div>Carregando...</div>}>
                <h1>Imagem dos capitulos aqui</h1>
              </Suspense>
            </div>
          </Chapter>
          <NavigationSection />
        </Content>
      </Container>
      <Footer />
    </>
  );
};
