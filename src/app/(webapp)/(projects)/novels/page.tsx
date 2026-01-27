'use client';

import { useMemo, useState } from 'react';

import { usePublicNovels } from '@/features/novels/hooks/usePublicNovels';
import { Cover } from '@/features/project/components/Cover';
import { usePublicGenres } from '@/features/project/hooks/useProject';
import { NoContent } from '@/shared/components/feedback/noContent';
import { AsyncSection } from '@/shared/components/layout/section/AsyncSection';
import { DropdownContainer } from '@/shared/components/ui/dropdown/DropdownContainer';
import { DropdownOption } from '@/shared/components/ui/dropdown/DropdownOption';
import { SearchTable } from '@/shared/components/ui/table/index';
import { Title } from '@/shared/components/ui/title/Title';
import { ORDER_BY, STATUS_NOVEL, TOrderBy } from '@/shared/utils/systemValues';

export default function Novels() {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [genre, setGenre] = useState('');
  const [orderBy, setOrderBy] = useState<TOrderBy>('Padrão');

  const { data: novels, isLoading } = usePublicNovels();
  const { data: genres } = usePublicGenres();

  const filteredNovels = useMemo(() => {
    let result = Array.isArray(novels) ? novels : [];

    if (search) {
      const searchLower = search.toLowerCase();
      result = result.filter((novel) =>
        novel.titulo.toLowerCase().includes(searchLower),
      );
    }

    if (status) {
      result = result.filter((novel) => novel.statusObra === status);
    }

    if (genre) {
      result = result.filter((novel) =>
        novel.listaGeneros.some((g) => g === genre),
      );
    }

    switch (orderBy) {
      case 'A-Z':
        result = [...result].sort((a, b) => a.titulo.localeCompare(b.titulo));
        break;
      case 'Z-A':
        result = [...result].sort((a, b) => b.titulo.localeCompare(a.titulo));
        break;
      default:
        break;
    }

    return result;
  }, [novels, search, status, genre, orderBy]);

  const sortedGenres = useMemo(() => {
    if (!genres) return [];
    const genreArray = Array.isArray(genres) ? genres : [];
    return [...genreArray].sort((a, b) =>
      a.descricao.localeCompare(b.descricao),
    );
  }, [genres]);

  return (
    <div className="flex flex-col gap-4">
      <Title title="Novels da Tsun" />

      <SearchTable
        value={search}
        onChange={setSearch}
        fullWidth
        placeholder="Buscar por título ou título alternativo"
      />

      <div className="flex flex-row items-center justify-between gap-4 sm:justify-start">
        {/* Filtro Status */}
        <DropdownContainer
          value={status || 'Status'}
          label="Status"
          className="w-full sm:w-[180px]"
          onClear={() => setStatus('')}
        >
          {STATUS_NOVEL.map((item) => (
            <DropdownOption
              key={item}
              label={item}
              onClick={() => setStatus(item)}
              value={item}
              selected={item === status}
            />
          ))}
        </DropdownContainer>

        {/* Filtro Gênero */}
        <DropdownContainer
          value={genre || 'Gênero'}
          label="Gênero"
          className="w-full sm:w-[190px]"
          onClear={() => setGenre('')}
        >
          {sortedGenres.map((g) => (
            <DropdownOption
              key={g.id}
              label={g.descricao}
              onClick={() => setGenre(g.descricao)}
              value={g.descricao}
              selected={g.descricao === genre}
            />
          ))}
        </DropdownContainer>

        {/* Ordenação */}
        <DropdownContainer
          value={orderBy || 'Ordenar'}
          label="Ordenar"
          className="w-full sm:w-[180px]"
          onClear={() => setOrderBy('Padrão')}
        >
          {ORDER_BY.map((item) => (
            <DropdownOption
              key={item}
              label={item}
              onClick={() => setOrderBy(item)}
              value={item}
              selected={item === orderBy}
            />
          ))}
        </DropdownContainer>
      </div>

      <AsyncSection isLoading={isLoading} className="mt-8">
        {filteredNovels.length === 0 ? (
          <NoContent msg="Desculpe, em breve teremos conteúdos" />
        ) : (
          filteredNovels.map((novel) => (
            <Cover
              key={novel.id}
              src={novel.urlCapa}
              title={novel.titulo}
              category={novel.tipoObra}
              action={`/novels/${novel.slug}`}
            />
          ))
        )}
      </AsyncSection>
    </div>
  );
}
