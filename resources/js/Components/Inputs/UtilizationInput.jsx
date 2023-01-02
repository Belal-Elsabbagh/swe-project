import React from 'react';
import NumberInput from '@/Components/Inputs/NumberInput';

export default function UtilizationInput({defaultValue = null, onChange}) {
  return (
    <NumberInput
      name={'utilization'}
      defaultValue={defaultValue}
      min={0}
      max={3}
      step={0.1}
      onChange={onChange}
    />
  );
}
