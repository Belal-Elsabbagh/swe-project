import React from 'react';
import './../../../css/App.css';
import {useForm} from '@inertiajs/inertia-react';
import MultipleSelectCheckmarks from '@/Components/Inputs/Select/MultipleSelectCheckmarks';
import {Button, Typography} from '@mui/material';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Inertia} from '@inertiajs/inertia';
import TextFieldWithIcon from '@/Components/Inputs/TextFieldWithIcon';
import UserIcon from '@/Components/Icons/UserIcon';
import MailIcon from '@/Components/Icons/MailIcon';
import InputWithIcon from '@/Components/Inputs/InputWithIcon';
import SkillsIcon from '@/Components/Icons/SkillsIcon';

export default function edit(props) {
  const {data, setData, errors, put} = useForm({
    firstName: employee.first_name,
    lastName: employee.last_name,
    email: employee.email,
    skills: employee.skills.map((i) => i.id),
  });
  const resource = 'employee';
  const resourcePlural = `${resource}s`;
  const employee = props.employee.data;
  function updateFormData(e) {
    setData((currentData) => ({
      ...currentData,
      [e.target.name]: e.target.value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    put(route(`${resourcePlural}.update`, employee.id), {
      onSuccess: () => alert('success'),
    });
  }

  function destroy() {
    if (confirm(`Are you sure you want to delete this ${resource}?`)) {
      Inertia.delete(route(`${resourcePlural}.destroy`, employee.id));
    }
  }

  return (
    <AuthenticatedLayout
      auth={props.auth}
      errors={props.errors}
      title={'Employees'}
      backHref={`/${resourcePlural}/${employee.id}`}
    >
      <div id="white container" className=" rounded-lg  bg-white">
        <div id="form container" className="px-48 py-16">
          <Typography sx={{mb: 2}} variant="h5">
            {' '}
            Edit {employee.first_name}{' '}
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextFieldWithIcon
              label={'First name'}
              name={'firstName'}
              initialValue={data.firstName}
              icon={<UserIcon svgClassName={'w-6 h-6'} />}
              onChange={updateFormData}
              error={errors.firstName}
            />
            <TextFieldWithIcon
              label={'Last name'}
              name={'lastName'}
              initialValue={data.lastName}
              icon={<UserIcon svgClassName={'w-6 h-6'} />}
              onChange={updateFormData}
              error={errors.lastName}
            />
            <TextFieldWithIcon
              label={'Email'}
              name={'email'}
              initialValue={data.email}
              icon={<MailIcon svgClassName={'w-6 h-6'} />}
              onChange={updateFormData}
              error={errors.email}
            />
            <InputWithIcon
              input={
                <MultipleSelectCheckmarks
                  name={'skills'}
                  label={'Skills'}
                  choices={data.skills}
                  onChange={updateFormData}
                  data={props.skills}
                />
              }
              icon={<SkillsIcon svgClassName={'w-6 h-6'} />}
              error={errors.skills}
            />
            <Button
              sx={{
                mr: 1,
                backgroundColor: 'rgba(75, 0, 130, 0.3)',
                color: 'black',
              }}
              onClick={handleSubmit}
            >
              save {resource}
            </Button>
            <Button
              sx={{
                mr: 1,
                backgroundColor: 'rgba(75, 0, 130, 0.3)',
                color: 'black',
              }}
              onClick={destroy}
            >
              delete {resource}
            </Button>
          </form>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
