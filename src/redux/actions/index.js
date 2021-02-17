import axios from 'axios';

import {
  FETCH_USERS_FAILURE,
  FETCH_USERS_LOADED,
  FETCH_USERS_REQUESTED,
  SORT_USERS,
  TOGGLE_DATA_COLLECTION,
  FILTER_USERS,
  ADD_USER,
} from './actionTypes';

const usersRequested = () => ({
  type: FETCH_USERS_REQUESTED,
});

const usersLoaded = (users) => ({
  type: FETCH_USERS_LOADED,
  payload: users,
});

const usersError = (users) => ({
  type: FETCH_USERS_FAILURE,
  payload: users,
});

export const sortUsers = (columnName) => ({
  type: SORT_USERS,
  payload: columnName,
});

export const toggleDataCollection = () => ({
  type: TOGGLE_DATA_COLLECTION,
});

export const filterUsers = (searchStr) => ({
  type: FILTER_USERS,
  payload: searchStr,
});

export const addUser = (user) => ({
  type: ADD_USER,
  payload: user,
});

export const fetchUsers = (isBigCollection) => async (dispatch) => {
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
