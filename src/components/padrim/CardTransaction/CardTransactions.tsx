'use client';

import {
  type ItemCardTransactionsProps,
  ItemCardTransactions,
} from './ItemCardTransactions';

interface MockTransactions extends ItemCardTransactionsProps {
  id: number;
}

const transactions: MockTransactions[] = [
  {
    id: 1,
    user: 'João',
    date: '10/08/2024',
    cash: 'R$ 10,00',
    action: 'novo',
  },
  {
    id: 2,
    user: 'Maria',
    date: '10/08/2024',
    cash: 'R$ 10,00',
    action: 'cancelado',
  },
  {
    id: 3,
    user: 'José',
    date: '10/08/2024',
    cash: 'R$ 10,00',
    action: 'pendente',
  },
  {
    id: 4,
    user: 'Ana',
    date: '10/08/2024',
    cash: 'R$ 10,00',
    action: 'renovado',
  },
];

export const CardTransactions = () => {
  return (
    <div className="flex h-full w-72 flex-col rounded-md bg-gray-50 p-1">
      <header className="p-4">
        <h6 className="text-sm font-bold text-black">Padrinhos</h6>
        <p className="text-xs text-gray-400">Transações recentes</p>
      </header>

      {transactions.map((transaction) => (
        <ItemCardTransactions key={transaction.id} {...transaction} />
      ))}
    </div>
  );
};
