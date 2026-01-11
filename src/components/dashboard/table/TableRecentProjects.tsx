'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/shadcn/table';

interface Item {
  id: string;
  titleProject: string;
  typeProject: string;
  name: string;
}

const data: Item[] = [
  {
    id: '1',
    titleProject: 'Bruxa Errante',
    typeProject: 'Novel',
    name: 'C.15 - V.01',
  },
  {
    id: '2',
    titleProject: 'Eminence in Shadow',
    typeProject: 'Comic',
    name: 'C.20 - V.01',
  },
  {
    id: '3',
    titleProject: 'Mushoku Tensei',
    typeProject: 'Novel',
    name: 'C.03 - V.02',
  },
  {
    id: '4',
    titleProject: 'Tearmoon Empire',
    typeProject: 'Novel',
    name: 'C.05 - V.03',
  },
  {
    id: '5',
    titleProject: 'Matador de Goblins',
    typeProject: 'Comic',
    name: 'C.07 - V.01',
  },
  {
    id: '6',
    titleProject: 'Marcha Mortal',
    typeProject: 'Novel',
    name: 'C.12 - V.05',
  },
  {
    id: '7',
    titleProject: 'Bruxa Errante',
    typeProject: 'Novel',
    name: 'C.13 - V.02',
  },
];


export default function TableRecentProjects() {
  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-48 font-medium">Nome</TableHead>
            <TableHead className="font-medium">Tipo</TableHead>
            <TableHead className="font-medium">Capítulo</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.titleProject}</TableCell>
              <TableCell>{item.typeProject}</TableCell>
              <TableCell>{item.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}