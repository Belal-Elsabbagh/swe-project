import { formatColor, getUtilizationColor } from '@/lib';
import { TableCell } from '@mui/material';
import { Link } from '@inertiajs/inertia-react';
import React from 'react';

const MAX_COLOR = 255;

const config = {
  styles: {
    actionButton: 'p-2 rounded-lg hover:bg-gray',
    whiteColor: [MAX_COLOR, MAX_COLOR, MAX_COLOR],
  },
  utilizationAccuracy: 2,
};

export function userIndexTableRow(user) {
  return [
    <TableCell key={'name'} component={'th'} scope={'row'}>
      {user.name}
    </TableCell>,
    <TableCell key={'email'} align={'center'}>
      {user.email}
    </TableCell>,
    <TableCell key={'position'} align={'center'}>
      {user.user_type.name}
    </TableCell>,
    <TableCell key={'show'} align={'center'}>
      <Link className={config.styles.actionButton} href={`/users/${user.id}`}>
        Show
      </Link>
    </TableCell>,
  ];
}

export function employeeIndexTableRowCells(employee) {
  const utilizationStyle = {
    backgroundColor: getUtilizationColor(employee.total_utilization),
    color:
      employee.total_utilization > 1
        ? formatColor(...config.styles.whiteColor)
        : formatColor(0, 0, 0),
  };
  const formattedUtilization = Number(
    employee.total_utilization.toFixed(config.utilizationAccuracy)
  );
  return [
    <TableCell key={'email'} component="th" scope="row">
      {employee.email}
    </TableCell>,
    <TableCell
      key={'total_utilization'}
      align="center"
      style={utilizationStyle}
    >
      {formattedUtilization}
    </TableCell>,
    <TableCell align="center" key={'show'}>
      <Link
        className={config.styles.actionButton}
        href={`/employees/${employee.id}`}
      >
        Show
      </Link>
    </TableCell>,
  ];
}

export function projectIndexTableRowCells(project) {
  return [
    <TableCell key={'name'} component="th" scope="row">
      {project.name}
    </TableCell>,
    <TableCell key={'leader'} align="center">
      {project.leader.name ?? 'None'}
    </TableCell>,
    <TableCell key={'show'} align="center">
      <Link
        className={config.styles.actionButton}
        href={`/projects/${project.id}`}
      >
        Show
      </Link>
    </TableCell>,
  ];
}

export function teamIndexTableRowCells(team) {
  return [
    <TableCell key={'email'} component="th" scope="row">
      {team.email}
    </TableCell>,
    <TableCell key={'utilization'} align="center">
      {Number(team.pivot.utilization)}
    </TableCell>,
    <TableCell key={'edit'} align="center">
      <Link
        className={config.styles.actionButton}
        href={`/projects/${team.pivot.project_id}/team/${team.pivot.id}/edit`}
      >
        Edit
      </Link>
    </TableCell>,
  ];
}
