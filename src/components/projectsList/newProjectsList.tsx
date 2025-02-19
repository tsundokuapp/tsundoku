'use client';
// Color Checked
// Components Checked
import { AsyncSection } from '@/components/common/section/AsyncSection';
import { useRecomendations } from '@/hooks/usePublicApi';

import { Cover } from '../project/Cover';

export function NewProjectsList() {
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
}
