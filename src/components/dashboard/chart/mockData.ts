import { mouths, years } from '@/helpers/Util';

const compareMouths = (prevMouths: number[], currentMouths: number[]) => {
  const totalPrevMouths = prevMouths.reduce((acc, curr) => acc + curr, 0);
  const totalCurrentMouths = currentMouths.reduce((acc, curr) => acc + curr, 0);
  const isBetter = totalCurrentMouths > totalPrevMouths;

  return { isBetter, totalPrevMouths, totalCurrentMouths };
};

const randomArray = (length: number) => {
  return Array.from({ length }, () => Math.floor(Math.random() * 1000));
};

const prevMouths = randomArray(12);
const currentMouths = randomArray(12);
const { isBetter: currentMouthIsBetter } = compareMouths(
  prevMouths,
  currentMouths,
);
const viewsPerYear = randomArray(5);

export const lineDataChart = {
  labels: mouths({ count: 12 }),
  datasets: [
    {
      label: 'Mês Anterior',
      data: prevMouths,
      fill: false,
      borderColor: currentMouthIsBetter
        ? 'rgba(255, 99, 132, 1)'
        : 'rgba(75, 192, 192, 1)',
      tension: 0.1,
    },
    {
      label: 'Mês Atual',
      data: currentMouths,
      fill: true,
      borderColor: currentMouthIsBetter
        ? 'rgba(75, 192, 192, 1)'
        : 'rgba(255, 99, 132, 1)',
      tension: 0.1,
      backgroundColor: currentMouthIsBetter
        ? 'rgba(75, 192, 192, 0.3)'
        : 'rgba(255, 99, 132, 0.3)',
    },
  ],
};

export const lineDataChartYear = {
  labels: years({ count: 5 }),
  datasets: [
    {
      label: 'Total de Visitas',
      barPercentage: 0.5,
      barThickness: 50,
      maxBarThickness: 100,
      minBarLength: 10,
      data: viewsPerYear
    },
  ],
};
