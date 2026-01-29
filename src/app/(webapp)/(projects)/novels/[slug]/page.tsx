'use client';

import { usePublicNovelSlug } from '@/features/novels/hooks/usePublicNovels';
import { ProjectData } from '@/features/project/components/ProjectData';
import { NovelData } from '@/features/project/components/novel/NovelData';
import { NoContent } from '@/shared/components/feedback/noContent';
import { AsyncSection } from '@/shared/components/layout/section/AsyncSection';
import { TStatusNovel } from '@/shared/types/system';

export default function Novel({ params }: { params: { slug: string } }) {
  const slug = params.slug;

  const { data: response, isLoading } = usePublicNovelSlug(slug);

  const novel = response?.ok ? response.data : undefined;
  const hasError = response && !response.ok;

  const infoOrDefault = (info: string | undefined) => info || 'Não informado';

  if (hasError) {
    return <NoContent msg="Erro ao carregar a novel. Tente novamente." />;
  }

  return (
    <AsyncSection isLoading={isLoading}>
      <div className="flex w-full flex-col gap-12">
        <>
          <ProjectData
            src={novel?.urlCapa || ''}
            banner={novel?.urlBanner || ''}
            title={infoOrDefault(novel?.titulo)}
            altTitle={infoOrDefault(novel?.tituloAlternativo)}
            author={infoOrDefault(novel?.autor)}
            artist={infoOrDefault(novel?.artista)}
            status={infoOrDefault(novel?.statusObra) as TStatusNovel}
            description={infoOrDefault(novel?.sinopse)}
            genres={novel?.listaGeneros || []}
            note={novel?.observacao}
          />

          {novel?.id && <NovelData title="Light Novel" novelId={novel.id} />}
        </>
      </div>
    </AsyncSection>
  );
}
