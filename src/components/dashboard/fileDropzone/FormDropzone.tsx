import { useState } from 'react';

import { Label } from '@/components/shadcn/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/shadcn/select';

interface chapterList {
  id: string;
  titleChapter: string;
}

interface Item {
  id: string;
  titleProject: string;
  typeProject: string;
  chapters: chapterList[];
}

const data: Item[] = [
  {
    id: '1',
    titleProject: 'Bruxa Errante',
    typeProject: 'Novel',
    chapters: [
      { id: '1', titleChapter: 'C.07 - V.01' },
      { id: '2', titleChapter: 'C.01 - V.01' },
      { id: '3', titleChapter: 'C.02 - V.01' },
      { id: '4', titleChapter: 'C.03 - V.01' },
      { id: '5', titleChapter: 'C.04 - V.01' },
      { id: '6', titleChapter: 'C.05 - V.01' },
      { id: '7', titleChapter: 'C.06 - V.01' },
    ],
  },
  {
    id: '2',
    titleProject: 'Eminence in Shadow',
    typeProject: 'Comic',
    chapters: [
      { id: '1', titleChapter: 'C.07 - V.01' },
      { id: '2', titleChapter: 'C.08 - V.01' },
    ],
  },
  {
    id: '3',
    titleProject: 'Mushoku Tensei',
    typeProject: 'Novel',
    chapters: [
      { id: '1', titleChapter: 'C.15 - V.01' },
      { id: '2', titleChapter: 'C.20 - V.01' },
    ],
  },
  {
    id: '4',
    titleProject: 'Tearmoon Empire',
    typeProject: 'Novel',
    chapters: [
      { id: '1', titleChapter: 'C.07 - V.01' },
      { id: '2', titleChapter: 'C.08 - V.01' },
    ],
  },
  {
    id: '5',
    titleProject: 'Matador de Goblins',
    typeProject: 'Comic',
    chapters: [
      { id: '1', titleChapter: 'C.07 - V.01' },
      { id: '2', titleChapter: 'C.08 - V.01' },
    ],
  },
];

export function FormDropzone() {
  const [valueProject, setValueProject] = useState('1');

  return (
    <div className="mt-2 flex flex-row gap-4 px-6 pb-4">
      <div className="flex gap-4">
        <div>
          <Label htmlFor="projectName" className="mb-2 text-appText">
            Projeto
          </Label>
          <Select
            defaultValue="1"
            onValueChange={(value) => setValueProject(value)}
          >
            <SelectTrigger id="projectName" className="ps-2">
              <SelectValue placeholder="Selecione o projeto" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {data.map((item) => (
                  <SelectItem key={item.id} value={item.id}>
                    <span className="truncate">{item.titleProject}</span>
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex gap-4">
        <div>
          <Label htmlFor="projectChapter" className="mb-2 text-appText">
            Capítulo
          </Label>
          <Select defaultValue="1">
            <SelectTrigger id="projectChapter" className="ps-2">
              <SelectValue placeholder="Selecione o capítulo" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {valueProject &&
                  data
                    .find((item) => item.id === valueProject)
                    ?.chapters.map((chapter) => (
                      <SelectItem key={chapter.id} value={chapter.id}>
                        <span className="truncate">{chapter.titleChapter}</span>
                      </SelectItem>
                    ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
