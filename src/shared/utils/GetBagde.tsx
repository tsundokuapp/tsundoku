import { TStatusComic, TStatusNovel } from '@/shared/types/system';
import { Badge } from '@/shared/components/ui/badge';

import { cn } from './cn';

type StatusVariant = TStatusNovel | TStatusComic;

const statusStyles: Record<StatusVariant, { badge: string; dot: string }> = {
  // TODO: Essas classes estão no safelist do tailwind.config.ts, qualquer mudança aqui deve ser refletida lá, porque o tailwind não consegue detectar o uso dinâmico dessas classes (o lib burra do cacete)
  Concluído: {
    badge: 'bg-emerald-50 text-emerald-700',
    dot: 'bg-emerald-500',
  },
  Hiato: {
    badge: 'bg-amber-50 text-amber-700',
    dot: 'bg-amber-500',
  },
  'Em andamento': {
    badge: 'bg-blue-50 text-blue-700',
    dot: 'bg-blue-500',
  },
  Cancelado: {
    badge: 'bg-muted text-muted-foreground',
    dot: 'bg-muted-foreground',
  },
};

function getStatusVariant(status: string): StatusVariant {
  switch (status) {
    case 'Concluído':
      return 'Concluído';
    case 'Em andamento':
      return 'Em andamento';
    case 'Hiato':
      return 'Hiato';
    case 'Cancelado':
      return 'Cancelado';
    default:
      return 'Em andamento';
  }
}

export function GetBadgeByStatusProject({
  status = 'Em andamento*',
}: {
  status: string;
  variant?: StatusVariant;
}) {
  const styles = statusStyles[getStatusVariant(status)];
  return (
    <Badge
      variant="outline"
      className={cn('gap-1.5 rounded-full', styles.badge)}
    >
      <span
        className={cn('size-1.5 rounded-full', styles.dot)}
        aria-hidden="true"
      />
      {status}
    </Badge>
  );
}
