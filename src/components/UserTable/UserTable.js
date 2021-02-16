import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchUsers, sortUsers } from '../../redux/actions';

import Pagination from '../Pagination/Pagination';
import Select from '../Select/Select';
import SortingTable from '../SortingTable/SortingTable';

import './UserTable.scss';

const UserTable = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.users.loading);
  const users = useSelector((state) => state.users.users);
  const isSortAsc = useSelector((state) => state.users.isSortAsc);

  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(10);
  const [currentUsers, setCurrentUsers] = useState([]);
  const [sortingColumn, setSortingColumn] = useState('');

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
    const columnName = cell.dataset.column;

    dispatch(sortUsers(columnName));
    setSortingColumn(columnName);
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
      <div className='spinner-border' role='status'>
        <span className='visually-hidden'></span>
      </div>
    );
  }

  return (
    <>
      <SortingTable
        sortingColumn={sortingColumn}
        currentUsers={currentUsers}
        isSortAsc={isSortAsc}
        onSortHandler={sortHandler}
      />

      <div className='nav-block'>
        <Select onChange={changeSelectHandler} />

        <Pagination
          pageNumbers={Math.ceil(users.length / usersPerPage)}
          onChangePage={changePageHandler}
          currentPage={currentPage}
        />
      </div>
    </>
  );
};

export default UserTable;
