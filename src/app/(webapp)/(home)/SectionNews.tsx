'use client';

import { AsyncSection } from '@/components/common/section/AsyncSection';
import { Cover } from '@/components/project/Cover';
import { useRecomendations } from '@/hooks/usePublicApi';

export const SectinoNews = () => {
  const { data: recomendationResponse, isLoading } = useRecomendations();

  return (
    <AsyncSection isLoading={isLoading} title="Novidades na Tsun">
      {recomendationResponse?.data?.map((item) => (
        <Cover
          key={item.slugObra}
          src={'/cover-shadow.webp'}
          title={item.titulo}
          category="Mangá"
          actionHome={item.slugObra}
        />
      ))}
    </AsyncSection>
  );
};
