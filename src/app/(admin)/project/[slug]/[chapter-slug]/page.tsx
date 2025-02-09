'use client';

import {
  CalendarBlank,
  CheckCircle,
  Target,
} from '@phosphor-icons/react/dist/ssr';
import * as motion from 'motion/react-client';
import { useState } from 'react';

import { Avatar } from '@/components/common/Avatar';
import { Title } from '@/components/common/Title';
import { Button } from '@/components/common/button/Button';
import { FakeCheckbox } from '@/components/common/checkbox';
import { cn } from '@/helpers/twUtils';

interface ICardRoadmap {
  className?: string;
}

interface IItemCardProgress {
  label: string;
  stage: { down: boolean; up: boolean; done: boolean };
}

interface ICardAttachment {
  title: string;
  description?: string;
  create?: boolean;
  handleClickDown: () => void;
  handleClickUp: () => void;
}

export default function ChapterNovelAdmin() {
  const [stageProgress, setStageProgress] = useState({
    translation: {
      down: false,
      up: false,
      done: false,
    },
    review: {
      down: false,
      up: false,
      done: false,
    },
    qc: {
      down: false,
      up: false,
      done: false,
    },
  });

  const allDone =
    stageProgress.translation.done &&
    stageProgress.review.done &&
    stageProgress.qc.done;

  const calcProgress = () => {
    const progress = Object.values(stageProgress).filter(
      (value) => value.done,
    ).length;
    return progress;
  };

  const progressPercentage = Number((calcProgress() / 3) * 100).toFixed(0);

  const CardAttachment = ({
    title,
    description,
    create,
    handleClickDown,
    handleClickUp,
  }: ICardAttachment) => {
    return (
      <div className="flex h-fit min-h-40 w-auto max-w-96 flex-col items-start justify-between gap-4 rounded-lg border border-dashed border-slate-400 p-4">
        <header className="flex w-full flex-col items-start justify-center">
          <p className="text-base font-medium text-white">{title}</p>
          {description && (
            <p className="text-sm font-normal text-gray-400">{description}</p>
          )}
        </header>
        <div className="flex w-full flex-row justify-between gap-4 border-t border-slate-400 pt-2">
          <Button onClick={() => handleClickUp()}>Upload</Button>
          {create && <Button onClick={() => alert('click')}>Criar</Button>}
          <Button onClick={() => handleClickDown()}>Download</Button>
        </div>
      </div>
    );
  };

  const ProgressBar = () => {
    return (
      <div className="flex w-full flex-col gap-2">
        <p className="text-md font-normal">
          <span>{progressPercentage}%</span> concluído
        </p>
        <div className="relative h-2 w-full rounded-lg bg-gray-400">
          <motion.div
            className="h-2 rounded-lg bg-green-600"
            initial={{ width: `0` }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </div>
      </div>
    );
  };

  const CardRoadmap = ({ className }: ICardRoadmap) => {
    return (
      <div
        className={cn(
          'm-2 flex h-fit w-full max-w-[450px] flex-col gap-4 rounded-lg bg-slate-100 p-4 dark:bg-slate-900',
          className,
        )}
      >
        <header className="flex w-full flex-col items-center justify-start gap-4">
          <div className="flex w-full flex-row items-center justify-start gap-4">
            <Avatar className="h-12 w-12" src="/cover-alya.webp" />
            <p className="text-lg font-bold">Roadmap</p>
          </div>

          <ProgressBar />

          <div className="g flex w-full flex-row items-center justify-between">
            <div className="flex flex-row -space-x-4">
              <Avatar className="h-10 w-10" src="/cover-alya.webp" />
              <Avatar className="h-10 w-10" src="/cover-shadow.webp" />
            </div>

            <div className="flex flex-row items-end gap-4">
              <div className="flex flex-row items-center justify-center gap-1 text-gray-400">
                <CalendarBlank size={20} />
                <p>Ínicio: 12 Dez</p>
              </div>
              <div className="flex flex-row items-center justify-center gap-1 text-gray-400">
                <Target size={20} />
                <p>Fim: 12 Jan</p>
              </div>
            </div>
          </div>
        </header>

        <CardProgress />
      </div>
    );
  };

  const CardProgress = () => {
    return (
      <div className="flex w-full flex-col gap-4 rounded-md border border-gray-400 px-4 py-2">
        <header className="flex w-full justify-between">
          <p className="text-md text-lg font-semibold">Tarefas</p>
          <div className="flex items-center gap-2">
            <CheckCircle size={20} color="rgba(17, 221, 68, 0.764)" />
            <p className="text-xs text-gray-400">3 tarefas</p>
          </div>
        </header>

        <div className="flex flex-col gap-4">
          <ItemCardProgress
            label="Tradução"
            stage={stageProgress.translation}
          />
          <ItemCardProgress label="Revisão" stage={stageProgress.review} />
          <ItemCardProgress label="QC" stage={stageProgress.qc} />
        </div>
      </div>
    );
  };

  const ItemCardProgress = ({ label, stage }: IItemCardProgress) => {
    const { down, up, done } = stage;
    return (
      <div className="flex w-full flex-row items-center justify-between">
        <span className="flex flex-row items-center gap-2">
          <FakeCheckbox label={label} size="md" checked={done} />
          {down && !up ? <LabelProgress /> : null}
        </span>
        <Avatar
          className={`h-8 w-8 ${done ? 'ring-primary dark:ring-primary' : ''}`}
          src="/cover-alya.webp"
        />
      </div>
    );
  };

  const LabelProgress = () => {
    return (
      <div className="flex w-full flex-col gap-2 rounded-lg bg-blue-300/10 p-1">
        <p className="text-sm font-normal text-primary">Em Progresso</p>
      </div>
    );
  };

  return (
    <div className="m-4 flex flex-col gap-4">
      <Title title="Capítulo - 01" />
      <div className="relative flex h-full w-full flex-col items-center justify-start rounded-lg bg-slate-100 px-4 pb-4 dark:bg-slate-800">
        <div className="relative top-[-30px] flex h-20 w-auto flex-row items-end gap-4 rounded-xl bg-white px-8 pb-2 text-lg font-bold before:absolute before:left-[-25px] before:top-7 before:h-[50px] before:w-[25px] before:rounded-tr-[25px] before:shadow-[0_-25px_0_0_#FFF] before:content-[''] after:absolute after:right-[-25px] after:top-7 after:h-[50px] after:w-[25px] after:rounded-tl-[25px] after:shadow-[0_-25px_0_0_#FFF] after:content-[''] dark:bg-slate-900 before:dark:shadow-[0_-25px_0_0_#0F172A] after:dark:shadow-[0_-25px_0_0_#0F172A]">
          <Avatar className="h-12 w-12" src="/cover-alya.webp" />
          <Avatar className="h-12 w-12" src="/cover-shadow.webp" />
          <Avatar className="h-12 w-12" src="/cover-seven.webp" />
          <Avatar className="h-12 w-12" src="/elaina-banner.jpg" />
        </div>

        <div className="gap-4l flex w-full flex-row items-center justify-between">
          <CardRoadmap />

          <div className="grid grid-cols-2 gap-4">
            <CardAttachment
              title="Raw"
              description="Nenhum arquivo upado ainda."
              handleClickDown={() => {
                setStageProgress({
                  ...stageProgress,
                  translation: { down: true, up: false, done: false },
                });
              }}
              handleClickUp={() => {
                setStageProgress({
                  ...stageProgress,
                  translation: { down: false, up: true, done: true },
                });
              }}
            />
            <CardAttachment
              title="Tradução"
              create
              description="Arquivo levemente corrompido, ignorar páginas em branco"
              handleClickDown={() => {
                setStageProgress({
                  ...stageProgress,
                  translation: { down: true, up: false, done: false },
                });
              }}
              handleClickUp={() => {
                setStageProgress({
                  ...stageProgress,
                  translation: { down: false, up: true, done: true },
                });
              }}
            />
            <CardAttachment
              title="Revisão"
              description="Nenhum arquivo upado ainda."
              handleClickDown={() => {
                setStageProgress({
                  ...stageProgress,
                  review: { down: true, up: false, done: false },
                });
              }}
              handleClickUp={() => {
                setStageProgress({
                  ...stageProgress,
                  review: { down: false, up: true, done: true },
                });
              }}
            />
            <CardAttachment
              title="QC"
              description="Nenhum arquivo upado ainda."
              handleClickDown={() => {
                setStageProgress({
                  ...stageProgress,
                  qc: { down: true, up: false, done: false },
                });
              }}
              handleClickUp={() => {
                setStageProgress({
                  ...stageProgress,
                  qc: { down: false, up: true, done: true },
                });
              }}
            />
          </div>
        </div>

        <div
          className={cn(
            'mt-4 flex w-full flex-col items-center justify-between gap-4 rounded-lg border border-dashed border-slate-400 p-4',
            {
              'border-solid border-primary': allDone,
            },
          )}
        >
          <h2 className="text-lg font-bold">Capítulo pronto para postagem</h2>
          <div className="flex w-full flex-row items-center justify-center gap-4">
            <Button
              onClick={() => alert('click') /* setModalOpen(true) */}
              disabled={!allDone}
            >
              Revisar Créditos
            </Button>
            <Button onClick={() => alert('click')} disabled={!allDone}>
              Postar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
