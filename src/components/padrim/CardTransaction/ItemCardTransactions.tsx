import { UserCheck } from '@phosphor-icons/react';
import {
  UserCircleDashed,
  UserMinus,
  UserSwitch,
} from '@phosphor-icons/react/dist/ssr';
import { CSSProperties } from 'react';

import { cn } from '@/helpers/twUtils';

import { Badge, type BadgeProps } from './Badge';

export interface ItemCardTransactionsProps {
  user: string;
  date: string;
  cash: string;
  action: BadgeProps['action'];
  className?: CSSProperties | string;
}

export const ItemCardTransactions = ({
  user,
  date,
  cash,
  action,
  className,
}: ItemCardTransactionsProps) => {
  const actionMap = {
    cancelado: <UserMinus size={24} />,
    novo: <UserCheck size={24} />,
    pendente: <UserCircleDashed size={24} />,
    renovado: <UserSwitch size={24} />,
  };

  const iconStatusUser = actionMap[action];

  return (
    <div
      className={cn(
        'flex flex-row items-center justify-between p-4 odd:bg-[#F8FAFC] even:bg-white hover:cursor-pointer hover:bg-[#F0F0F0]',
        className,
      )}
    >
      <div className="flex flex-row items-center gap-3">
        <span className={`rounded-full p-1 text-black`}>{iconStatusUser}</span>
        <span>
          <strong className="text-sm text-black">{user}</strong>
          <p className="text-xs text-gray-400">{date}</p>
        </span>
      </div>
      <div className="flex flex-col">
        <Badge text={cash} action={action} showDetails />
      </div>
    </div>
  );
};
