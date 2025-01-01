'use client';

// import { useRouter } from 'next/navigation';
import { useState } from 'react';

import {
  FooterTable,
  HeaderTable,
  SearchTable,
  Table,
  THeadTable,
  TitleColTable,
} from '@/components/common/table';
import { Debounce } from '@/helpers/Debounce';
import { ChaptersList } from '@/helpers/Util';
import { cn } from '@/helpers/twUtils';

interface LineTableProps {
  name: string;
  author: string;
  privacy: string;
  date: string;
  url: string;
}

interface TdDefaultProps {
  children: React.ReactNode;
  main?: boolean;
}

// TODO: Usar essa tabela como base

export const TableChapterAdmin = () => {
  // const router = useRouter();
  const [search, setSearch] = useState('');
  const [items, setItems] = useState(ChaptersList);
  const columns = ['Nome', 'Autor', 'Privacidade', 'Data Entrada'];

  const reorderList = () => {
    alert(`Reorder by: `);
  };

  const goToChapter = (url: string) => {
    alert(`Go to chapter with id: ${url}`);
    // router.push(`/admin/chapter/${url}`);
  };

  const debouncedHandleChange = Debounce((value: string) => {
    if (value === '') {
      setItems(ChaptersList);
      return;
    }

    const filtered = ChaptersList.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase()),
    );

    setItems(filtered);
  }, 1000);

  const handleChange = (value: string) => {
    setSearch(value);
    debouncedHandleChange(value);
  };

  const TdDefault = ({ children, main }: TdDefaultProps) => {
    return (
      <td className="px-auto hidden py-4 text-center lg:table-cell">
        <span
          className={cn('font-medium text-black dark:text-gray-400', {
            'font-semibold text-gray-900 dark:text-white': main,
          })}
        >
          {children}
        </span>
      </td>
    );
  };

  const LineTable = ({ name, author, privacy, date, url }: LineTableProps) => {
    return (
      <tr
        onClick={() => goToChapter(url)}
        className="cursor-pointer border-b bg-white transition-all hover:bg-slate-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
      >
        <TdDefault main>{name}</TdDefault>
        <TdDefault>{author}</TdDefault>
        <TdDefault>{privacy}</TdDefault>
        <TdDefault>{date}</TdDefault>
      </tr>
    );
  };

  return (
    <div className="relative w-full overflow-x-auto transition-all sm:rounded-lg">
      <HeaderTable title="Capítulos">
        <SearchTable value={search} onChange={handleChange} />
      </HeaderTable>
      <Table>
        <THeadTable>
          <tr>
            {columns.map((item, index) => (
              <TitleColTable
                key={index}
                title={item}
                reorder
                onClick={() => reorderList()}
              />
            ))}
          </tr>
        </THeadTable>
        <tbody>
          {items.map((item) => (
            <LineTable
              key={item.id}
              name={item.name}
              author={item.author}
              privacy={item.privacy}
              date={item.date}
              url={item.url}
            />
          ))}
        </tbody>
      </Table>
      <FooterTable />
    </div>
  );
};
