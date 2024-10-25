import { Chapter, type ChapterProps } from './Chapter';
import { Accordion } from '../common/Accordion';

export interface VolumeProps {
  number: string;
  chapters: ChapterProps[];
}

export function Volume({ number, chapters }: VolumeProps) {
  return (
    <Accordion title={`Volume ${number}`}>
      <div className="grid grid-cols-1">
        {chapters.map((chapter, index) => (
          <Chapter
            key={index}
            number={chapter.number}
            date={chapter.date}
            variant={chapter.variant}
            className="rounded-lg"
          />
        ))}
      </div>
    </Accordion>
  );
}
