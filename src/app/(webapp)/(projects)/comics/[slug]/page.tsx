// Color Checked
// Components Checked
import { IGenres } from '@/@types/Api';
import type { ChapterProps } from '@/components/project/Chapter';
import { ComicData } from '@/components/project/ComicData';
import { ProjectData } from '@/components/project/ProjectData';

interface ComicProps {
  params: {
    slug: string;
  };
}

export default function Comic(props: ComicProps) {
  const exampleChapterList: ChapterProps[] = [
    { number: '1', date: new Date('2019-09-01'), variant: 'fill' },
    { number: '2', date: new Date('2019-10-01'), variant: 'fill' },
    { number: '3', date: new Date('2019-11-01'), variant: 'fill' },
    { number: '4', date: new Date('2019-12-01'), variant: 'fill' },
    { number: '5', date: new Date('2020-01-01'), variant: 'fill' },
    { number: '6', date: new Date('2020-02-01'), variant: 'fill' },
    { number: '7', date: new Date('2020-03-01'), variant: 'fill' },
    { number: '8', date: new Date('2020-04-01'), variant: 'fill' },
    { number: '9', date: new Date('2020-05-01'), variant: 'fill' },
    { number: '10', date: new Date('2020-06-01'), variant: 'fill' },
    { number: '11', date: new Date('2020-07-01'), variant: 'fill' },
    { number: '12', date: new Date('2020-08-01'), variant: 'fill' },
    { number: '13', date: new Date('2020-09-01'), variant: 'fill' },
    { number: '14', date: new Date('2020-10-01'), variant: 'fill' },
    { number: '15', date: new Date('2020-11-01'), variant: 'fill' },
    { number: '16', date: new Date('2020-12-01') },
    { number: '17', date: new Date('2020-12-01') },
    { number: '18', date: new Date('2021-01-01') },
    { number: '19', date: new Date('2021-02-01') },
    { number: '20', date: new Date('2021-03-01') },
    { number: '21', date: new Date('2021-04-01') },
    { number: '22', date: new Date('2021-05-01') },
    { number: '23', date: new Date('2021-06-01') },
    { number: '24', date: new Date('2021-07-01') },
  ];

  const fakeGenres: IGenres[] = [
    { id: '1', descricao: 'Ação', slug: 'acao' },
    { id: '2', descricao: 'Aventura', slug: 'aventura' },
    { id: '3', descricao: 'Comédia', slug: 'comedia' },
    { id: '4', descricao: 'Drama', slug: 'drama' },
    { id: '5', descricao: 'Fantasia', slug: 'fantasia' },
    { id: '6', descricao: 'Romance', slug: 'romance' },
  ];

  return (
    <div className="flex w-full flex-col gap-12">
      <ProjectData
        src="/cover-shadow.webp"
        title={props.params.slug}
        altTitle="kage no jitsuryokusha ni naritakute, The Eminence in Shadow"
        author="Aizawa Daisuke"
        artist="Tauzai"
        status="Em andamento"
        description="Algumas pessoas simplesmente não são adequadas para desempenhar o papel do herói chamativo e direto ou do vilão covarde que gira o bigode e tem um brio grandioso. Em vez disso, eles operam nas sombras e controlam a sociedade através de inteligência e inteligência. Esse é o papel que Cid quer desempenhar quando for transportado para outro mundo. Cid conta uma ou três histórias e se torna o líder improvável da organização subterrânea Shadow Garden que luta contra um culto ameaçador (que ele inventou totalmente). No entanto, há um problema que nem mesmo sua imaginação selvagem esperava: o culto que ele inventou realmente existe, e eles estão mais do que descontentes porque sua fantasia de poder apenas atrapalhou seus planos malignos!"
        genres={fakeGenres}
      />

      <ComicData title="Mangá" items={exampleChapterList} />
    </div>
  );
}
