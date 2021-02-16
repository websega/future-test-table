import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchUsers, sortUsers } from '../../redux/actions';

import Pagination from '../Pagination';
import Select from '../Select';

import './UserTable.scss';

const UserTable = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.users.loading);
  const users = useSelector((state) => state.users.users);

  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(10);
  const [currentUsers, setCurrentUsers] = useState([]);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    const indexOfLastPost = currentPage * usersPerPage;
    const indexOfFirstPost = indexOfLastPost - usersPerPage;

    setCurrentUsers(users.slice(indexOfFirstPost, indexOfLastPost));
  }, [currentPage, users, usersPerPage]);

  const sortHandler = ({ target }) => {
    const cell = target.closest('th');
    const cellName = cell.dataset.cellName;

    dispatch(sortUsers(cellName));
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
            {['id', 'firstName', 'lastName', 'email', 'phone'].map(
              (cellName) => {
                return (
                  <th
                    key={cellName}
                    data-cellName={cellName}
                    onClick={sortHandler}
                    className='table__header'
                  >
                    <div className='table__cell'>
                      <span>{cellName}</span>
                    </div>
                  </th>
                );
              }
            )}
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
        <Select onChange={changeSelectHandler} />

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
