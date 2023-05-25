import Image from "next/image";

import logoPadrim from "@/assets/logo/logoPadrim.jpg";
import logoPix from "@/assets/logo/logoPix.png";
import logoStripe from "@/assets/logo/logoStripe.png";
import { GridImages } from "@/components/GridImages";
import { LayoutMain } from "@/components/Layouts/Main";
import { Section } from "@/components/Section";
import { Info, Logos, Team } from "@/styles/About/styles";

const logoTsun =
  "https://i0.wp.com/tsundoku.com.br/wp-content/uploads/2022/01/banner_950x540-1.jpg?resize=855%2C486&ssl=1";

export default function Home() {
  return (
    <>
      <LayoutMain title="Tsundoku Traduções">
        <Section>
          <Image
            src={logoTsun}
            alt="Um livro aberto com uma chama, todo o desenho é colorido em tons de azul, embaixo o nome Tsundoku."
            width={350}
            height={200}
          />
          <Info>
            <h2>Bem vindo a Tsundoku!</h2>
            <p>
              A Tsundoku Traduções é um site voltado à tradução e publicação de
              Light Novels, Web Novels e Mangás para o português brasileiro.
            </p>
            <p>
              Surgimos em uma noite, quando certo alguém foi beber cerveja e
              acidentalmente comprou um site, mas só apareceu para explicar a
              situação dois dias depois. Com boa parte dos envolvidos sendo
              conhecidos de longa data, buscamos criar um ambiente amistoso e
              divertido onde, sem qualquer cobrança ou compromisso estabelecido,
              divertimo-nos com a tradução e edição daquilo que nos atrai, e
              justamente por ser algo de nosso gosto, atestamos a plena
              qualidade de tudo que é aqui encontrado. Com plena confiança nas
              habilidades de cada um de nossos membros, focamos em obras que
              saem um pouco daquele clichê extremamente batido, e às vezes não,
              cumprindo com nosso objetivo, já que “Tsundoku” é a prática de
              acumular livros que queremos ler e talvez não cheguemos a ler, e
              pretendemos oferecer uma ampla gama de materiais para todos os
              públicos, desde que adequem-se àquilo que é mais importante: nosso
              gosto.
            </p>
            <p>
              Se tiver interesse em saber como nos apoiar nesta jornada, sempre
              mantendo um alto nível de qualidade e uma boa frequência, basta
              acessar Formas de Apoio.
            </p>

            <h2>Apoio</h2>
            <p>
              Nenhum caminho é trilhado sem a ajuda de alguém, um simples ato
              pode mudar todo um destino. Claro, se você está aqui, já mostra
              que tem interesse, e nós ficamos gratos por isso.
            </p>
            <p>
              Comente e divulgue Os comentários são, sem sombra de dúvida, a
              melhor forma de nos motivar a continuar com o nosso trabalho.
              Apesar de não respondermos, sempre estamos lá, lendo.
            </p>
            <p>
              Seja um Padrinho ou uma Madrinha Ao ser um Padrinho ou Madrinha,
              você estará nos ajudando mensalmente com valores acessíveis, e
              também estará recebendo recompensas por isso. Saiba mais no
              discord. Independentemente da forma de apoio, nós ficamos muito
              felizes em saber que você se interessou em nos ajudar.
            </p>
          </Info>
        </Section>
        <Section>
          <Logos>
            <Image src={logoPadrim} alt="Logo do Padrim" />
            <Image src={logoStripe} alt="Logo do Stripe" />
            <Image src={logoPix} alt="Logo do Pix" />
          </Logos>
        </Section>
        <Team>
          <h2>Equipe</h2>
          <GridImages />
        </Team>
      </LayoutMain>
    </>
  );
}
