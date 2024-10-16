import { Title } from '@/components/common/Title';
import { Cover } from '@/components/project/Cover';

export default function Comics() {
  return (
    <div className="flex flex-col gap-12">
      <Title title="Comics da Tsun" />
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
          action="comics/kage-no-jitsuryokusha-ni-naritakute"
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
