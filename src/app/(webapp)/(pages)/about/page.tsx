'use client';

import { DotOutline } from '@phosphor-icons/react/dist/ssr';

import { Accordion } from '@/shared/components/ui/Accordion';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/shared/components/ui/avatar';
import { Title } from '@/shared/components/ui/title/Title';

interface TeamMember {
  name: string;
  quote: string;
  avatarUrl: string;
  avatarFallback: string;
  favoriteWorks: string[];
}

const adminMembers: TeamMember[] = [
  {
    name: 'Bravo',
    quote: 'Pense positivo e deixe o universo fazer seu trabalho.',
    avatarUrl:
      'https://s4.anilist.co/file/anilistcdn/user/avatar/large/b5600801-DVnlQJR4iJ96.jpg',
    avatarFallback: 'BR',
    favoriteWorks: ['Bleach'],
  },
  {
    name: 'Axios',
    quote: 'Violencia e dinheiro so nao resolve se for pouco.',
    avatarUrl:
      'https://s4.anilist.co/file/anilistcdn/user/avatar/large/b5779201-K07pMJG3aJAn.png',
    avatarFallback: 'AX',
    favoriteWorks: ['Bruxa Errante: A Jornada de Elaina'],
  },
];

const TeamMemberCard = ({
  name,
  quote,
  avatarUrl,
  avatarFallback,
  favoriteWorks,
}: TeamMember) => {
  return (
    <article className="group relative overflow-hidden rounded-xl border border-appListBorder bg-appListBackground p-4 transition-all duration-300 hover:-translate-y-0.5 hover:bg-appListHover">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-appHighlight opacity-80" />

      <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
        <Avatar className="h-16 w-16 border-2 border-appListBorder">
          <AvatarImage src={avatarUrl} />
          <AvatarFallback>{avatarFallback}</AvatarFallback>
        </Avatar>

        <div className="min-w-0 space-y-2">
          <h4 className="text-base font-semibold text-appText">{name}</h4>

          <p className="text-sm leading-relaxed text-appSubtitle">
            &quot;{quote}&quot;
          </p>

          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-xs font-semibold uppercase tracking-wide text-appHighlight">
              Obras favoritas
            </span>
            <DotOutline size={16} className="text-appSubtitle" weight="fill" />
            {favoriteWorks.map((work) => (
              <span
                key={work}
                className="rounded-full border border-appListBorder bg-appGroupBackground px-2.5 py-1 text-xs text-appGroupText"
              >
                {work}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
};

const EmptyRoleCard = ({ role }: { role: string }) => {
  return (
    <article className="rounded-xl border border-dashed border-appListBorder bg-appListBackground px-4 py-5">
      <p className="text-sm text-appSubtitle">
        {role} em breve. Estamos preparando novidades para esta area.
      </p>
    </article>
  );
};

export default function About() {
  return (
    <div className="flex w-full flex-1 flex-col items-center gap-12 px-4 sm:px-0">
      <div className="flex w-full max-w-[800px] flex-col gap-4">
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
      <div className="flex w-full max-w-[800px] flex-col gap-4">
        <Title title="Nossa Equipe" />
        <Accordion title="Administradores">
          <section className="flex flex-col gap-4">
            {adminMembers.map((member) => (
              <TeamMemberCard key={member.name} {...member} />
            ))}
          </section>
        </Accordion>

        <Accordion title="Editores">
          <section className="flex flex-col gap-4">
            <EmptyRoleCard role="Editores" />
          </section>
        </Accordion>

        <Accordion title="Tradutores">
          <section className="flex flex-col gap-4">
            <EmptyRoleCard role="Tradutores" />
          </section>
        </Accordion>

        <Accordion title="Revisores">
          <section className="flex flex-col gap-4">
            <EmptyRoleCard role="Revisores" />
          </section>
        </Accordion>
      </div>
    </div>
  );
}
