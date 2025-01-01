'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { TsunButton } from '@/components/common/button/TsunButton';
import {
  FooterTable,
  HeaderTable,
  SearchTable,
  Table,
  THeadTable,
  TitleColTable,
} from '@/components/common/table';
import { TdDefault } from '@/components/common/table/TdDefault';
import { Debounce } from '@/helpers/Debounce';
import { NovelsList } from '@/helpers/Util';
import { cn } from '@/helpers/twUtils';

interface LineTableProps {
  title: string;
  creator: string;
  status: string;
  type: string;
  privacy: string;
  date: string;
  url: string;
}

export const TableNovel = () => {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [items, setItems] = useState(NovelsList);
  const columns = ['Nome', 'Criador', 'Status', 'Privacidade', 'Data Entrada'];

  const LineTable = ({
    title,
    creator,
    status,
    privacy,
    date,
    type,
    url,
  }: LineTableProps) => {
    return (
      <tr
        onClick={() => router.push(url)}
        className="cursor-pointer border-b bg-white transition-all hover:bg-slate-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
      >
        <th
          scope="row"
          className="flex items-center whitespace-nowrap py-4 pl-3 text-gray-900 dark:text-white"
        >
          <div className="ps-3">
            <div className="text-base font-semibold">{title}</div>
            <div className="font-normal text-gray-500">{type}</div>
          </div>
        </th>

        <TdDefault>{creator}</TdDefault>

        <td className="px-auto py-4">
          <div className="relative flex items-center gap-x-1">
            <div
              className={cn('right-2 top-2 h-2 w-2 rounded bg-primary', {
                'bg-primary': status === 'Concluído',
                'bg-success': status === 'Em andamento',
                'bg-yellow-400': status === 'Hiato',
                'bg-error': status === 'Cancelado',
              })}
            />
            {status}
          </div>
        </td>

        <TdDefault>{privacy}</TdDefault>
        <TdDefault>{date}</TdDefault>
      </tr>
    );
  };

  const reorderList = () => {
    alert(`Reorder by:`);
  };

  const debouncedHandleChange = Debounce((value: string) => {
    if (value === '') {
      setItems(NovelsList);
      return;
    }

    const filtered = NovelsList.filter((item) =>
      item.title.toLowerCase().includes(value.toLowerCase()),
    );

    setItems(filtered);
  }, 1000);

  const handleChange = (value: string) => {
    setSearch(value);
    debouncedHandleChange(value);
  };

  return (
    <div className="relative w-full overflow-x-auto transition-all sm:rounded-lg">
      <HeaderTable
        title="Novels"
        description="Inclui novels pausadas e canceladas."
      >
        <SearchTable value={search} onChange={handleChange} />
        <TsunButton onClick={() => alert('Create Novel')}>Adicionar</TsunButton>
      </HeaderTable>

      <Table>
        <THeadTable>
          <tr>
            {columns.map((item, index) => (
              <TitleColTable
                key={index}
                title={item}
                position={item === 'Nome' ? 'left' : 'center'}
                reorder
                onClick={() => reorderList()}
              />
            ))}
          </tr>
        </THeadTable>
        <tbody>
          {items.map((novel) => (
            <LineTable
              key={novel.id}
              title={novel.title}
              creator={novel.creator}
              status={novel.status}
              privacy={novel.privacy}
              type={novel.type}
              date={novel.date}
              url={novel.url}
            />
          ))}
        </tbody>
      </Table>
      <FooterTable />
    </div>
  );
};
