'use client';

import { AsyncSection } from '@/components/common/section/AsyncSection';
import { Cover } from '@/components/project/Cover';
import { convertSlugToText } from '@/helpers/ConvertSlugToText';
import { usePublicNovels } from '@/hooks/usePublicApi';

export default function Novels() {
  const { data: projectsResponse, isLoading } = usePublicNovels();

  return (
    <div className="flex flex-col gap-12">
      <AsyncSection
        title="Atualizados Recentemente"
        isLoading={isLoading}
        className="flex-wrap"
      >
        {projectsResponse?.data?.map((item) => (
          <Cover
            key={item.id}
            src={item.urlCapa}
            title={item.titulo}
            category={convertSlugToText(item.tipoObraSlug)}
            actionHome={item.slug}
          />
        ))}
      </AsyncSection>
    </div>
  );
}
