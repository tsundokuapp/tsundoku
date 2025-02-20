'use client';

import { useEffect, useState } from 'react';

import { Title } from '@/components/common/Title';
import { DropdownContainer } from '@/components/common/dropdown/DropdownContainer';
import { DropdownOption } from '@/components/common/dropdown/DropdownOption';
import { AsyncSection } from '@/components/common/section/AsyncSection';
import { SearchTable } from '@/components/common/table';
import { Cover } from '@/components/project/Cover';
import { Debounce } from '@/helpers/Debounce';
import { STATUS_NOVEL, GENRES_NOVEL } from '@/helpers/systemValues';
import { IPublicNovels, usePublicNovels } from '@/hooks/usePublicApi';

export default function Novels() {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('Filtrar por Status');
  const [genres, setGenres] = useState('Filtrar por Gênero');
  const [novelList, setNovelList] = useState<IPublicNovels[]>();
  const { data: projectsResponse, isLoading } = usePublicNovels();

  useEffect(() => {
    if (projectsResponse?.data) {
      setNovelList(projectsResponse?.data);
    }
  }, [projectsResponse]);

  const debouncedHandleChange = Debounce((value: string) => {
    if (value === '' && projectsResponse?.data) {
      setNovelList(projectsResponse?.data);
      return;
    }

    const filtered = projectsResponse?.data.filter((item) =>
      item.titulo.toLowerCase().includes(value.toLowerCase()),
    );

    setNovelList(filtered);
  }, 1000);

  const handleChange = (value: string) => {
    setSearch(value);
    debouncedHandleChange(value);
  };

  const findByStatus = (status: string) => {
    setStatus(status);

    if (projectsResponse?.data) {
      const filtered = projectsResponse?.data.filter(
        (item) => item.statusObra === status,
      );

      setNovelList(filtered);
    }

    // Todo: atualizar a forma de filtragem, para considerar search e filtros quando API estiver validada
    setSearch('');
  };

  const findByGenre = (genre: string) => {
    setGenres(genre);
    // Todo: descomentar quando a API estiver pronta
    // if (projectsResponse?.data) {
    //   const filtered = projectsResponse?.data.filter((item) =>
    //     item.listaGeneros.includes(genre),
    //   );
    //   setNovelList(filtered);
    // }
  };

  const FilterByStatus = () => {
    return (
      <DropdownContainer
        value={status}
        label={status || 'Filtrar Status'}
        className="w-[180px]"
      >
        {STATUS_NOVEL.map((item, index) => (
          <DropdownOption
            key={index}
            label={item}
            onClick={() => findByStatus(item)}
            value={item}
            selected={item === status}
          />
        ))}
      </DropdownContainer>
    );
  };

  const FilterByGenres = () => {
    return (
      <DropdownContainer
        value={genres}
        label={genres || 'Filtrar Gênero'}
        className="w-[190px]"
      >
        {GENRES_NOVEL.map((item, index) => (
          <DropdownOption
            key={index}
            label={item}
            onClick={() => findByGenre(item)}
            value={item}
            selected={item === genres}
          />
        ))}
      </DropdownContainer>
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <Title title="Novels da Tsun" />
      <SearchTable
        value={search}
        onChange={handleChange}
        fullWidth
        placeholder="Buscar por título ou título alternativo"
      />
      <div className="flex flex-row items-center justify-start gap-4">
        <FilterByStatus />
        <FilterByGenres />
      </div>
      <AsyncSection isLoading={isLoading} className="mt-8 flex-wrap">
        {novelList?.map((item) => (
          <Cover
            key={item.id}
            src={item.urlCapa}
            title={item.titulo}
            category={item.tipoObra}
            actionHome={item.slug}
          />
        ))}
      </AsyncSection>
    </div>
  );
}
