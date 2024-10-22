import { BookOpenText, Files, UsersFour } from '@phosphor-icons/react/dist/ssr';

import { formatDate } from '@/helpers/Util';

import { CardInfo } from '../cardInfo/CardInfo';

export const HeaderDashboard = () => {
  const dateFormatted = formatDate(new Date(), true, true);

  return (
    <div className="row flex h-64 w-full justify-between rounded-b-2xl bg-background px-16 py-8 transition-all dark:border-2 dark:border-t-0 dark:border-slate-700">
      <div className="flex flex-col justify-between">
        <h1 className="text-3xl font-bold capitalize text-white lg:text-4xl">
          Bem-vindo, Usuário!
        </h1>
        <div>
          <p className="my-2 text-lg capitalize text-primary">Carteira Tsun</p>
          <p className="text-xl font-bold text-white lg:text-3xl">T$ 34,00</p>
        </div>
      </div>
      <div className="flex flex-col items-end justify-between">
        <h1 className="hidden text-primaryContrast lg:flex">{dateFormatted}</h1>
        <div className="flex flex-col gap-2 md:flex-row">
          <CardInfo
            icon={<BookOpenText size={24} />}
            title="Obras Paradas"
            data={{ value: '4' }}
            textTooltip="Obras com mais de 2 meses sem atualização, porcentagem quanto maior, pior."
          />
          <CardInfo
            icon={<UsersFour size={24} />}
            title="Staffs Inativos"
            data={{ value: '11' }}
            textTooltip="Staffs com mais de 1 mês sem atividade, porcentagem quanto maior, pior."
          />
          <CardInfo
            icon={<Files size={24} />}
            title="Posts Prontos"
            data={{ value: '26' }}
            positive
            textTooltip="Posts prontos para serem publicados, porcentagem quanto maior, melhor."
          />
        </div>
      </div>
    </div>
  );
};
