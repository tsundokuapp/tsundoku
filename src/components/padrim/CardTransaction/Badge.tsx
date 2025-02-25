'use client';

import { merge } from '@/helpers/twUtils';

export interface BadgeProps {
  text: string;
  action: 'cancelado' | 'novo' | 'pendente' | 'renovado';
  showDetails?: boolean;
}

export const Badge = ({ text, action, showDetails }: BadgeProps) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <span
        className={merge('rounded-md px-2 py-1 text-xs text-white', {
          'bg-red-500': action === 'cancelado',
          'bg-green-500': action === 'novo',
          'bg-yellow-500': action === 'pendente',
          'bg-blue-500': action === 'renovado',
        })}
      >
        {text}
      </span>
      {showDetails && (
        <span className="ml-1 text-xs capitalize text-gray-400">{action}</span>
      )}
    </div>
  );
};
