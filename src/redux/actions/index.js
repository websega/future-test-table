import axios from 'axios';

import {
  FETCH_USERS_FAILURE,
  FETCH_USERS_LOADED,
  FETCH_USERS_REQUESTED,
  SORT_USERS,
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

export const fetchUsers = () => async (dispatch) => {
  /*
    http://www.filltext.com/?rows=1000&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&delay=3&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D
    */

  try {
    dispatch(usersRequested());

    const response = await axios.get(
      'http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D'
    );

    dispatch(usersLoaded(response.data));
  } catch (error) {
    dispatch(usersError(error));
  }
};
