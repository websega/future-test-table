import React from 'react';

import { UserType } from '../../redux/actions/types';
import { ColumnNameType } from '../../redux/reducer';
import capitalizeFirstLetter from '../../utils/capitalizeFirstLetter';

import classes from './SortingTable.modules.scss';

const columnNames: ColumnNameType[] = [
  'id',
  'firstName',
  'lastName',
  'email',
  'phone',
];

type SortingTablePropsType = {
  sortingColumn: ColumnNameType | null;
  data: UserType[];
  isSortAsc: boolean;
  onSortHandler: (columnName: ColumnNameType) => void;
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
    <table className={classes.table}>
      <thead>
        <tr className={classes.tableRow}>
          {columnNames.map((columnName) => {
            return (
              <th
                key={columnName}
                className={classes.tableHeader}
                onClick={() => onSortHandler(columnName)}
              >
                <span>
                  {capitalizeFirstLetter(columnName.toLocaleLowerCase())}
                </span>
                {sortingColumn === columnName && !isSortAsc ? '▲' : ''}
                {sortingColumn === columnName && isSortAsc ? '▼' : ''}
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
                className={classes.tableRow}
                key={id + firstName}
                onClick={() => onRowClick(user)}
              >
                <td className={classes.tableCell}>{id}</td>
                <td className={classes.tableCell}>{firstName}</td>
                <td className={classes.tableCell}>{lastName}</td>
                <td className={classes.tableCell}>{email}</td>
                <td className={classes.tableCell}>{phone}</td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};

export default SortingTable;
