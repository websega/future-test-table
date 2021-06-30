import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { fetchUsers, sortUsers } from '../../redux/actions/users';
import { UserType } from '../../redux/actions/users/types';
import { ColumnNameType } from '../../redux/reducers/users';

import {
  getFilters,
  getIsBigCollection,
  getLoading,
  getSortAsc,
  getUsers,
} from '../../selectors/selectors';

import Loading from '../Loading';
import Pagination from '../Pagination/Pagination';
import Select from '../Select/Select';
import SortingTable from '../SortingTable/SortingTable';
import UserInfo from '../UserInfo/UserInfo';

import classes from './UserTable.modules.scss';

const numbersUsersPerPage = ['10', '25', '50'];

const UserTable = (): JSX.Element => {
  const dispatch = useDispatch();

  const loading = useSelector(getLoading);
  const isSortAsc = useSelector(getSortAsc);
  const isBigCollection = useSelector(getIsBigCollection);
  const users = useSelector(getUsers);
  const { gender, nationality, search } = useSelector(getFilters);

  const [filteredUsers, setFilteredUsers] = useState<UserType[]>([]);
  const [visibleUsers, setVisibleUsers] = useState<UserType[]>([]);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [usersPerPage, setUsersPerPage] = useState<number>(10);
  const [sortingColumn, setSortingColumn] =
    useState<ColumnNameType | null>(null);

  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);

  useEffect(() => {
    dispatch(fetchUsers(isBigCollection));
  }, [dispatch, isBigCollection]);

  useEffect(() => {
    let tempFilteredUsers = users;

    if (!gender && !nationality && !search) {
      setFilteredUsers(users);
      return;
    }

    tempFilteredUsers = tempFilteredUsers.filter((user) => {
      if (user.gender !== gender && gender !== '') {
        return false;
      }

      if (user.nat !== nationality && nationality !== '') {
        return false;
      }

      return true;
    });

    tempFilteredUsers = tempFilteredUsers.filter((user) => {
      const { name, email, phone } = user;
      const comparedSearchString = search.toLowerCase();

      if (
        name.first.toLowerCase().includes(comparedSearchString) ||
        name.last.toLowerCase().includes(comparedSearchString) ||
        email.toLowerCase().includes(comparedSearchString) ||
        phone.toLowerCase().includes(comparedSearchString)
      ) {
        return true;
      }

      return false;
    });

    setFilteredUsers(tempFilteredUsers);
  }, [gender, nationality, search, users]);

  useEffect(() => {
    const indexOfLastPost = currentPage * usersPerPage;
    const indexOfFirstPost = indexOfLastPost - usersPerPage;

    setVisibleUsers(filteredUsers.slice(indexOfFirstPost, indexOfLastPost));
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

  return (
    <div className={classes.container}>
      {loading ? (
        <div className={classes.loadingWrapper}>
          <Loading />
        </div>
      ) : (
        <>
          <SortingTable
            sortingColumn={sortingColumn}
            data={visibleUsers}
            isSortAsc={isSortAsc}
            onSortHandler={sortHandler}
            onRowClick={rowClickHandler}
          />

          <div className={classes.navBlock}>
            <Select
              onClickItem={selectHandler}
              items={numbersUsersPerPage}
              value={`${usersPerPage}/ page`}
            />

            <Pagination
              totalPages={Math.ceil(filteredUsers.length / usersPerPage)}
              onChange={paginationHandler}
              currentPage={currentPage}
            />
          </div>

          {selectedUser && <UserInfo user={selectedUser} />}
        </>
      )}
    </div>
  );
};

export default UserTable;
