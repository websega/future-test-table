import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { fetchUsers, sortUsers } from '../../redux/actions';
import { UserType } from '../../redux/actions/types';
import { ColumnNameType } from '../../redux/reducer';
import {
  getFilteredUsers,
  getLoading,
  getSortAsc,
  getUsers,
  getIsBigCollection,
} from '../../selectors/selectors';

import Pagination from '../Pagination/Pagination';
import Select from '../Select/Select';
import SortingTable from '../SortingTable/SortingTable';
import UserInfo from '../UserInfo/UserInfo';

import classes from './UserTable.modules.scss';

const numbersUsersPerPage = ['10 / page', '25 / page', '50 / page'];

const UserTable = (): JSX.Element => {
  const dispatch = useDispatch();

  const loading = useSelector(getLoading);
  const isSortAsc = useSelector(getSortAsc);
  const isBigCollection = useSelector(getIsBigCollection);

  const users = useSelector(getUsers);
  const filteredUsers = useSelector(getFilteredUsers);

  const [currentUsers, setCurrentUsers] = useState<UserType[]>([]);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [usersPerPage, setUsersPerPage] = useState<number>(10);
  const [sortingColumn, setSortingColumn] =
    useState<ColumnNameType | null>(null);

  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);

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

  const sortHandler = (columnName: ColumnNameType) => {
    dispatch(sortUsers(columnName));
    setSortingColumn(columnName);
  };

  const rowClickHandler = (user: UserType) => {
    setSelectedUser(user);
  };

  const selectHandler = (userPer: string) => {
    setUsersPerPage(parseInt(userPer, 10));
  };

  const paginationHandler = (pageNum: number) => {
    setCurrentPage(pageNum);
  };

  if (loading) {
    return <div>Loading...</div>;
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

      <div className={classes.navBlock}>
        <Select onClickItem={selectHandler} items={numbersUsersPerPage} />

        <Pagination
          totalPages={Math.ceil(
            (filteredUsers.length || users.length) / usersPerPage
          )}
          onChange={paginationHandler}
          currentPage={currentPage}
        />
      </div>

      {selectedUser && <UserInfo user={selectedUser} />}
    </>
  );
};

export default UserTable;
