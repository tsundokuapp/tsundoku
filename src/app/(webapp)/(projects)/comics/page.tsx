'use client';
import { useEffect, useState } from 'react';

import { IPublicComics } from '@/features/comics/api/types';
import { usePublicComics } from '@/features/comics/hooks/usePublicComics';
import { IPublicGenres } from '@/features/project/api/types';
import { Cover } from '@/features/project/components/Cover';
import { usePublicGenres } from '@/features/project/hooks/useProject';
import { NoContent } from '@/shared/components/feedback/noContent';
import { AsyncSection } from '@/shared/components/layout/section/AsyncSection';
import { DropdownContainer } from '@/shared/components/ui/dropdown/DropdownContainer';
import { DropdownOption } from '@/shared/components/ui/dropdown/DropdownOption';
import { SearchTable } from '@/shared/components/ui/table/index';
import { Title } from '@/shared/components/ui/title/Title';
import { IGenres } from '@/shared/types/common';
import { Debounce } from '@/shared/utils/Debounce';
import { ORDER_BY, STATUS_COMIC, TOrderBy } from '@/shared/utils/systemValues';

export default function Comics() {
  const INITIAL_GENRES: IPublicGenres[] = [
    { label: 'Filtrar por Gênero', value: '' },
  ];

  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('Filtrar por Status');
  const [genres, setGenres] = useState('Filtrar por Gênero');
  const [orderBy, setOrderBy] = useState('Padrão');
  const [genresList, setGenresList] = useState<IPublicGenres[]>(INITIAL_GENRES);
  const [comicList, setComicList] = useState<IPublicComics[]>();

  const { data: projectsResponse, isLoading } = usePublicComics();
  const { data: genresResponse } = usePublicGenres();

  useEffect(() => {
    if (projectsResponse?.data) {
      setComicList(projectsResponse.data);
    }
  }, [projectsResponse]);

  useEffect(() => {
    if (genresResponse) {
      const genresOrdered = genresResponse.sort((a, b) =>
        a.label.localeCompare(b.label),
      );
      setGenresList(genresOrdered);
    }
  }, [genresResponse]);

  const debouncedHandleChange = Debounce((value: string) => {
    if (!projectsResponse?.data) return;

    if (value === '') {
      setComicList(projectsResponse?.data);
      return;
    }
    const filtered = projectsResponse?.data.filter((item) =>
      item.titulo.toLowerCase().includes(value.toLowerCase()),
    );
    setComicList(filtered);
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

      setComicList(filtered);
    }

    setSearch('');
  };

  const findByGenre = (genre: string) => {
    setGenres(genre);
    if (genre === 'Filtrar por Gênero') {
      setComicList(projectsResponse?.data);
      return;
    }

    if (projectsResponse?.data) {
      const filtered = projectsResponse?.data.filter((item) => {
        return item.listaGeneros.some((g: IGenres) => g.label === genre);
      });

      setComicList(filtered);
    }

    setSearch('');
  };

  const FilterByStatus = () => {
    return (
      <DropdownContainer
        value={status}
        label={status || 'Filtrar Status'}
        className="w-[180px]"
        onClear={() => resetFilter()}
      >
        {STATUS_COMIC.map((item, index) => (
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
        onClear={() => resetFilter()}
      >
        {genresList.map((genre) => (
          <DropdownOption
            key={genre.value}
            label={genre.label}
            onClick={() => findByGenre(genre.label)}
            value={genre.value}
            selected={genre.label === genres}
          />
        ))}
      </DropdownContainer>
    );
  };

  const resetFilter = () => {
    setStatus('Filtrar por Status');
    setGenres('Filtrar por Gênero');
    setSearch('');
    setComicList(projectsResponse?.data);
  };

  const OrganizeBy = () => {
    if (!comicList) return;

    const orderByToken = (item: TOrderBy) => {
      if (item === orderBy) return;

      setOrderBy(item);

      let sortedList: IPublicComics[] = [];

      switch (item) {
        case 'A-Z':
          sortedList = [...comicList].sort((a, b) =>
            a.titulo.localeCompare(b.titulo),
          );
          break;
        case 'Z-A':
          sortedList = [...comicList].sort((a, b) =>
            b.titulo.localeCompare(a.titulo),
          );
          break;
        // case 'Mais recentes':
        //   sortedList = [...novelList].sort(
        //     (a, b) =>
        //       new Date(b.dataLancamento).getTime() -
        //       new Date(a.dataLancamento).getTime(),
        //   );
        //   break;
        // case 'Mais antigos':
        //   sortedList = [...novelList].sort(
        //     (a, b) =>
        //       new Date(a.dataLancamento).getTime() -
        //       new Date(b.dataLancamento).getTime(),
        //   );
        //   break;
        // case 'Lançamento':
        //   sortedList = [...novelList].sort(
        //     (a, b) =>
        //       new Date(b.dataLancamento).getTime() -
        //       new Date(a.dataLancamento).getTime(),
        //   );
        //   break;
        default:
          // volta para o original
          sortedList = projectsResponse?.data || [];
      }

      setComicList(sortedList);
    };

    return (
      <DropdownContainer
        value={orderBy}
        label={orderBy || 'Organizar por'}
        className="w-full sm:w-[180px]"
        onClear={() => {
          orderByToken('Organizar por');
        }}
      >
        {ORDER_BY.map((item, index) => (
          <DropdownOption
            key={index}
            label={item}
            onClick={() => orderByToken(item)}
            value={item}
            selected={item === orderBy}
          />
        ))}
      </DropdownContainer>
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <Title title="Comics da Tsun" />
      <SearchTable
        value={search}
        onChange={handleChange}
        fullWidth
        placeholder="Buscar por título ou título alternativo"
      />
      <div className="flex flex-row items-center justify-start gap-4">
        <FilterByStatus />
        <FilterByGenres />
        <OrganizeBy />
      </div>
      <AsyncSection isLoading={isLoading} className="mt-8">
        {!comicList ? (
          <NoContent msg="Desculpe, em breve teremos conteúdos" />
        ) : (
          comicList?.map((item) => (
            <Cover
              key={item.id}
              src={item.urlCapa}
              title={item.titulo}
              category={item.tipoObra}
              action={'/comics/' + item.slug}
            />
          ))
        )}
      </AsyncSection>
    </div>
  );
}
