'use client';
// Color Checked
// Components Checked
import { usePathname } from 'next/navigation';

import { IGenres } from '@/@types/Api';
import { TStatusComic } from '@/@types/System';
import { AsyncSection } from '@/components/common/section/AsyncSection';
import type { ChapterProps } from '@/components/project/Chapter';
import { ComicData } from '@/components/project/ComicData';
import { ProjectData } from '@/components/project/ProjectData';
import { usePublicComicSlug } from '@/hooks/usePublicApi';

export default function Comic() {
  const pathname = usePathname();
  const slug = pathname.split('/').pop();

  // const { setComicBanner } = useComicStore();
  const { data: comicResponse, isLoading } = usePublicComicSlug(
    (slug as string) || '',
  );

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

  const infoOrDefault = (info: string | undefined) => info || 'Não informado';

  return (
    <AsyncSection isLoading={isLoading}>
      <div className="flex w-full flex-col gap-12">
        <ProjectData
          src={comicResponse?.urlCapa || ''}
          title={infoOrDefault(comicResponse?.titulo)}
          altTitle={infoOrDefault(comicResponse?.tituloAlternativo)}
          author={infoOrDefault(comicResponse?.autor)}
          artist={infoOrDefault(comicResponse?.artista)}
          status={infoOrDefault(comicResponse?.statusObra) as TStatusComic}
          description={infoOrDefault(comicResponse?.sinopse)}
          genres={fakeGenres}
          note={comicResponse?.observacao}
        />

        <ComicData title="Mangá" items={exampleChapterList} />
      </div>
    </AsyncSection>
  );
}
