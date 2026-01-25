'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/ui/table';

interface Item {
  id: string;
  titleProject: string;
  typeProject: string;
  name: string;
  notes: string;
}

const data: Item[] = [
  {
    id: '1',
    titleProject: 'Bruxa Errante',
    typeProject: 'Novel',
    name: 'C.15 - V.01',
    notes: '3 comentários pendentes',
  },
  {
    id: '2',
    titleProject: 'Eminence in Shadow',
    typeProject: 'Comic',
    name: 'C.20 - V.01',
    notes: 'Aguardando aprovação',
  },
  {
    id: '3',
    titleProject: 'Mushoku Tensei',
    typeProject: 'Novel',
    name: 'C.03 - V.02',
    notes: '2 comentários pendentes',
  },
  {
    id: '4',
    titleProject: 'Tearmoon Empire',
    typeProject: 'Novel',
    name: 'C.05 - V.03',
    notes: 'Aguardando aprovação',
  },
  {
    id: '5',
    titleProject: 'Matador de Goblins',
    typeProject: 'Comic',
    name: 'C.07 - V.01',
    notes: '4 comentários pendentes',
  },
];

export default function TablePendingProjects() {
  return (
    <div className="w-full rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-48 font-medium text-appText">
              Nome
            </TableHead>
            <TableHead className="font-medium text-appText">Tipo</TableHead>
            <TableHead className="font-medium text-appText">Capítulo</TableHead>
            <TableHead className="font-medium text-appText">Notas</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.titleProject}</TableCell>
              <TableCell>{item.typeProject}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.notes}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
