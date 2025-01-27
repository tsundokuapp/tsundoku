'use client';

import { usePathname } from 'next/navigation';

import { AsyncSection } from '@/components/common/section/AsyncSection';
import { NovelData } from '@/components/project/NovelData';
import { ProjectData } from '@/components/project/ProjectData';
import { usePublicNovelSlug } from '@/hooks/usePublicApi';
import { IStatusNovels } from '@/types/TypesNovels';

export default function Novel() {
  const pathname = usePathname();
  const slug = pathname.split('/').pop();

  const { data: novelResponse, isLoading } = usePublicNovelSlug(
    (slug as string) || '',
  );

  const infoOrDefault = (info: string | undefined) => info || 'Não informado';

  return (
    <AsyncSection isLoading={isLoading}>
      <div className="flex flex-col gap-12">
        <ProjectData
          src={novelResponse?.urlCapa || ''}
          title={infoOrDefault(novelResponse?.titulo)}
          altTitle={infoOrDefault(novelResponse?.tituloAlternativo)}
          author={infoOrDefault(novelResponse?.autor)}
          artist={infoOrDefault(novelResponse?.artista)}
          status={infoOrDefault(novelResponse?.statusObra) as IStatusNovels}
          description={infoOrDefault(novelResponse?.sinopse)}
          genres={novelResponse?.listaGeneros || []}
          note={novelResponse?.observacao}
        />

        {novelResponse?.id && (
          <NovelData title="Light Novel" novelId={novelResponse.id} />
        )}
      </div>
    </AsyncSection>
  );
}
