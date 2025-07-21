import { CloudCheck } from '@phosphor-icons/react/dist/ssr';

export const DocumentInput = () => {
  return (
    <div className="flex items-center gap-2">
      <span className="cursor-pointer truncate px-1.5 text-lg text-white">
        Documento sem nome
      </span>
      <CloudCheck size={24} className="text-white" />
    </div>
  );
};
