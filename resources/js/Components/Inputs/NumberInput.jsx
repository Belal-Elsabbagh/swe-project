import { FormControl, InputLabel, OutlinedInput } from '@mui/material';
import React from 'react';

export default function NumberInput({
  min,
  max,
  step,
  defaultValue = null,
  onChange,
  name,
}) {
  return (
    <FormControl sx={{ minWidth: 1 }}>
      <InputLabel id="demo-simple-select-label">Capacity</InputLabel>
      <OutlinedInput
        type="number"
        name={name}
        inputProps={{ min, max, step }}
        defaultValue={defaultValue}
        sx={{ minWidth: 1, pl: 1 }}
        className="bg-content"
        label="project capacity"
        variant="outlined"
        labelId="demo-simple-select-label"
        onChange={onChange}
      />
    </FormControl>
  );
}
