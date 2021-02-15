import React from 'react';

import axios from 'axios';
import { useEffect, useState } from 'react';

import './UserTable.scss';

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [sortFlag, setSortFlag] = useState('');

  useEffect(() => {
    /*
    http://www.filltext.com/?rows=1000&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&delay=3&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D
    */
    axios
      .get(
        'http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D'
      )
      .then((response) => {
        console.log(response);
        setUsers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const sortHandler = ({ target }) => {
    const cell = target.closest('th');
    const param = cell.dataset.param;

    const sortAscending = (a, b) => {
      if (a[param] > b[param]) {
        return 1;
      }

      if (a[param] < b[param]) {
        return -1;
      }

      return 0;
    };

    const sortDesc = (a, b) => {
      if (a[param] < b[param]) {
        return 1;
      }

      if (a[param] > b[param]) {
        return -1;
      }

      return 0;
    };

    console.log(sortFlag);

    if (sortFlag === `${param}-Asc` || sortFlag === '') {
      const sortedUsers = [...users].sort(sortAscending);
      setUsers(sortedUsers);
      setSortFlag(`${param}-Desc`);
    } else {
      const sortedUsers = [...users].sort(sortDesc);
      setUsers(sortedUsers);
      setSortFlag(`${param}-Asc`);
    }
    console.log(sortFlag, users);
  };

  return (
    <div>
      <table className='table table-hover table-striped table-bordered'>
        <thead>
          <tr className='table__row'>
            {['id', 'firstName', 'lastName', 'email', 'phone'].map((param) => {
              return (
                <th
                  data-param={param}
                  onClick={sortHandler}
                  className='table__header'
                >
                  <div className='table__cell'>
                    <span>{param}</span>
                    {sortFlag === `${param}-Desc` ? <span>▲</span> : null}
                    {sortFlag === `${param}-Asc` ? <span>▼</span> : null}
                  </div>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user) => {
              const { id, firstName, lastName, email, phone } = user;
              return (
                <tr key={id + firstName}>
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

      <select
        class='form-select form-select-sm'
        aria-label='.form-select-sm example'
      >
        <option value='10'>10</option>
        <option value='25'>25</option>
        <option value='50'>50</option>
      </select>

      <nav aria-label='Page navigation example'>
        <ul class='pagination'>
          <li class='page-item'>
            <a class='page-link' href='#'>
              Previous
            </a>
          </li>
          <li class='page-item'>
            <a class='page-link' href='#'>
              1
            </a>
          </li>
          <li class='page-item'>
            <a class='page-link' href='#'>
              2
            </a>
          </li>
          <li class='page-item'>
            <a class='page-link' href='#'>
              3
            </a>
          </li>
          <li class='page-item'>
            <a class='page-link' href='#'>
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default UserTable;
