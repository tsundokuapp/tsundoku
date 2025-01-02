'use client';

import Image from 'next/image';
import { useState } from 'react';

import { BadgeRole } from '@/components/admin/badge/BadgeRole';
import {
  FooterTable,
  HeaderTable,
  SearchTable,
  Table,
  THeadTable,
  TitleColTable,
} from '@/components/common/table';
import { TdDefault } from '@/components/common/table/TdDefault';
import { colorByRole, StaffMembers } from '@/helpers/Util';

interface TableStaffProps {
  withModal: () => void;
}

interface LineTableProps {
  name: string;
  inHouse: string;
  position: string;
  date: string;
  imageAvatar: string;
}

const columns = ['Nome', 'Cargo', 'Permissões', 'Pontos', 'Data Entrada'];

export const TableStaff = ({ withModal }: TableStaffProps) => {
  const [search, setSearch] = useState('');

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
        onClick={() => withModal()}
        className="cursor-pointer border-b bg-white transition-all hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
      >
        <th
          scope="row"
          className="ml-4 flex items-center whitespace-nowrap py-4 pl-3 text-gray-900 dark:text-white"
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
        </th>
        <TdDefault>
          <BadgeRole color={color} role={position} />
        </TdDefault>

        <td className="px-auto py-4">
          <div className="flex items-center justify-center gap-x-1">
            <BadgeRole color={color} role={position} />
            <BadgeRole color={color} role={position} />
            <BadgeRole color={color} role={position} />
          </div>
        </td>

        <TdDefault>120</TdDefault>
        <TdDefault>{date}</TdDefault>
      </tr>
    );
  };

  const reorderList = () => {
    alert(`Reorder by: `);
  };

  const handleChange = (value: string) => {
    setSearch(value);
  };

  return (
    <div className="relative w-full overflow-x-auto transition-all sm:rounded-lg">
      <HeaderTable title="Staff" description="Membros e parceiros.">
        <SearchTable value={search} onChange={handleChange} />
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
      </Table>
      <FooterTable />
    </div>
  );
};
