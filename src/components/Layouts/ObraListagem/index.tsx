import Head from "next/head";
import {
  Container,
  Conteudo,
  Navegacao,
  Grid,
  Capa,
  Titulo,
  Filtros,
} from "./styles";
import React from "react";
import { Footer } from "@/components/Footer";
import { SearchBox } from "@/components/Heading/SearchBox";
import { DropdownSelect } from "@/components/DropdownSelect";
import { Card } from "@/components/Card";

import { ItemByItemAnimation } from "@/animations/ItemByItem";

import { AllWorksTsun as works } from "@/constants/WorksTsun";

interface ILayoutMainProps {
  children: React.ReactNode;
  titulo: string;
}

export const LayoutListagemObra = ({ children, titulo }: ILayoutMainProps) => {
  const generos = ["Aventura", "Fantasia", "Romance", "Ação", "Comédia"];
  const Nacionalidade = ["Japonesa", "Coreana", "Chinesa"];
  const status = ["Em andamento", "Completo", "Cancelado"];
  const ordem = ["Alfabética", "Popularidade", "Lançamento"];

  return (
    <>
      <Container>
        <Head>
          <title>{titulo}</title>
          <meta
            name="description"
            content="Site de traduções de Light Novels e mangás"
          />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Capa>
          <img
            src="https://i0.wp.com/tsundoku.com.br/wp-content/uploads/2021/01/Tsundoku-Traducoes-Ligth-Novel-Mushoku-Tensei-Volume-12-Imagem-01.jpg?resize=2000%2C1425&ssl=1"
            alt="imagem ilustrativa de obra em destaque"
          />
        </Capa>
        <Conteudo>
          <Navegacao>
            <h3>Encontre sua novel na estante da Tsun</h3>
            <SearchBox
              placeholder="Pesquisar por título"
              borda="quadrada"
              variante="secundaria"
            />
            <Filtros>
              <DropdownSelect
                label="Gênero"
                values={generos}
                onChange={(v) => console.log(v)}
              />
              <DropdownSelect
                label="Nacionalidade"
                values={Nacionalidade}
                onChange={(v) => console.log(v)}
              />
              <DropdownSelect
                label="Status"
                values={status}
                onChange={(v) => console.log(v)}
              />
              <DropdownSelect
                label="Ordernar por"
                values={ordem}
                onChange={(v) => console.log(v)}
              />
            </Filtros>
          </Navegacao>

          <Titulo>Novels</Titulo>
          <Grid>
            {works.map((item, i) => (
              <ItemByItemAnimation key={i} order={i}>
                <Card
                  href={item.href}
                  capa={item.cover}
                  titulo={item.title}
                  autor={item.author}
                  volume={`Volume ${item.volume}`}
                />
              </ItemByItemAnimation>
            ))}
          </Grid>
        </Conteudo>
      </Container>
      <Footer />
    </>
  );
};
