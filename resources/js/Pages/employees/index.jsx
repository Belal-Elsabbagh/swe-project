import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { isAdmin } from '@/lib';
import PersonnelNav from '@/Components/PersonnelNav';
import IndexContent from '@/Components/IndexContent';
import EmployeeIndexFilter from '@/Components/IndexContent/IndexFilters/EmployeeIndexFilter';
import Table from '@/Components/Outputs/Table';
import { employeeIndexTableRowCells } from '@/lib/factories/TableFactories';

export default function index(props) {
  const employees = props.employees.data;
  const skills = props.skills;
  return (
    <AuthenticatedLayout
      auth={props.auth}
      errors={props.errors}
      title={'Employees'}
      backHref={'/dashboard'}
    >
      <PersonnelNav active={'employees'} />
      <IndexContent
        indexQuery={<EmployeeIndexFilter skills={skills} />}
        resource={'employee'}
        canCreate={isAdmin(props.auth.user.user_type_id)}
      >
        <Table
          data={employees}
          getRowCells={employeeIndexTableRowCells}
          headers={['Email', 'Utilization', 'Show']}
        />
      </IndexContent>
    </AuthenticatedLayout>
  );
}
