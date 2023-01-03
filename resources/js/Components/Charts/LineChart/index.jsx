import {Line} from 'react-chartjs-2';
import {makeChart} from '@/lib/factories/charts';
import React from 'react';

export default function LineChart({
  className,
  name,
  header = false,
  chartData: {data, label, labelKey, countKey},
  options,
}) {
  return (
    <div className={'flex-col justify-center p-3' + className}>
      {header ? (
        <div className={'flex-row justify-center'}>
          <div className={'w-fit mx-auto'}>{name}</div>
        </div>
      ) : (
        <div></div>
      )}

      <Line
        className={'w-fit h-fit'}
        data={makeChart(data, label, labelKey, countKey)}
        options={options}
      />
    </div>
  );
}
