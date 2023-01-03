import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {isAdmin} from '@/lib';
import PersonnelNav from '@/Components/PersonnelNav';
import IndexContent from '@/Components/IndexContent';
import UserIndexFilter from '@/Components/IndexContent/IndexFilters/UserIndexFilter';
import Table from '@/Components/Outputs/Table';
import {userIndexTableRow} from '@/lib/factories/tables';

export default function index(props) {
  const users = props.users.data;
  const userType = props.auth.user.user_type_id;
  return (
    <AuthenticatedLayout
      auth={props.auth}
      errors={props.errors}
      title={'Users'}
      backHref={'/dashboard'}
    >
      <PersonnelNav active={'users'} />
      <IndexContent
        resource={'user'}
        canCreate={isAdmin(userType)}
        indexQuery={<UserIndexFilter />}
      >
        <Table
          data={users}
          getRowCells={userIndexTableRow}
          headers={['Name', 'Email', 'Position', 'Show']}
        />
      </IndexContent>
    </AuthenticatedLayout>
  );
}
