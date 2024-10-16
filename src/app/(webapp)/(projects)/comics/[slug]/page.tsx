import { Title } from '@/components/common/Title';
import { Chapter } from '@/components/project/Chapter';
import { ProjectData } from '@/components/project/ProjectData';

interface ComicsProps {
  params: {
    slug: string;
  };
}

export default function Comics(props: ComicsProps) {
  return (
    <div className="flex flex-col gap-12">
      <ProjectData
        src="/cover-shadow.webp"
        title={props.params.slug}
        altTitle={[
          'kage no jitsuryokusha ni naritakute',
          'The Eminence in Shadow',
        ]}
        author="Aizawa Daisuke"
        artist="Tauzai"
        status="ongoing"
        description="Algumas pessoas simplesmente não são adequadas para desempenhar o papel do herói chamativo e direto ou do vilão covarde que gira o bigode e tem um brio grandioso. Em vez disso, eles operam nas sombras e controlam a sociedade através de inteligência e inteligência. Esse é o papel que Cid quer desempenhar quando for transportado para outro mundo. Cid conta uma ou três histórias e se torna o líder improvável da organização subterrânea Shadow Garden que luta contra um culto ameaçador (que ele inventou totalmente). No entanto, há um problema que nem mesmo sua imaginação selvagem esperava: o culto que ele inventou realmente existe, e eles estão mais do que descontentes porque sua fantasia de poder apenas atrapalhou seus planos malignos!"
        tags={['Ação', 'Aventura', 'Comédia', 'Drama', 'Fantasia', 'Romance']}
      />
      <Title title="Mangá" />
      <div>
        <Chapter number={67} date={new Date('2021-07-01')} />
        <Chapter number={66} date={new Date('2021-07-01')} />
        <Chapter number={65} date={new Date('2021-07-01')} />
        <Chapter number={64} date={new Date('2021-07-01')} />
        <Chapter number={63} date={new Date('2021-07-01')} />
        <Chapter number={62} date={new Date('2021-07-01')} />
        <Chapter number={61} date={new Date('2021-07-01')} />
        <Chapter number={60} date={new Date('2021-07-01')} />
        <Chapter number={59} date={new Date('2021-07-01')} />
        <Chapter number={58} date={new Date('2021-07-01')} />
        <Chapter number={57} date={new Date('2021-07-01')} />
        <Chapter number={56} date={new Date('2021-07-01')} />
        <Chapter number={55} date={new Date('2021-07-01')} />
        <Chapter number={54} date={new Date('2021-07-01')} />
        <Chapter number={53} date={new Date('2021-07-01')} />
        <Chapter number={52} date={new Date('2021-07-01')} />
        <Chapter number={51} date={new Date('2021-07-01')} />
        <Chapter number={50} date={new Date('2021-07-01')} />
        <Chapter number={49} date={new Date('2021-07-01')} />
        <Chapter number={48} date={new Date('2021-07-01')} />
        <Chapter number={47} date={new Date('2021-07-01')} />
        <Chapter number={46} date={new Date('2021-07-01')} />
        <Chapter number={45} date={new Date('2021-07-01')} />
        <Chapter number={44} date={new Date('2021-07-01')} />
        <Chapter number={43} date={new Date('2021-07-01')} />
        <Chapter number={42} date={new Date('2021-07-01')} />
        <Chapter number={41} date={new Date('2021-07-01')} />
        <Chapter number={40} date={new Date('2021-07-01')} />
        <Chapter number={39} date={new Date('2021-07-01')} />
        <Chapter number={38} date={new Date('2021-07-01')} />
        <Chapter number={37} date={new Date('2021-07-01')} />
        <Chapter number={36} date={new Date('2021-07-01')} />
        <Chapter number={35} date={new Date('2021-07-01')} />
        <Chapter number={34} date={new Date('2021-07-01')} />
        <Chapter number={33} date={new Date('2021-07-01')} />
        <Chapter number={32} date={new Date('2021-07-01')} />
        <Chapter number={31} date={new Date('2021-07-01')} />
        <Chapter number={30} date={new Date('2021-07-01')} variant="fill" />
        <Chapter number={29} date={new Date('2021-07-01')} variant="fill" />
        <Chapter number={28} date={new Date('2021-07-01')} variant="fill" />
        <Chapter number={27} date={new Date('2021-07-01')} variant="fill" />
        <Chapter number={26} date={new Date('2021-07-01')} variant="fill" />
        <Chapter number={25} date={new Date('2021-07-01')} variant="fill" />
        <Chapter number={24} date={new Date('2021-07-01')} variant="fill" />
        <Chapter number={23} date={new Date('2021-07-01')} variant="fill" />
        <Chapter number={22} date={new Date('2021-07-01')} variant="fill" />
        <Chapter number={21} date={new Date('2021-07-01')} variant="fill" />
        <Chapter number={20} date={new Date('2021-07-01')} variant="fill" />
        <Chapter number={19} date={new Date('2021-07-01')} variant="fill" />
        <Chapter number={18} date={new Date('2021-07-01')} variant="fill" />
        <Chapter number={17} date={new Date('2021-07-01')} variant="fill" />
        <Chapter number={16} date={new Date('2021-07-01')} variant="fill" />
        <Chapter number={15} date={new Date('2021-07-01')} variant="fill" />
        <Chapter number={14} date={new Date('2021-07-01')} variant="fill" />
        <Chapter number={13} date={new Date('2021-07-01')} variant="fill" />
        <Chapter number={12} date={new Date('2021-07-01')} variant="fill" />
        <Chapter number={11} date={new Date('2021-07-01')} variant="fill" />
        <Chapter number={10} date={new Date('2021-07-01')} variant="fill" />
        <Chapter number={9} date={new Date('2021-07-01')} variant="fill" />
        <Chapter number={8} date={new Date('2021-07-01')} variant="fill" />
        <Chapter number={7} date={new Date('2021-07-01')} variant="fill" />
        <Chapter number={6} date={new Date('2021-07-01')} variant="fill" />
        <Chapter number={5} date={new Date('2021-07-01')} variant="fill" />
        <Chapter number={4} date={new Date('2021-07-01')} variant="fill" />
        <Chapter number={3} date={new Date('2021-07-01')} variant="fill" />
        <Chapter number={2} date={new Date('2021-07-01')} variant="fill" />
        <Chapter number={1} date={new Date('2021-07-01')} variant="fill" />
      </div>
    </div>
  );
}
