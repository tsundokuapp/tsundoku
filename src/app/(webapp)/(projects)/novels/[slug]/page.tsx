'use client';
// Color Checked
// Components Checked
import { usePathname } from 'next/navigation';

import { TStatusNovel } from '@/@types/System';
import { AsyncSection } from '@/components/common/section/AsyncSection';
import { NovelData } from '@/components/project/NovelData';
import { ProjectData } from '@/components/project/ProjectData';
import { usePublicNovelSlug } from '@/hooks/usePublicApi';

export default function Novel() {
  const pathname = usePathname();
  const slug = pathname.split('/').pop();

  const { data: novelResponse, isLoading } = usePublicNovelSlug(
    (slug as string) || '',
  );

  const infoOrDefault = (info: string | undefined) => info || 'Não informado';

  return (
    <AsyncSection isLoading={isLoading}>
      <div className="flex w-full flex-col gap-12">
        <ProjectData
          src={novelResponse?.urlCapa || ''}
          banner={novelResponse?.urlBanner || ''}
          title={infoOrDefault(novelResponse?.titulo)}
          altTitle={infoOrDefault(novelResponse?.tituloAlternativo)}
          author={infoOrDefault(novelResponse?.autor)}
          artist={infoOrDefault(novelResponse?.artista)}
          status={infoOrDefault(novelResponse?.statusObra) as TStatusNovel}
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
