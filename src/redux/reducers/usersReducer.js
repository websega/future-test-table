import {
  FETCH_USERS_FAILURE,
  FETCH_USERS_LOADED,
  FETCH_USERS_REQUESTED,
  TOGGLE_DATA_COLLECTION,
  SORT_USERS,
  FILTER_USERS,
} from '../actions/actionTypes';

const initialState = {
  users: [],
  filteredUsers: [],
  loading: false,
  error: null,
  isSortAsc: true,
  isBigCollection: false,
};

const getSortedUsers = (state, key) => {
  const modifier = state.isSortAsc ? 1 : -1;

  const sortedCurrentUsers = [...state.currentUsers].sort((a, b) => {
    if (a[key] > b[key]) {
      return modifier * 1;
    }

    if (a[key] < b[key]) {
      return modifier * -1;
    }

    return 0;
  });

  return sortedCurrentUsers;
};

const filterUsers = (state, searchStr) => {
  if (searchStr.trim() === '') {
    return [];
  }

  const lowerCaseStr = searchStr.trim().toLowerCase();

  const filteredUsers = state.users.filter((user) => {
    const { id, firstName, lastName, email, phone } = user;

    if (
      id === +lowerCaseStr ||
      firstName.toLowerCase().match(lowerCaseStr) ||
      lastName.toLowerCase().match(lowerCaseStr) ||
      email.toLowerCase().match(lowerCaseStr) ||
      phone.toLowerCase().match(lowerCaseStr)
    ) {
      return true;
    }

    return false;
  });

  return filteredUsers;
};

export const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUESTED:
      return {
        ...state,
        loading: true,
      };
    case FETCH_USERS_LOADED:
      return {
        ...state,
        users: action.payload,
        filteredUsers: [],
        loading: false,
      };
    case FETCH_USERS_FAILURE:
      return {
        ...state,
        users: [],
        loading: false,
        error: action.payload,
      };
    case SORT_USERS:
      return {
        ...state,
        users: getSortedUsers(state, action.payload),
        isSortAsc: !state.isSortAsc,
      };
    case TOGGLE_DATA_COLLECTION:
      return {
        ...state,
        isBigCollection: !state.isBigCollection,
      };
    case FILTER_USERS:
      return {
        ...state,
        filteredUsers: filterUsers(state, action.payload),
      };

    default:
      return state;
  }
};
