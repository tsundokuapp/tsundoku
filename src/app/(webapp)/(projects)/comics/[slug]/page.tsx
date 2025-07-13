'use client';
// Color Checked
// Components Checked
import { usePathname } from 'next/navigation';

import { TStatusComic } from '@/@types/System';
import { AsyncSection } from '@/components/common/section/AsyncSection';
import { ComicData } from '@/components/project/ComicData';
import { ProjectData } from '@/components/project/ProjectData';
import { usePublicComicSlug } from '@/hooks/usePublicApi';

export default function Comic() {
  const pathname = usePathname();
  const slug = pathname.split('/').pop();

  const { data: comicResponse, isLoading } = usePublicComicSlug(
    (slug as string) || '',
  );

  const infoOrDefault = (info: string | undefined) => info || 'Não informado';

  return (
    <AsyncSection isLoading={isLoading}>
      <div className="flex w-full flex-col gap-12">
        <ProjectData
          src={comicResponse?.urlCapa || ''}
          banner={comicResponse?.urlBanner || ''}
          title={infoOrDefault(comicResponse?.titulo)}
          altTitle={infoOrDefault(comicResponse?.tituloAlternativo)}
          author={infoOrDefault(comicResponse?.autor)}
          artist={infoOrDefault(comicResponse?.artista)}
          status={infoOrDefault(comicResponse?.statusObra) as TStatusComic}
          description={infoOrDefault(comicResponse?.sinopse)}
          genres={comicResponse?.listaGeneros || []}
          note={comicResponse?.observacao}
        />

        {comicResponse?.slug && (
          <ComicData title="Mangá" comicSlug={comicResponse.slug} />
        )}
      </div>
    </AsyncSection>
  );
}
