'use client';

import { usePublicComicSlug } from '@/features/comics/hooks/usePublicComics';
import { ProjectData } from '@/features/project/components/ProjectData';
import { ComicData } from '@/features/project/components/comic/ComicData';
import { NoContent } from '@/shared/components/feedback/noContent';
import { AsyncSection } from '@/shared/components/layout/section/AsyncSection';
import { TStatusComic } from '@/shared/types/system';

export default function Comic({ params }: { params: { slug: string } }) {
  const slug = params.slug;

  const { data: response, isLoading } = usePublicComicSlug(slug || '');

  // Extrai dados apenas se response.ok === true
  const comic = response?.ok ? response.data : undefined;
  const hasError = response && !response.ok;

  const infoOrDefault = (info: string | undefined) => info || 'Não informado';

  if (hasError) {
    return <NoContent msg="Erro ao carregar o mangá. Tente novamente." />;
  }

  return (
    <AsyncSection isLoading={isLoading}>
      <div className="flex w-full flex-col gap-12">
        <ProjectData
          src={comic?.urlCapa || ''}
          banner={comic?.urlBanner || ''}
          title={infoOrDefault(comic?.titulo)}
          altTitle={infoOrDefault(comic?.tituloAlternativo)}
          author={infoOrDefault(comic?.autor)}
          artist={infoOrDefault(comic?.artista)}
          status={infoOrDefault(comic?.statusObra) as TStatusComic}
          description={infoOrDefault(comic?.sinopse)}
          genres={comic?.listaGeneros || []}
          note={comic?.observacao}
        />

        {comic?.slug && <ComicData title="Mangá" comicSlug={comic.slug} />}
      </div>
    </AsyncSection>
  );
}
