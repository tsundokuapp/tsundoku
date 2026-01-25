'use client';

import { Cover } from '@/features/project/components/Cover';
import { useProjects } from '@/features/project/hooks/useProject';
import { AsyncSection } from '@/shared/components/layout/section/AsyncSection';

export function UpdatedProjectsList() {
  const { data: projectsResponse, isLoading } = useProjects();
  const currentChapter = (chapter: string) => {
    if (!chapter) return '';

    const isChapterNumber = /^\d+$/.test(chapter);

    if (!isChapterNumber) {
      return chapter;
    }

    return `Capítulo ${chapter}`;
  };

  return (
    <AsyncSection
      title="Atualizados Recentemente"
      isLoading={isLoading}
      className="flex-wrap"
    >
      {projectsResponse?.data?.map((item) => (
        <Cover
          key={item.slugObra}
          src={item.urlCapa}
          title={item.aliasObra}
          category={item.tipoObra}
          actionHome={item.slugObra}
          text={currentChapter(item.numeroCapitulo)}
        />
      ))}
    </AsyncSection>
  );
}
