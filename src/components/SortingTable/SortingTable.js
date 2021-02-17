import React from 'react';

import './SortingTable.scss';

const columnNames = ['id', 'firstName', 'lastName', 'email', 'phone'];

const SortingTable = ({
  sortingColumn,
  data,
  isSortAsc,
  onSortHandler,
  onRowClick,
}) => {
  return (
    <table className='table table-hover table-striped table-bordered'>
      <thead>
        <tr className='table__row'>
          {columnNames.map((columnName) => {
            return (
              <th
                key={columnName}
                data-column={columnName}
                onClick={onSortHandler}
                className='table__header'
              >
                <div className='table__cell'>
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
                className='table__row'
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
