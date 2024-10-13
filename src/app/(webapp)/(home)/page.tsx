import { Banner } from '@/components/common/Banner';
import { LinkButton } from '@/components/common/LinkButton';
import { Title } from '@/components/common/Title';
import { Cover } from '@/components/project/Cover';

export default function Home() {
  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-row flex-wrap justify-between gap-4">
        <Banner className="flex h-64 min-w-fit flex-1 flex-row items-center justify-center rounded-3xl bg-gray-500">
          <span className="text-2xl font-bold uppercase text-white">
            Banner do Bravo
          </span>
        </Banner>
        <Banner className="flex h-64 w-96 flex-col items-center justify-center gap-6 rounded-3xl bg-gray-700 p-6">
          <div className="flex flex-col">
            <span className="text-base text-white">
              Gostaria de fazer parte da nossa staff?
            </span>
            <span className="text-2xl font-bold uppercase text-white">
              Estamos Recrutando
            </span>
          </div>
          <LinkButton
            text="Me inscrever"
            className="flex h-12 w-80 flex-row items-center justify-center rounded-md bg-gray-900 font-bold uppercase text-white hover:bg-slate-800"
          ></LinkButton>
        </Banner>
      </div>
      <Title title="Novidades na Tsun" />
      <div className="flex flex-row gap-6">
        <Cover
          src="/cover-alya.webp"
          title="Alya às Vezes Esconde seus Sentimentos em Russo"
          category="Novel"
        />
        <Cover
          src="/cover-shadow.webp"
          title="Kage no Jitsuryokusha ni Naritakute"
          category="Mangá"
        />
        <Cover
          src="/cover-seven.webp"
          title="Kage no Jitsuryokusha ni Naritakute! Master of Garden ~Shichikage Retsuden~"
          category="Mangá"
        />
      </div>
      <Title title="Atualizados Recentemente" />
      <div className="flex flex-row flex-wrap gap-6">
        <Cover
          src="/cover-alya.webp"
          title="Alya às Vezes Esconde seus Sentimentos em Russo"
          category="Novel"
        />
        <Cover
          src="/cover-shadow.webp"
          title="Kage no Jitsuryokusha ni Naritakute"
          category="Mangá"
        />
        <Cover
          src="/cover-seven.webp"
          title="Kage no Jitsuryokusha ni Naritakute! Master of Garden ~Shichikage Retsuden~"
          category="Mangá"
        />
        <Cover
          src="/cover-alya.webp"
          title="Alya às Vezes Esconde seus Sentimentos em Russo"
          category="Novel"
        />
        <Cover
          src="/cover-shadow.webp"
          title="Kage no Jitsuryokusha ni Naritakute"
          category="Mangá"
        />
        <Cover
          src="/cover-seven.webp"
          title="Kage no Jitsuryokusha ni Naritakute! Master of Garden ~Shichikage Retsuden~"
          category="Mangá"
        />
        <Cover
          src="/cover-alya.webp"
          title="Alya às Vezes Esconde seus Sentimentos em Russo"
          category="Novel"
        />
        <Cover
          src="/cover-shadow.webp"
          title="Kage no Jitsuryokusha ni Naritakute"
          category="Mangá"
        />
        <Cover
          src="/cover-seven.webp"
          title="Kage no Jitsuryokusha ni Naritakute! Master of Garden ~Shichikage Retsuden~"
          category="Mangá"
        />
      </div>
    </div>
  );
}
