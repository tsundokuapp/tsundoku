import { NovelData } from '@/components/project/NovelData';
import { ProjectData } from '@/components/project/ProjectData';
import type { VolumeProps } from '@/components/project/Volume';

interface NovelProps {
  params: {
    slug: string;
  };
}

export default function Novel(props: NovelProps) {
  const exampleVolumeList: VolumeProps[] = [
    {
      number: '1',
      chapters: [
        { number: '1.1', date: new Date('2019-09-01'), variant: 'fill' },
        { number: '1.2', date: new Date('2019-09-02'), variant: 'fill' },
        { number: '1.3', date: new Date('2019-09-03'), variant: 'fill' },
        { number: '1.4', date: new Date('2019-09-04'), variant: 'fill' },
        { number: '1.5', date: new Date('2019-09-05'), variant: 'fill' },
        { number: '1.6', date: new Date('2019-09-06'), variant: 'fill' },
      ],
    },
    {
      number: '2',
      chapters: [
        { number: '2.1', date: new Date('2020-09-01'), variant: 'fill' },
        { number: '2.2', date: new Date('2020-09-02'), variant: 'fill' },
        { number: '2.3', date: new Date('2020-09-03'), variant: 'fill' },
        { number: '2.4', date: new Date('2020-09-04') },
        { number: '2.5', date: new Date('2020-09-05') },
      ],
    },
    {
      number: '3',
      chapters: [{ number: '3.1', date: new Date('2021-09-01') }],
    },
  ];

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
        status="Em andamento"
        description="Algumas pessoas simplesmente não são adequadas para desempenhar o papel do herói chamativo e direto ou do vilão covarde que gira o bigode e tem um brio grandioso. Em vez disso, eles operam nas sombras e controlam a sociedade através de inteligência e inteligência. Esse é o papel que Cid quer desempenhar quando for transportado para outro mundo. Cid conta uma ou três histórias e se torna o líder improvável da organização subterrânea Shadow Garden que luta contra um culto ameaçador (que ele inventou totalmente). No entanto, há um problema que nem mesmo sua imaginação selvagem esperava: o culto que ele inventou realmente existe, e eles estão mais do que descontentes porque sua fantasia de poder apenas atrapalhou seus planos malignos!"
        tags={['Ação', 'Aventura', 'Comédia', 'Drama', 'Fantasia', 'Romance']}
      />

      <NovelData title="Light Novel" items={exampleVolumeList} />
    </div>
  );
}
