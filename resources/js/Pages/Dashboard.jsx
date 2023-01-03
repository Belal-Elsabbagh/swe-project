import '../../css/app.css';
import EmployeesList from '@/Components/Dashboard/EmployeesList';
import ProjectsList from '@/Components/Dashboard/ProjectsList';
import ChartsCarousel from '@/Components/Dashboard/ChartsCarousel';
import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Dashboard({employees, projects, charts, auth, errors}) {
  const contentStyle = 'bg-white p-6 my-3 mx-3 rounded-lg';
  return (
    <AuthenticatedLayout auth={auth} errors={errors} title={'Dashboard'}>
      <div className={'flex flex-row items-center'}>
        <ChartsCarousel className={contentStyle} charts={charts} />
        <div className={'flex-col mx-3'}>
          <EmployeesList
            className={`w-full ${contentStyle}`}
            employees={employees.data}
          />
          <ProjectsList
            className={`w-full ${contentStyle}`}
            projects={projects}
          />
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
