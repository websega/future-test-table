import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchUsers, sortUsers } from '../../redux/actions';

import Pagination from '../Pagination/Pagination';
import Select from '../Select/Select';
import SortingTable from '../SortingTable/SortingTable';
import UserInfo from '../UserInfo/UserInfo';

import './UserTable.scss';

const UserTable = () => {
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.users.loading);
  const isSortAsc = useSelector((state) => state.users.isSortAsc);
  const isBigCollection = useSelector((state) => state.users.isBigCollection);

  const users = useSelector((state) => state.users.users);
  const filteredUsers = useSelector((state) => state.users.filteredUsers);

  const [currentUsers, setCurrentUsers] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(10);
  const [sortingColumn, setSortingColumn] = useState('');

  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    dispatch(fetchUsers(isBigCollection));
  }, [dispatch, isBigCollection]);

  useEffect(() => {
    const indexOfLastPost = currentPage * usersPerPage;
    const indexOfFirstPost = indexOfLastPost - usersPerPage;

    if (filteredUsers.length > 0) {
      setCurrentUsers(filteredUsers.slice(indexOfFirstPost, indexOfLastPost));
    } else {
      setCurrentUsers(users.slice(indexOfFirstPost, indexOfLastPost));
    }
  }, [currentPage, filteredUsers, users, usersPerPage]);

  const sortHandler = ({ target }) => {
    const cell = target.closest('th');
    const columnName = cell.dataset.column;

    dispatch(sortUsers(columnName));
    setSortingColumn(columnName);
  };

  const rowClickHandler = (user) => {
    setSelectedUser(user);
  };

  const selectHandler = ({ target }) => {
    setUsersPerPage(target.value);
  };

  const paginationHandler = (pageNum) => {
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
        data={currentUsers}
        isSortAsc={isSortAsc}
        onSortHandler={sortHandler}
        onRowClick={rowClickHandler}
      />

      <div className='nav-block'>
        <Select onChange={selectHandler} />

        <Pagination
          pageNumbers={Math.ceil(
            (filteredUsers.length || users.length) / usersPerPage
          )}
          onChangePage={paginationHandler}
          currentPage={currentPage}
        />
      </div>
      {selectedUser && <UserInfo user={selectedUser} />}
    </>
  );
};

export default UserTable;
