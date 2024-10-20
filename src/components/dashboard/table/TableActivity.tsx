import { DownloadSimple, UploadSimple } from '@phosphor-icons/react/dist/ssr';
import Image from 'next/image';

import { BadgePosition } from './BadgePosition';

interface LineTableProps {
  name: string;
  inHouse: string;
  position: string;
  activity: string;
  typeActivity: 'up' | 'down';
  date: string;
}

export const TableActivityStaff = () => {
  const LineTable = ({
    name,
    inHouse,
    position,
    activity,
    typeActivity,
    date,
  }: LineTableProps) => {
    return (
      <tr className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600">
        <th
          scope="row"
          className="flex items-center whitespace-nowrap px-6 py-4 text-gray-900 dark:text-white"
        >
          <Image
            width={10}
            height={10}
            className="h-10 w-10 rounded-full"
            src="https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?q=80&w=2866&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Avatar"
          />
          <div className="ps-3">
            <div className="text-base font-semibold">{name}</div>
            <div className="font-normal text-gray-500">{inHouse}</div>
          </div>
        </th>
        <td className="px-6 py-4">
          <BadgePosition position={position} />
        </td>
        <td className="px-6 py-4">
          <div className="flex items-center">
            {typeActivity === 'down' ? (
              <DownloadSimple className="me-2 h-5 w-5 text-green-500" />
            ) : (
              <UploadSimple className="me-2 h-5 w-5 text-blue-500" />
            )}
            {activity}
          </div>
        </td>
        <td className="px-6 py-4">
          <span className="font-medium text-black dark:text-gray-400">
            {date}
          </span>
        </td>
      </tr>
    );
  };

  return (
    <div className="relative overflow-x-auto sm:rounded-lg">
      {/* Header */}
      <div className="flex-column flex flex-wrap items-center justify-start space-x-4 space-y-4 bg-white p-4 pb-4 dark:bg-gray-900 md:flex-row md:space-y-0">
        <h5 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
          Staffs
        </h5>
        <p className="text-sm text-gray-400 dark:text-gray-400">
          Atividades recentes feitas por cada Staff
        </p>
      </div>
      {/* Table */}
      <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
        <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Nome
            </th>
            <th scope="col" className="px-6 py-3">
              Cargo
            </th>
            <th scope="col" className="px-6 py-3">
              Atividade
            </th>
            <th scope="col" className="px-6 py-3">
              Data
            </th>
          </tr>
        </thead>
        <tbody>
          <LineTable
            name="Axios"
            inHouse="Tsundoku"
            position="Admin"
            activity="Download: Raw Chihara 51"
            typeActivity="down"
            date="21/10/2024"
          />

          <LineTable
            name="Axios"
            inHouse="Tsundoku - Aprendiz"
            position="Admin"
            activity="Download: Raw Chihara 51"
            typeActivity="down"
            date="21/10/2024"
          />

          <LineTable
            name="Axios"
            inHouse="Tsundoku"
            position="Admin"
            activity="Download: Raw Chihara 51"
            typeActivity="up"
            date="21/10/2024"
          />

          <LineTable
            name="Axios"
            inHouse="Tsundoku"
            position="Admin"
            activity="Download: Raw Chihara 51"
            typeActivity="up"
            date="21/10/2024"
          />

          <LineTable
            name="Axios"
            inHouse="Parceiro - Scan Name"
            position="Admin"
            activity="Download: Raw Chihara 51"
            typeActivity="down"
            date="21/10/2024"
          />
        </tbody>
      </table>
    </div>
  );
};
