'use client';
// Color Checked
// Components Checked
import { Accordion as AccordionTsun } from '@/components/common/Accordion';
import { Title } from '@/components/common/Title';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/shadcn/avatar';

const ItemAccordionTsun = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex w-full space-x-4 border-b border-b-gray-200 p-4">
      {children}
    </div>
  );
};

export default function About() {
  return (
    <div className="flex flex-1 flex-col items-center gap-12">
      <div className="flex w-[800px] flex-col gap-4">
        <Title title="BEM-VINDO À TSUNDOKU TRADUÇÕES" />
        <p>
          Surgimos em uma noite, quando certo alguém foi beber cerveja e
          acidentalmente comprou um site, mas só apareceu para explicar a
          situação dois dias depois.
        </p>
        <p>
          Com boa parte dos envolvidos sendo conhecidos de longa data, buscamos
          criar um ambiente amistoso e divertido onde, sem qualquer cobrança ou
          compromisso estabelecido, divertimo-nos com a tradução e edição
          daquilo que nos atrai, e justamente por ser algo de nosso gosto,
          atestamos a plena qualidade de tudo que é aqui encontrado.
        </p>
        <p>
          Com plena confiança nas habilidades de cada um de nossos membros,
          focamos em obras que saem um pouco daquele clichê extremamente batido,
          e às vezes não, cumprindo com nosso objetivo, já que “Tsundoku” é a
          prática de acumular livros que queremos ler e talvez não cheguemos a
          ler, e pretendemos oferecer uma ampla gama de materiais para todos os
          públicos, desde que adequem-se àquilo que é mais importante: nosso
          gosto.
        </p>
        <p>
          Se tiver interesse em saber como nos apoiar nesta jornada, sempre
          mantendo um alto nível de qualidade e uma boa frequência, basta
          acessar Formas de Apoio.
        </p>
      </div>
      <div className="flex w-[800px] flex-col gap-4">
        <Title title="Nossa Equipe" />
        <AccordionTsun title="Administradores">
          <section className="flex flex-col gap-4">
            <ItemAccordionTsun>
              <Avatar className="h-16 w-16">
                <AvatarImage src="https://s4.anilist.co/file/anilistcdn/user/avatar/large/b5600801-DVnlQJR4iJ96.jpg" />
                <AvatarFallback>BR</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <h4 className="text-sm font-semibold">Bravo</h4>
                <p className="text-sm">
                  &quot;Pense positivo e deixe o universo fazer seu
                  trabalho.&quot;
                </p>
                <div className="items-left flex w-full flex-col pt-2">
                  <span className="text-muted-foreground text-xs font-bold">
                    Obras Favoritas:
                  </span>
                  <span className="text-muted-foreground text-xs">Bleach.</span>
                </div>
              </div>
            </ItemAccordionTsun>
            <ItemAccordionTsun>
              <Avatar className="h-16 w-16">
                <AvatarImage src="https://s4.anilist.co/file/anilistcdn/user/avatar/large/b5779201-K07pMJG3aJAn.png" />
                <AvatarFallback>BR</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <h4 className="text-sm font-semibold">Axios</h4>
                <p className="text-sm">
                  &quot;Violência e dinheiro só não resolve se for pouco.&quot;
                </p>
                <div className="items-left flex w-full flex-col pt-2">
                  <span className="text-muted-foreground text-xs font-bold">
                    Obras Favoritas:
                  </span>
                  <span className="text-muted-foreground text-xs">
                    Bruxa Errante: A Jornada de Elaina.
                  </span>
                </div>
              </div>
            </ItemAccordionTsun>
          </section>
        </AccordionTsun>

        <AccordionTsun title="Editores">
          <section className="flex flex-col gap-4 sm:flex-row">
            <div className="flex w-full space-x-4">
              <p>Em breve</p>
            </div>
          </section>
        </AccordionTsun>

        <AccordionTsun title="Tradutores">
          <section className="flex flex-col gap-4 sm:flex-row">
            <div className="flex w-full space-x-4">
              <p>Em breve</p>
            </div>
          </section>
        </AccordionTsun>

        <AccordionTsun title="Revisores">
          <section className="flex flex-col gap-4 sm:flex-row">
            <div className="flex w-full space-x-4">
              <p>Em breve</p>
            </div>
          </section>
        </AccordionTsun>
      </div>
    </div>
  );
}
