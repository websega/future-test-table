import axios from 'axios';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { FormikValuesType } from '../../../components/AddRowForm/AddRowForm';

import { ColumnNameType } from '../../reducers/users';
import { RootStateType } from '../../reducers';

import {
  FETCH_USERS_FAILURE,
  FETCH_USERS_LOADED,
  FETCH_USERS_REQUESTED,
  SORT_USERS,
  TOGGLE_DATA_COLLECTION,
  ADD_USER,
  ActionUsersTypes,
  TOOGLE_VISIBLE_ADD_ROW,
  UserType,
} from './types';

type ThunkType = ThunkAction<
  Promise<void>,
  RootStateType,
  unknown,
  Action<ActionUsersTypes['type']>
>;

const usersRequested = (): ActionUsersTypes => ({
  type: FETCH_USERS_REQUESTED,
});

const usersLoaded = (users: UserType[]): ActionUsersTypes => ({
  type: FETCH_USERS_LOADED,
  payload: users,
});

const usersError = (error: string): ActionUsersTypes => ({
  type: FETCH_USERS_FAILURE,
  payload: error,
});

export const sortUsers = (columnName: ColumnNameType): ActionUsersTypes => ({
  type: SORT_USERS,
  payload: columnName,
});

export const toggleDataCollection = (): ActionUsersTypes => ({
  type: TOGGLE_DATA_COLLECTION,
});

export const addUser = (user: FormikValuesType): ActionUsersTypes => ({
  type: ADD_USER,
  payload: user,
});

export const toggleAddRow = (): ActionUsersTypes => ({
  type: TOOGLE_VISIBLE_ADD_ROW,
});

export const fetchUsers =
  (isBigCollection: boolean): ThunkType =>
  async (dispatch) => {
    try {
      const getUrl = () =>
        isBigCollection
          ? 'https://randomuser.me/api/?results=1000&inc=gender,name,location,email,phone,id,nat&noinfo'
          : 'https://randomuser.me/api/?results=100&inc=gender,name,location,email,phone,id,nat&noinfo';

      dispatch(usersRequested());

      const response = await axios.get(getUrl());

      dispatch(usersLoaded(response.data.results));
    } catch (error) {
      dispatch(usersError(error));
    }
  };
