// Color Checked
// Components Checked
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/shadcn/accordion';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/shadcn/avatar';

export default function About() {
  return (
    <div className="flex flex-1 flex-col items-center gap-12">
      <div className="flex w-[800px] flex-col gap-4">
        <h1 className="mb-6 text-2xl font-bold uppercase">
          BEM-VINDO À TSUNDOKU TRADUÇÕES
        </h1>
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
      <div className="w-[800px]">
        <h1 className="mb-6 text-2xl font-bold uppercase">Nossa Equipe</h1>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="Administradores">
            <AccordionTrigger>Administradores</AccordionTrigger>
            <AccordionContent>
              <div className="flex w-full space-x-4">
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
                    <span className="text-muted-foreground text-xs">
                      Mushoku Tensei, Bruxa Errante e Sua História
                    </span>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="Moderadores">
            <AccordionTrigger>Moderadores</AccordionTrigger>
            <AccordionContent>
              <div className="items-left flex w-full flex-col gap-10">
                <div className="flex w-full space-x-4">
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
                      <span className="text-muted-foreground text-xs">
                        Mushoku Tensei, Bruxa Errante e Sua História
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex w-full space-x-4">
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
                      <span className="text-muted-foreground text-xs">
                        Mushoku Tensei, Bruxa Errante e Sua História
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="Editores">
            <AccordionTrigger>Editores</AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="Revisores">
            <AccordionTrigger>Revisores</AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="Tradutores">
            <AccordionTrigger>Tradutores</AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
