'use client';
// Color Checked
// Components Checked
import { useState } from 'react';

import { Title } from '@/components/common/Title';
import { DropdownContainer } from '@/components/common/dropdown/DropdownContainer';
import { DropdownOption } from '@/components/common/dropdown/DropdownOption';
import { AsyncSection } from '@/components/common/section/AsyncSection';
import { SearchTable } from '@/components/common/table';
import { Cover } from '@/components/project/Cover';
import { Debounce } from '@/helpers/Debounce';
import { STATUS_MANGA, GENRES_MANGA } from '@/helpers/systemValues';

export default function Comics() {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('Filtrar por Status');
  const [genres, setGenres] = useState('Filtrar por Gênero');

  const debouncedHandleChange = Debounce((value: string) => {
    // if (value === '' && projectsResponse?.data) {
    //   setNovelList(projectsResponse?.data);
    //   return;
    // }
    // const filtered = projectsResponse?.data.filter((item) =>
    //   item.titulo.toLowerCase().includes(value.toLowerCase()),
    // );
    // setNovelList(filtered);
  }, 1000);

  const handleChange = (value: string) => {
    setSearch(value);
    debouncedHandleChange(value);
  };

  const findByStatus = (status: string) => {
    setStatus(status);
    // Todo: descomentar quando a API estiver pronta

    // if (projectsResponse?.data) {
    //   const filtered = projectsResponse?.data.filter(
    //     (item) => item.statusObra === status,
    //   );

    //   setNovelList(filtered);
    // }

    // setSearch('');
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
        {STATUS_MANGA.map((item, index) => (
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
        {GENRES_MANGA.map((item, index) => (
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
      </div>
      <AsyncSection isLoading={false} className="mt-8">
        <Cover
          src="/cover-alya.webp"
          title="Alya às Vezes Esconde seus Sentimentos em Russo"
          category="Novel"
          text="Cap. 1"
        />
        <Cover
          src="/cover-shadow.webp"
          title="Kage no Jitsuryokusha ni Naritakute"
          category="Mangá"
          action="comics/kage-no-jitsuryokusha-ni-naritakute"
        />
        <Cover
          src="/cover-seven.webp"
          title="Kage no Jitsuryokusha ni Naritakute! Master of Garden ~Shichikage Retsuden~"
          category="Mangá"
        />
        <Cover
          src="/cover-alya.webp"
          title="Alya às Vezes Esconde seus Sentimentos em Russo"
          category="Novel"
        />
        <Cover
          src="/cover-shadow.webp"
          title="Kage no Jitsuryokusha ni Naritakute"
          category="Mangá"
        />
        <Cover
          src="/cover-seven.webp"
          title="Kage no Jitsuryokusha ni Naritakute! Master of Garden ~Shichikage Retsuden~"
          category="Mangá"
        />
        <Cover
          src="/cover-alya.webp"
          title="Alya às Vezes Esconde seus Sentimentos em Russo"
          category="Novel"
        />
        <Cover
          src="/cover-shadow.webp"
          title="Kage no Jitsuryokusha ni Naritakute"
          category="Mangá"
        />
        <Cover
          src="/cover-seven.webp"
          title="Kage no Jitsuryokusha ni Naritakute! Master of Garden ~Shichikage Retsuden~"
          category="Mangá"
        />
      </AsyncSection>
    </div>
  );
}
