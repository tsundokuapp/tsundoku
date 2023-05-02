import React, { Suspense, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import { Button } from "@/components/Button";
import { TrilhaPath } from "@/components/TrilhaPath";
import { Footer } from "@/components/Footer";

import { Container, Content, Navigation, Cover, Chapter } from "./styles";

const capaElaina =
  "https://i0.wp.com/tsundoku.com.br/wp-content/uploads/2021/01/Tsundoku-Traducoes-Light-Novel-Majo-no-Tabitabi-Volume-04-Imagem-03_-scaled.jpg?resize=2560%2C1821&ssl=1";

interface ILayoutMainProps {
  children: React.ReactNode;
  title: string;
}

type TypeViewPage = "singlePage" | "longStrip";

export const LayoutMangaChapter = ({ children, title }: ILayoutMainProps) => {
  const [viewMode, setViewMode] = useState<TypeViewPage>("singlePage");

  const router = useRouter();
  const { id } = router.query;

  const GoToNavigation = (path: string) => {
    router.push(path);
  };

  const toggleViewMode = () => {
    if (viewMode === "singlePage") {
      setViewMode("longStrip");
      return;
    }

    setViewMode("singlePage");
  };

  const NavigationButtons = () => {
    return (
      <div>
        <Button label="Anterior" variant="secundario" onClick={() => {}} />
        <Button
          label="Índice"
          variant="secundario"
          onClick={() => GoToNavigation(`/comics/${id}`)}
        />
        <Button
          label="Próximo"
          variant="secundario"
          onClick={() => toggleViewMode()}
        />
      </div>
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
        <Cover>
          <img src={capaElaina} alt="atual volume da obra" />
        </Cover>
        <Content>
          <Navigation>
            <TrilhaPath />
            <NavigationButtons />
          </Navigation>
          <Chapter>
            <div>
              <Suspense fallback={<div>Carregando...</div>}>
                <h1>Imagem dos capitulos aqui</h1>
              </Suspense>
            </div>
          </Chapter>
          <Navigation>
            <NavigationButtons />
          </Navigation>
        </Content>
      </Container>
      <Footer />
    </>
  );
};
