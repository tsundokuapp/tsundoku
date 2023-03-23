import Head from 'next/head';
import { Navbar } from '../../Heading/Navbar';
import { Container, BoxContent } from './styles';
import React from 'react';

interface ILayoutMainProps {
  children: React.ReactNode;
  title: string;
}

export const LayoutMain = ({ children, title }: ILayoutMainProps) => {
  return (
    <>
      <Navbar />
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
    </>
  );
};
