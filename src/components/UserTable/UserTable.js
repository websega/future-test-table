import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';

import Pagination from '../Pagination/Pagination';

import './UserTable.scss';
import PageSelect from '../PageSelect/PageSelect';

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [sortFlag, setSortFlag] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(10);
  const [currentUsers, setCurrentUsers] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    /*
    http://www.filltext.com/?rows=1000&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&delay=3&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D
    */
    const getUsers = async () => {
      try {
        setLoading(true);

        const response = await axios.get(
          'http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D'
        );

        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    getUsers();
  }, []);

  useEffect(() => {
    const indexOfLastPost = currentPage * usersPerPage;
    const indexOfFirstPost = indexOfLastPost - usersPerPage;

    setCurrentUsers(users.slice(indexOfFirstPost, indexOfLastPost));
  }, [currentPage, users, usersPerPage]);

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

  const changeSelectHandler = ({ target }) => {
    const indexOfLastPost = currentPage * usersPerPage;
    const indexOfFirstPost = indexOfLastPost - usersPerPage;

    setUsersPerPage(target.value);
    setCurrentUsers(users.slice(indexOfFirstPost, indexOfLastPost));
  };

  const changePageHandler = (pageNum) => {
    setCurrentPage(pageNum);
  };

  if (loading) {
    return (
      <div class='spinner-border' role='status'>
        <span class='visually-hidden'></span>
      </div>
    );
  }

  return (
    <div>
      <table className='table table-hover table-striped table-bordered'>
        <thead>
          <tr className='table__row'>
            {['id', 'firstName', 'lastName', 'email', 'phone'].map((param) => {
              return (
                <th
                  key={param}
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
          {currentUsers &&
            currentUsers.map((user) => {
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

      <div className='nav-block'>
        <PageSelect onChange={changeSelectHandler} />

        <Pagination
          pageNumbers={Math.ceil(users.length / usersPerPage)}
          onChangePage={changePageHandler}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

export default UserTable;
