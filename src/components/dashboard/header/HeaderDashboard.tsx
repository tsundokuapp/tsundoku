import { BookOpenText, Files, UsersFour } from '@phosphor-icons/react/dist/ssr';

import { CardInfo } from '../cardInfo/CardInfo';

export const HeaderDashboard = () => {
  return (
    <div className="row flex h-64 justify-between rounded-b-2xl bg-background px-16 py-8">
      <div className="flex flex-col justify-between">
        <h1 className="text-4xl font-bold capitalize text-white">
          Bem-vindo, Usuário!
        </h1>
        <div>
          <p className="my-2 text-lg capitalize text-primary">Carteira Tsun</p>
          <p className="text-3xl font-bold text-white">R$ 34,00</p>
        </div>
      </div>
      <div className="flex flex-col items-end justify-between">
        <h1 className="text-primaryContrast">17 de Outubro de 2025</h1>
        <div className="flex flex-row gap-2">
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
