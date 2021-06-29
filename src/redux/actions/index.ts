import axios from 'axios';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { RootStateType, ColumnNameType } from '../reducer';

import {
  FETCH_USERS_FAILURE,
  FETCH_USERS_LOADED,
  FETCH_USERS_REQUESTED,
  SORT_USERS,
  TOGGLE_DATA_COLLECTION,
  FILTER_USERS,
  ADD_USER,
  ActionTypes,
  TOOGLE_VISIBLE_ADD_ROW,
  UserType,
} from './types';

type ThunkType = ThunkAction<
  Promise<void>,
  RootStateType,
  unknown,
  Action<ActionTypes['type']>
>;

const usersRequested = (): ActionTypes => ({
  type: FETCH_USERS_REQUESTED,
});

const usersLoaded = (users: UserType[]): ActionTypes => ({
  type: FETCH_USERS_LOADED,
  payload: users,
});

const usersError = (error: string): ActionTypes => ({
  type: FETCH_USERS_FAILURE,
  payload: error,
});

export const sortUsers = (columnName: ColumnNameType): ActionTypes => ({
  type: SORT_USERS,
  payload: columnName,
});

export const toggleDataCollection = (): ActionTypes => ({
  type: TOGGLE_DATA_COLLECTION,
});

export const filterUsers = (searchStr: string): ActionTypes => ({
  type: FILTER_USERS,
  payload: searchStr,
});

export const addUser = (user: UserType): ActionTypes => ({
  type: ADD_USER,
  payload: user,
});

export const toggleAddRow = (): ActionTypes => ({
  type: TOOGLE_VISIBLE_ADD_ROW,
});

export const fetchUsers =
  (isBigCollection: boolean): ThunkType =>
  async (dispatch) => {
    try {
      const getUrl = () =>
        isBigCollection
          ? 'http://www.filltext.com/?rows=1000&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&delay=3&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D'
          : 'http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D';

      dispatch(usersRequested());

      const response = await axios.get(getUrl());

      dispatch(usersLoaded(response.data));
    } catch (error) {
      dispatch(usersError(error));
    }
  };
