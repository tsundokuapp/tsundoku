'use client';

import { IProjectRecomendations } from '@/features/project/api/types';
import { useRecomendations } from '@/features/project/hooks/useProject';
import { AsyncSection } from '@/shared/components/layout/section/AsyncSection';

import { Cover } from '../Cover';

export function NewProjectsList() {
  const { data: response, isLoading } = useRecomendations();

  const recomendations = response?.ok ? response.data : undefined;

  return (
    <AsyncSection isLoading={isLoading} title="Indicadas pela Tsun">
      {recomendations?.map((item: IProjectRecomendations) => (
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
