import React from 'react';
import { useForm } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia';
import {
  Autocomplete,
  Button,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputWithIcon from '@/Components/Inputs/InputWithIcon';
import UtilizationIcon from '@/Components/Icons/UtilizationIcon';
import UtilizationInput from '@/Components/Inputs/UtilizationInput';
import UserIcon from '@/Components/Icons/UserIcon';

export default function edit(props) {
  const projectId = props.project.id;
  const { data, setData, errors, post } = useForm({
    employee: null,
    utilization: null,
  });

  const updateFormData = (e) => {
    setData((currentData) => ({
      ...currentData,
      [e.target.name]: e.target.value,
    }));
  };

  function handleSubmit(e) {
    e.preventDefault();
    post(route(`projects.team.store`, projectId));
  }

  return (
    <AuthenticatedLayout
      auth={props.auth}
      errors={props.errors}
      title={'Add team member'}
      backHref={`/projects/${projectId}`}
    >
      <div
        id="white container"
        className=" rounded-lg  bg-white flex flex-row justify-center"
      >
        <div
          id="form container"
          className="py-16 flex flex-col items-center justify-center px-24"
        >
          <Typography sx={{ mb: 2 }} variant="h5">
            {' '}
            Add a new team member{' '}
          </Typography>
          <div className=" rounded-lg bg-content p-16 pr-24 flex flex-row justify-center items-center">
            <div id="form">
              <InputWithIcon
                input={
                  <FormControl sx={{ minWidth: 1 }}>
                    {' '}
                    <InputLabel id="demo-simple-select-label">
                      Employee
                    </InputLabel>
                    <Select
                      fullWidth
                      className="bg-content"
                      sx={{ minWidth: 1 }}
                      name={'employee'}
                      labelId="demo-simple-select-label"
                      required
                      onChange={updateFormData}
                    >
                      {props.employees.map((i) => {
                        return (
                          <MenuItem value={i.id}>
                            {' '}
                            {i.first_name + ' ' + i.last_name}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                }
                icon={<UserIcon svgClassName={'w-6 h-6'} />}
                error={errors.employee}
              />
              <InputWithIcon
                input={<UtilizationInput onChange={updateFormData} />}
                icon={<UtilizationIcon svgClassName={'w-6 h-6'} />}
                error={errors.utilization}
              />
              <Button
                style={{
                  backgroundColor: 'rgba(75, 0, 130, 0.3)',
                  color: 'black',
                }}
                onClick={handleSubmit}
              >
                save changes
              </Button>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
