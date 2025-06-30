'use client';
// Color Checked
// Components Checked
import { AsyncSection } from '@/components/common/section/AsyncSection';
import { Cover } from '@/components/project/Cover';
import { useProjects } from '@/hooks/usePublicApi';

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
