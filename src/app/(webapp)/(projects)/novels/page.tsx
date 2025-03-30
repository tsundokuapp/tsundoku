'use client';
// Color Checked
// Components Checked
import { useEffect, useState } from 'react';

import { IPublicGenres, IPublicNovels } from '@/@types/Api';
import { Title } from '@/components/common/Title';
import { DropdownContainer } from '@/components/common/dropdown/DropdownContainer';
import { DropdownOption } from '@/components/common/dropdown/DropdownOption';
import { AsyncSection } from '@/components/common/section/AsyncSection';
import { SearchTable } from '@/components/common/table';
import { NoContent } from '@/components/noContent';
import { Cover } from '@/components/project/Cover';
import { Debounce } from '@/helpers/Debounce';
import { STATUS_NOVEL } from '@/helpers/systemValues';
import { usePublicGenres, usePublicNovels } from '@/hooks/usePublicApi';

export default function Novels() {
  const INITIAL_GENRES = [
    { id: '0', descricao: 'Filtrar por Gênero', slug: '' },
  ];

  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('Filtrar por Status');
  const [genres, setGenres] = useState('Filtrar por Gênero');
  const [genresList, setGenresList] = useState<IPublicGenres[]>(INITIAL_GENRES);

  const [novelList, setNovelList] = useState<IPublicNovels[]>();
  const { data: projectsResponse, isLoading } = usePublicNovels();
  const { data: genresResponse } = usePublicGenres();

  useEffect(() => {
    if (projectsResponse?.data) {
      setNovelList(projectsResponse?.data);
    }
  }, [projectsResponse]);

  useEffect(() => {
    if (genresResponse?.data) {
      const genresOrdered = genresResponse?.data.sort((a, b) =>
        a.descricao.localeCompare(b.descricao),
      );
      setGenresList(genresOrdered);
    }
  }, [genresResponse]);

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

    if (status === 'Filtrar por Status') {
      setNovelList(projectsResponse?.data);
      return;
    }

    if (projectsResponse?.data) {
      const filtered = projectsResponse?.data.filter(
        (item) => item.statusObra === status,
      );

      setNovelList(filtered);
    }

    setSearch('');
  };

  const findByGenre = (genre: string) => {
    setGenres(genre);
    if (genre === 'Filtrar por Gênero') {
      setNovelList(projectsResponse?.data);
      return;
    }

    if (projectsResponse?.data) {
      const filtered = projectsResponse?.data.filter((item) => {
        return item.listaGeneros.some((g) => g === genre);
      });

      setNovelList(filtered);
    }

    setSearch('');
  };

  const FilterByStatus = () => {
    return (
      <DropdownContainer
        value={status}
        label={status || 'Filtrar Status'}
        className="w-full sm:w-[180px]"
        onClear={() => {
          findByStatus('Filtrar por Status');
        }}
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
        className="w-full sm:w-[190px]"
        onClear={() => {
          findByGenre('Filtrar por Gênero');
        }}
      >
        {genresList.map((genre) => (
          <DropdownOption
            key={genre.id}
            label={genre.descricao}
            onClick={() => findByGenre(genre.descricao)}
            value={genre.descricao}
            selected={genre.descricao === genres}
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
      <div className="flex flex-row items-center justify-between gap-4 sm:justify-start">
        <FilterByStatus />
        <FilterByGenres />
      </div>
      <AsyncSection isLoading={isLoading} className="mt-8">
        {!novelList ? (
          <NoContent msg="Desculpe, em breve teremos conteúdos" />
        ) : (
          novelList?.map((item) => (
            <Cover
              key={item.id}
              src={item.urlCapa}
              title={item.titulo}
              category={item.tipoObra}
              action={'/novels/' + item.slug}
            />
          ))
        )}
      </AsyncSection>
    </div>
  );
}
