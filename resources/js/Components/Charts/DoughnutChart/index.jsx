import {Doughnut} from 'react-chartjs-2';
import React from 'react';
import {makeChart} from '@/lib/factories/charts';

export default function DoughnutChart({
  className,
  chartClassName = 'w-max h-max',
  name,
  chartData: {data, label, labelKey, countKey},
  options,
}) {
  return (
    <div className={'flex-col justify-center p-3' + className}>
      <div className={'flex-row justify-center'}>
        <div className={'w-fit mx-auto'}>{name}</div>
      </div>
      <Doughnut
        className={chartClassName}
        data={makeChart(data, label, labelKey, countKey)}
        options={options}
      />
    </div>
  );
}
