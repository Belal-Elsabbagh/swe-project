import React from 'react';
import './../../../css/App.css';
import { useForm } from '@inertiajs/inertia-react';
import { Button, TextField, Typography } from '@mui/material';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Inertia } from '@inertiajs/inertia';
import UserIcon from '@/Components/Icons/UserIcon';
import MailIcon from '@/Components/Icons/MailIcon';
import TextFieldWithIcon from '@/Components/Inputs/TextFieldWithIcon';
import InputWithIcon from '@/Components/Inputs/InputWithIcon';
import { VpnKeyOutlined } from '@mui/icons-material';

export default function edit(props) {
  const resource = 'user';
  const resourcePlural = `${resource}s`;
  const { user } = props;
  const { data, setData, errors, put } = useForm({
    name: user.name,
    email: user.email,
    password: '',
    password_confirmation: '',
    userType: user.user_type_id,
  });

  function updateFormData(e) {
    setData((currentData) => ({
      ...currentData,
      [e.target.name]: e.target.value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    put(route(`${resourcePlural}.update`, user.id), {
      onSuccess: () => alert('success'),
    });
  }

  function destroy() {
    if (confirm(`Are you sure you want to delete this ${resource}?`)) {
      Inertia.delete(route(`${resourcePlural}.destroy`, user.id));
    }
  }

  return (
    <AuthenticatedLayout
      auth={props.auth}
      errors={props.errors}
      title={'Users'}
      backHref={`/${resourcePlural}/${user.id}`}
    >
      <div id="white container" className="rounded-lg px-48 py-16 bg-white">
        <Typography sx={{ mb: 2 }} variant="h5">
          {' '}
          Edit a user{' '}
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextFieldWithIcon
            label={'Name'}
            icon={<UserIcon svgClassName={'w-6 h-6'} />}
            initialValue={user.name}
            onChange={updateFormData}
            error={errors.name}
            name={'name'}
          />
          <TextFieldWithIcon
            label={'Email'}
            icon={<MailIcon svgClassName={'w-6 h-6'} />}
            initialValue={user.email}
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
                required
                label="User's password"
                variant="outlined"
                onChange={updateFormData}
              />
            }
            icon={<VpnKeyOutlined className={'w-6 h-6'} />}
            error={errors.password}
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
                label="Confirm password"
                variant="outlined"
              />
            }
            error={errors.password_confirmation}
            icon={<VpnKeyOutlined className={'w-6 h-6'} />}
          />
          <Button
            type={'submit'}
            sx={{
              mr: 1,
              backgroundColor: 'rgba(75, 0, 130, 0.3)',
              color: 'black',
            }}
          >
            edit {resource}
          </Button>
          {props.auth.user.user_type_id === 3 &&
          props.auth.user.id !== user.id ? (
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
          ) : null}
        </form>
      </div>
    </AuthenticatedLayout>
  );
}
