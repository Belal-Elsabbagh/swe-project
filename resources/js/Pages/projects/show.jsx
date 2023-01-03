import React from 'react';
import TextDisplay from '@/Components/Outputs/TextDisplay';
import AttributeDisplay from '@/Components/Outputs/AttributeDisplay';
import ItemHeader from '@/Components/ItemHeader';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import CreateResource from '@/Components/Inputs/CreateResource';
import {isAdmin} from '@/lib';
import {Edit} from '@mui/icons-material';
import Table from '@/Components/Outputs/Table';
import {teamIndexTableRowCells} from '@/lib/factories/tables';

export default function show(props) {
  let {project} = props;
  project = project.data;
  let userType = props.auth.user.user_type_id;
  return (
    <AuthenticatedLayout
      auth={props.auth}
      errors={props.errors}
      title={'Project Details'}
      backHref={'/projects'}
    >
      <div className="bg-white p-6 flex flex-col">
        <ItemHeader
          title={project.name + ' Details'}
          href={isAdmin(userType) ? `/projects/${project.id}/edit` : null}
          linkIcon={<Edit className={'w-6 h-6'} />}
        />
        <div className="flex-col justify-center bg-content rounded-lg px-8 py-4">
          <TextDisplay label={'Name'} value={project.name} className="mb-5" />
          <TextDisplay
            label={'Region'}
            value={project.region}
            className=" mb-5"
          />
          <TextDisplay
            label={'Leader'}
            value={project.leader.name}
            className=" mb-5"
          />
          {project.team.length > 0 ? (
            <AttributeDisplay label={'Team'}>
              <Table
                data={project.team}
                getRowCells={teamIndexTableRowCells}
                headers={['Email', 'Utilization', 'Edit']}
              />
            </AttributeDisplay>
          ) : (
            <TextDisplay label={'Team'} value={'None'} className=" mb-5" />
          )}
          <div className={'mr-auto mt-2'}>
            <CreateResource
              resource={'team'}
              label={'add team member'}
              href={`/projects/${project.id}/team/create`}
            />
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
