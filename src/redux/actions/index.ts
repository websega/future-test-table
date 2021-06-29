import axios from 'axios';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { FormikValuesType } from '../../components/AddRowForm/AddRowForm';

import { RootStateType, ColumnNameType, FeatureFilterType } from '../reducer';

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
  FILTER_USERS_BY_FEATURE,
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

export const filterUsersByFeature = (
  feature: FeatureFilterType,
  value: string
): ActionTypes => ({
  type: FILTER_USERS_BY_FEATURE,
  payload: { feature, value },
});

export const addUser = (user: FormikValuesType): ActionTypes => ({
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
          ? 'https://randomuser.me/api/?results=1000&inc=gender,name,location,email,phone,id,nat&noinfo'
          : 'https://randomuser.me/api/?results=100&inc=gender,name,location,email,phone,id,nat&noinfo';

      dispatch(usersRequested());

      const response = await axios.get(getUrl());

      dispatch(usersLoaded(response.data.results));
    } catch (error) {
      dispatch(usersError(error));
    }
  };
