'use client';

import { Chart, registerables } from 'chart.js';
import { ChartConfiguration } from 'chart.js/dist/types';
import { useEffect, useRef } from 'react';

export const DataCharts = (props: ChartConfiguration) => {
  const { data, options, type } = props;
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (chartRef.current) {
      const chart = new Chart(chartRef.current, {
        type,
        data,
        options,
      });
      return () => {
        chart.destroy();
      };
    }
  }, [type, data, options]);

  return <canvas ref={chartRef} className="max-h-[23rem]" />;
};

Chart.register(...registerables);
