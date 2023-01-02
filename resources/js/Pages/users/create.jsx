import React from 'react';
import './../../../css/App.css';
import { useForm } from '@inertiajs/inertia-react';
import { Autocomplete, Button, TextField, Typography } from '@mui/material';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import TextFieldWithIcon from '@/Components/Inputs/TextFieldWithIcon';
import UserIcon from '@/Components/Icons/UserIcon';
import MailIcon from '@/Components/Icons/MailIcon';
import InputWithIcon from '@/Components/Inputs/InputWithIcon';
import { VpnKeyOutlined } from '@mui/icons-material';
import UserTypeIcon from '@/Components/Icons/UserTypeIcon';
import SelectIndex from '@/Components/Inputs/Select/SelectIndex';

export default function create(props) {
  const resource = 'user';
  const { data, setData, errors, processing, post } = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    userType: 2,
  });

  function handleSubmit(e) {
    e.preventDefault();
    console.log(data);
    post(route(`users.store`), {
      onSuccess: (params) => alert('Success'),
    });
  }

  function updateFormData(e) {
    setData((currentData) => ({
      ...currentData,
      [e.target.name]: e.target.value,
    }));
  }
  const user_type = [
    { id: 3, name: 'admin' },
    { id: 2, name: 'leader' },
  ];
  return (
    <AuthenticatedLayout
      auth={props.auth}
      errors={props.errors}
      title={'Users'}
      backHref={`/${resource}s`}
    >
      <div id="white container" className="rounded-lg px-48 py-16 bg-white">
        <div id="form container" className="px-48 pt-16">
          <Typography sx={{ mb: 2 }} variant="h5">
            {' '}
            Add a user{' '}
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextFieldWithIcon
              label={'Name'}
              icon={<UserIcon svgClassName={'w-6 h-6'} />}
              onChange={updateFormData}
              error={errors.name}
              name={'name'}
            />
            <TextFieldWithIcon
              label={'Email'}
              icon={<MailIcon svgClassName={'w-6 h-6'} />}
              onChange={updateFormData}
              error={errors.email}
              name={'email'}
            />

            <InputWithIcon
              input={
                <TextField
                  name={'password'}
                  type="password"
                  sx={{ minWidth: 1 }}
                  className="bg-content"
                  onChange={updateFormData}
                  required
                  label="user's password"
                  variant="outlined"
                />
              }
              error={errors.password}
              icon={<VpnKeyOutlined className={'w-6 h-6'} />}
            />
            <InputWithIcon
              input={
                <TextField
                  name={'password_confirmation'}
                  type="password"
                  sx={{ minWidth: 1 }}
                  className="bg-content"
                  onChange={updateFormData}
                  required
                  label="confirm password"
                  variant="outlined"
                />
              }
              error={errors.password_confirmation}
              icon={<VpnKeyOutlined className={'w-6 h-6'} />}
            />
            <InputWithIcon
              input={
                <SelectIndex
                  name={'userType'}
                  label={'user type'}
                  onChange={updateFormData}
                  data={user_type}
                />
              }
              error={errors.userType}
              icon={<UserTypeIcon svgClassName={'w-6 h-6'} />}
            />
            <Button
              type={'submit'}
              style={{
                backgroundColor: 'rgba(75, 0, 130, 0.3)',
                color: 'black',
              }}
            >
              Add user
            </Button>
          </form>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
