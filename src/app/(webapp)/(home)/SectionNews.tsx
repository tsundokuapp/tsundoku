'use client';

import { AsyncSection } from '@/components/common/section/AsyncSection';
import { Cover } from '@/components/project/Cover';
import { useRecomendations } from '@/hooks/usePublicApi';

export const SectinoNews = () => {
  const { data: recomendationResponse, isLoading } = useRecomendations();

  return (
    <AsyncSection isLoading={isLoading} title="Indicadas pela Tsun">
      {recomendationResponse?.data?.map((item) => (
        <Cover
          key={item.slugObra}
          src={item.capa}
          title={item.titulo}
          category={item.tipoObra}
          actionHome={item.slugObra}
        />
      ))}
    </AsyncSection>
  );
};
