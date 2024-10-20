import { DownloadSimple } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";

interface LineTableProps {
  name: string,
  inHouse: string,
  position: string,
  activity: string,
  date: string
}

export const TableActivityStaff = () => {

  const LineTable = ({ name, inHouse, position, activity, date }: LineTableProps) => {
    return (
      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
          <Image width={10} height={10} className="w-10 h-10 rounded-full" src="https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?q=80&w=2866&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Avatar" />
          <div className="ps-3">
            <div className="text-base font-semibold">{name}</div>
            <div className="font-normal text-gray-500">{inHouse}</div>
          </div>
        </th>
        <td className="px-6 py-4">
          {position}
        </td>
        <td className="px-6 py-4">
          <div className="flex items-center">
            <DownloadSimple className="w-5 h-5 me-2 text-green-500" />
            {activity}
          </div>
        </td>
        <td className="px-6 py-4">
          <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">{date}</a>
        </td>
      </tr>
    )
  }

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      {/* Header */}
      <div className="flex items-center justify-start flex-column flex-wrap md:flex-row p-4 space-y-4 space-x-4 md:space-y-0 pb-4 bg-white dark:bg-gray-900">
        <h5 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Staffs</h5>
        <p className="text-sm text-gray-400 dark:text-gray-400">Atividades recentes feitas por cada Staff</p>
      </div>
      {/* Table */}
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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

          <LineTable name="Axios" inHouse="Tsundoku" position="Admin" activity="Download: Raw Chihara 51" date="21/10/2024" />

          <LineTable name="Axios" inHouse="Tsundoku" position="Admin" activity="Download: Raw Chihara 51" date="21/10/2024" />

          <LineTable name="Axios" inHouse="Tsundoku" position="Admin" activity="Download: Raw Chihara 51" date="21/10/2024" />

          <LineTable name="Axios" inHouse="Tsundoku" position="Admin" activity="Download: Raw Chihara 51" date="21/10/2024" />

          <LineTable name="Axios" inHouse="Tsundoku" position="Admin" activity="Download: Raw Chihara 51" date="21/10/2024" />

        </tbody>
      </table>
    </div>
  )
};