import { DownloadSimple, UploadSimple } from '@phosphor-icons/react/dist/ssr';
import Image from 'next/image';

import { BadgeRole } from '@/components/admin/badge/BadgeRole';
import {
  HeaderTable,
  Table,
  THeadTable,
  TitleColTable,
} from '@/components/common/table';
import { TdDefault } from '@/components/common/table/TdDefault';
import { colorByRole, StaffMembers } from '@/helpers/Util';

interface LineTableProps {
  name: string;
  inHouse: string;
  position: string;
  activity: string;
  typeActivity: 'up' | 'down';
  date: string;
  imageAvatar: string;
}

export const TableActivityStaff = () => {
  const columns = ['Nome', 'Cargo', 'Atividade', 'Data'];

  const LineTable = ({
    name,
    inHouse,
    position,
    activity,
    typeActivity,
    date,
    imageAvatar,
  }: LineTableProps) => {
    const color = colorByRole(position);
    return (
      <tr className="hover:bg-hoverBgLight dark:hover:bg-hoverBgDark border-b bg-bgLight dark:border-gray-700 dark:bg-bgDark">
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
        </th>
        <TdDefault>
          <BadgeRole color={color} role={position} />
        </TdDefault>

        <td className="px-auto py-4">
          <div className="flex items-center justify-center">
            {typeActivity === 'down' ? (
              <DownloadSimple className="me-2 h-5 w-5 text-green-500" />
            ) : (
              <UploadSimple className="me-2 h-5 w-5 text-blue-500" />
            )}
            {activity}
          </div>
        </td>

        <TdDefault>{date}</TdDefault>
      </tr>
    );
  };

  return (
    <div className="relative w-full overflow-x-auto sm:rounded-lg">
      <HeaderTable title="Staff" description="Últimas atividades realizadas." />
      <Table>
        <THeadTable>
          <tr>
            {columns.map((item, index) => (
              <TitleColTable
                key={index}
                title={item}
                position={item === 'Nome' ? 'left' : 'center'}
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
              activity={staff.activity}
              typeActivity={staff.typeActivity as 'up' | 'down'}
              date={staff.date}
              imageAvatar={staff.avatar}
            />
          ))}
        </tbody>
      </Table>
    </div>
  );
};
