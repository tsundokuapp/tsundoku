'use client';

import Image from 'next/image';

import { BadgeRole } from '@/components/badge/BadgeRole';
import { colorByRole, StaffMembers } from '@/helpers/Util';
import { cn } from '@/helpers/twUtils';

interface LineTableProps {
  name: string;
  inHouse: string;
  position: string;
  date: string;
  imageAvatar: string;
}

interface TitleColProps {
  title: string;
  reorder: boolean;
}

interface CelNavegationProps {
  text: string;
  lastChildren?: boolean;
  firstChildren?: boolean;
  active?: boolean;
}

export const TableStaff = () => {
  const LineTable = ({
    name,
    inHouse,
    position,
    date,
    imageAvatar,
  }: LineTableProps) => {
    const color = colorByRole(position);
    return (
      <tr
        onClick={() => alert(name)}
        className="cursor-pointer border-b bg-white transition-all hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
      >
        <th
          scope="row"
          className="flex items-center whitespace-nowrap py-4 pl-3 text-gray-900 dark:text-white"
        >
          <Image
            width={10}
            height={10}
            className="h-10 w-10 rounded-full"
            src={imageAvatar}
            alt="Avatar"
          />
          <div className="ps-3">
            <div className="text-base font-semibold">{name}</div>
            <div className="font-normal text-gray-500">{inHouse}</div>
          </div>
          <div className="ml-4 flex font-light md:hidden">
            <BadgeRole color={color} role={position} />
          </div>
        </th>
        <td className="px-auto hidden py-4 md:table-cell">
          <BadgeRole color={color} role={position} />
        </td>
        <td className="px-auto py-4">
          <div className="flex items-center gap-x-1">
            <BadgeRole color={color} role={position} />
            <BadgeRole color={color} role={position} />
            <BadgeRole color={color} role={position} />
          </div>
        </td>
        <td className="px-auto hidden py-4 md:table-cell">
          <span className="font-medium text-black dark:text-gray-400">120</span>
        </td>
        <td className="px-auto hidden py-4 lg:table-cell">
          <span className="font-medium text-black dark:text-gray-400">
            {date}
          </span>
        </td>
      </tr>
    );
  };

  const TitleCol = ({ title, reorder }: TitleColProps) => {
    return (
      <th scope="col" className="py-3 pl-3">
        <div className="flex items-center">
          {title}
          {reorder && (
            <span
              className="cursor-pointer"
              tabIndex={0}
              onClick={() => reorderList(title)}
            >
              <svg
                className="ms-1.5 h-3 w-3"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
              </svg>
            </span>
          )}
        </div>
      </th>
    );
  };

  const CelNavegation = ({
    text,
    lastChildren,
    firstChildren,
    active,
  }: CelNavegationProps) => {
    return (
      <li
        className={cn(
          'ms-0 flex h-8 cursor-pointer items-center justify-center border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white',
          {
            'rounded-s-lg': firstChildren,
            'rounded-e-lg': lastChildren,
            'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-white':
              active,
          },
        )}
      >
        {text}
      </li>
    );
  };

  const FooterTable = () => {
    return (
      <nav
        className="flex-column flex flex-wrap items-center justify-between pt-4 dark:bg-gray-900 md:flex-row"
        aria-label="Table navigation"
      >
        <span className="mb-4 block w-full text-sm font-normal text-gray-500 dark:text-gray-400 md:mb-0 md:inline md:w-auto">
          Mostrando{' '}
          <span className="font-semibold text-gray-900 dark:text-white">
            1-10
          </span>{' '}
          de{' '}
          <span className="font-semibold text-gray-900 dark:text-white">
            100
          </span>
        </span>
        <ul className="inline-flex h-8 -space-x-px text-sm">
          <CelNavegation text="Anterior" firstChildren />
          <CelNavegation text="1" />
          <CelNavegation text="2" />
          <CelNavegation text="3" active />
          <CelNavegation text="4" />
          <CelNavegation text="5" />
          <CelNavegation text="Próximo" lastChildren />
        </ul>
      </nav>
    );
  };

  const SearchTable = () => {
    return (
      <div className="bg-white dark:bg-gray-900">
        <div className="relative mt-1">
          <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
            <svg
              className="h-4 w-4 text-gray-500 dark:text-gray-400"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="text"
            id="table-search"
            className="block w-80 rounded-lg border border-gray-300 bg-gray-50 py-2 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            placeholder="Buscar por nome..."
          />
        </div>
      </div>
    );
  };

  const reorderList = (title: string) => {
    alert(`Reorder by: ${title}`);
  };

  return (
    <div className="relative w-full overflow-x-auto transition-all sm:rounded-lg">
      {/* Header */}
      <div className="flex-column flex flex-wrap items-center justify-between space-x-4 space-y-4 bg-white p-4 pb-4 dark:bg-gray-900 md:flex-row md:space-y-0">
        <div className="flex flex-row items-center gap-4">
          <h5 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
            Staffs
          </h5>
          <p className="text-sm text-gray-400 dark:text-gray-400">
            Listagem de membros, inclui parceiros e moderadores.
          </p>
        </div>

        <SearchTable />
      </div>
      {/* Table */}
      <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
        <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <TitleCol title="Nome" reorder />
            <TitleCol title="Cargo" reorder />
            <TitleCol title="Permissões" reorder />
            <TitleCol title="Pontos" reorder />
            <TitleCol title="Data Entrada" reorder />
          </tr>
        </thead>
        <tbody>
          {StaffMembers.map((staff) => (
            <LineTable
              key={staff.id}
              name={staff.name}
              inHouse={staff.inHouse}
              position={staff.role}
              date={staff.date}
              imageAvatar={staff.avatar}
            />
          ))}
        </tbody>
      </table>
      <FooterTable />
    </div>
  );
};
