'use client';

import { Spinner } from '@phosphor-icons/react/dist/ssr';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { IPrivateComics } from '@/@types/Api';
import { TStatusComic, TStatusNovel } from '@/@types/System';
import { Button } from '@/components/common/button/Button';
import {
  FooterTable,
  HeaderTable,
  SearchTable,
  Table,
  THeadTable,
  TitleColTable,
} from '@/components/common/table';
import { TdDefault } from '@/components/common/table/TdDefault';
import { useToaster } from '@/contexts/ToasterContext';
import { Debounce } from '@/helpers/Debounce';
import { MapStatusToColor } from '@/helpers/MapStatusToColor';
import { cn } from '@/helpers/twUtils';
import { usePrivateComics } from '@/hooks/usePrivateApi';
import { getWorksBySearch } from '@/services/ProjectService';
import { api } from '@/services/api';

interface LineTableProps {
  title: string;
  creator: string;
  status: TStatusNovel | TStatusComic;
  type: string;
  privacy: string;
  date: string;
  url: string;
}

interface ITableComic {
  openModal: () => void;
}

export const TableComic = ({ openModal }: ITableComic) => {
  const { data: comicsResponse, isLoading } = usePrivateComics();
  const queryClient = useQueryClient();

  // TODO: Mover a lógica de calculo de paginação para dentro do footer
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [loadingNewPage, setLoadingNewPage] = useState(false);
  const [comics, setComics] = useState<IPrivateComics[]>();
  const [pagination, setPagination] = useState({
    nextPage: '',
    prevPage: '',
    total: 0,
    currentPage: 1,
    itemsVisible: 0,
  });
  const columns = ['Nome', 'Criador', 'Status', 'Visibilidade', 'Data Entrada'];
  const SKIP_DEFAULT = 12;

  useEffect(() => {
    if (comicsResponse?.data) {
      setComics(comicsResponse?.data);
      setPagination({
        nextPage: comicsResponse.proxima,
        prevPage: comicsResponse.anterior,
        total: comicsResponse.total,
        itemsVisible: comicsResponse.data.length,
        currentPage: getCurrentPagePagination(
          comicsResponse?.proxima,
          comicsResponse?.anterior,
        ),
      });
    }
  }, [comicsResponse]); // eslint-disable-line

  const { toaster } = useToaster();

  const getCurrentPagePagination = (nextUrl: string, prevUrl: string) => {
    const SKIP_DEFAULT = 12;
    const total = pagination.total;

    const extractSkip = (url: string | null) => {
      if (!url) return null;
      const match = url.match(/[?&]Skip=(\d+)/);
      return match ? parseInt(match[1], 10) : null;
    };

    const prevSkip = extractSkip(prevUrl);

    if (prevUrl === null) {
      // Estamos na primeira página
      return 1;
    }

    if (nextUrl === null) {
      // Estamos na última página
      const lastPage = Math.ceil(total / SKIP_DEFAULT);
      return lastPage;
    }

    // Calcula a página atual, back é based 0 e front é based 1
    const currentPage = prevSkip !== null ? prevSkip / SKIP_DEFAULT + 1 + 1 : 1;

    return currentPage;
  };

  const debouncedHandleChange = Debounce(async (value: string) => {
    if (value === '') {
      setComics(comicsResponse?.data);
      return;
    }

    setLoadingNewPage(true);
    try {
      const data = await queryClient.fetchQuery({
        queryKey: ['public-search-works', search],
        queryFn: () => getWorksBySearch(search),
      });

      if (!data || !data.data) {
        toaster({
          type: 'error',
          msg: 'Nenhum resultado encontrado.',
        });
        setComics([]);
        return;
      }
    } finally {
      setLoadingNewPage(false);
    }

    const filtered = comicsResponse?.data.filter((novel) =>
      novel.titulo.toLowerCase().includes(value.toLowerCase()),
    );

    setComics(filtered);
  }, 1000);

  const handleChange = (value: string) => {
    setSearch(value);
    debouncedHandleChange(value);
  };

  const goToUrl = async (url: string) => {
    if (isLoading) return;

    setLoadingNewPage(true);

    if (typeof url === 'string' && url !== '') {
      const { data } = await api.get(url);
      setComics(data?.data);
      setPagination({
        nextPage: data?.proxima || '',
        prevPage: data?.anterior || '',
        total: data?.total,
        itemsVisible: data.data.length,
        currentPage: getCurrentPagePagination(data?.proxima, data?.anterior),
      });
      setLoadingNewPage(false);
      return;
    }

    setLoadingNewPage(false);

    toaster({
      type: 'error',
      msg: 'Não existem mais páginas.',
    });
  };

  const LineTable = ({
    title,
    creator,
    status,
    privacy,
    date,
    type,
    url,
  }: LineTableProps) => {
    const formatedDate = date.replace(/\s\d{2}:\d{2}:\d{2}$/, '');
    const urlNext = `/project/${url}`;
    return (
      <tr
        onClick={() => router.push(urlNext)}
        className="cursor-pointer border-b bg-appBackground transition-all hover:bg-appMenuHover"
      >
        <th
          scope="row"
          className="group flex items-center whitespace-nowrap py-4 pl-3 text-appText"
        >
          <div className="ps-3">
            <div className="text-base font-semibold">{title}</div>
            <div className="font-normal text-appSubtitle group-hover:text-appText">
              {type}
            </div>
          </div>
        </th>

        <TdDefault>{creator}</TdDefault>

        <TdDefault>
          <div className="relative flex items-center justify-center gap-x-1">
            <div
              className={cn(
                'right-2 top-2 h-2 w-2 rounded bg-appMenuBackground',
                MapStatusToColor(status),
              )}
            />
            {status}
          </div>
        </TdDefault>

        <TdDefault hiddenCell="md">{privacy}</TdDefault>
        <TdDefault hiddenCell="md">{formatedDate}</TdDefault>
      </tr>
    );
  };

  const LoadingMoreContent = () => {
    return (
      <tr>
        <td colSpan={columns.length} className="py-4 text-center">
          <div className="flex items-center justify-center gap-4">
            <span>Carregando obras...</span>
            <Spinner size={24} className="animate-spin" />
          </div>
        </td>
      </tr>
    );
  };

  const RenderDataTable = () => {
    return (
      <>
        {!isLoading && (!comics || comics?.length === 0) ? (
          <tr>
            <td colSpan={columns.length} className="py-4 text-center">
              Nenhum resultado encontrado.
            </td>
          </tr>
        ) : (
          <>
            {loadingNewPage ? (
              <LoadingMoreContent />
            ) : (
              comics?.map((comic) => (
                <LineTable
                  key={comic.id}
                  title={comic.titulo}
                  creator={comic.usuarioInclusao}
                  status={comic.statusObra}
                  privacy={'Público'}
                  type={comic.tipoObra}
                  date={comic.dataInclusao}
                  url={comic.slug}
                />
              ))
            )}
          </>
        )}
      </>
    );
  };

  return (
    <div className="relative w-full overflow-x-auto transition-all sm:rounded-lg">
      <HeaderTable
        title="Comics"
        description="Inclui comics pausadas e canceladas."
      >
        <SearchTable value={search} onChange={handleChange} disabled />
        <Button onClick={() => openModal()}>Adicionar</Button>
      </HeaderTable>

      <Table>
        <THeadTable>
          <tr>
            {columns.map((item, index) => (
              <TitleColTable
                key={index}
                title={item}
                position={item === 'Nome' ? 'left' : 'center'}
                hiddenCell={
                  item === 'Data Entrada' || item === 'Visibilidade'
                    ? 'md'
                    : undefined
                }
              />
            ))}
          </tr>
        </THeadTable>
        <tbody>
          {isLoading && (
            <tr>
              <td colSpan={columns.length} className="py-4 text-center">
                <div className="flex items-center justify-center gap-4">
                  <span>Carregando...</span>
                  <Spinner size={24} className="animate-spin" />
                </div>
              </td>
            </tr>
          )}
          <RenderDataTable />
        </tbody>
      </Table>
      <FooterTable
        onGoToPage={(skip) =>
          goToUrl(`/admin/obra/novels?Skip=${skip}&Take=${SKIP_DEFAULT}`)
        }
        currentPage={pagination.currentPage}
        totalItems={pagination.total || 0}
        itemsPerPage={SKIP_DEFAULT}
        itemsVisible={pagination.itemsVisible}
        onPrevPage={() => goToUrl(pagination.prevPage)}
        onNextPage={() => goToUrl(pagination.nextPage)}
      />
    </div>
  );
};
