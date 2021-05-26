import React from 'react';
import { UserType } from '../../redux/actions/types';
import { SortType } from '../../redux/reducer';

import './SortingTable.scss';

const columnNames: SortType[] = [
  'id',
  'firstName',
  'lastName',
  'email',
  'phone',
];

type SortingTablePropsType = {
  sortingColumn: string;
  data: UserType[];
  isSortAsc: boolean;
  onSortHandler: (columnName: SortType) => void;
  onRowClick: (user: UserType) => void;
};

const SortingTable = ({
  sortingColumn,
  data,
  isSortAsc,
  onSortHandler,
  onRowClick,
}: SortingTablePropsType): JSX.Element => {
  return (
    <table className="table table-hover table-striped table-bordered">
      <thead>
        <tr className="table__row">
          {columnNames.map((columnName) => {
            return (
              <th
                key={columnName}
                onClick={() => onSortHandler(columnName)}
                className="table__header"
              >
                <div className="table__cell">
                  <span>{columnName}</span>
                  {sortingColumn === columnName && !isSortAsc ? '▲' : ''}
                  {sortingColumn === columnName && isSortAsc ? '▼' : ''}
                </div>
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {data &&
          data.map((user) => {
            const { id, firstName, lastName, email, phone } = user;

            return (
              <tr
                className="table__row"
                key={id + firstName}
                onClick={() => onRowClick(user)}
              >
                <td>{id}</td>
                <td>{firstName}</td>
                <td>{lastName}</td>
                <td>{email}</td>
                <td>{phone}</td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};

export default SortingTable;
