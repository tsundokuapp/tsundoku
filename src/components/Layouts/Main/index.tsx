import React from "react";
import Head from "next/head";
import { Footer } from "@/components/Footer";

import { Container, BoxContent } from "./styles";

interface ILayoutMainProps {
  children: React.ReactNode;
  title: string;
}

export const LayoutMain = ({ children, title }: ILayoutMainProps) => {
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

        <BoxContent>{children}</BoxContent>
      </Container>
      <Footer />
    </>
  );
};
