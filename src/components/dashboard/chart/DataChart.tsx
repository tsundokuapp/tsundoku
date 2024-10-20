'use client';

import { Chart, registerables } from 'chart.js';
import { ChartConfiguration } from 'chart.js/dist/types';
import { useEffect, useRef } from 'react';

export const DataCharts = (props: ChartConfiguration) => {
  const { data, options } = props;
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (chartRef.current) {
      const chart = new Chart(chartRef.current, {
        ...props,
        options: {
          ...options,
        },
      });
      return () => {
        chart.destroy();
      };
    }
  }, [data]);

  return <canvas ref={chartRef} className="h-[23rem]" />;
};

Chart.register(...registerables);
