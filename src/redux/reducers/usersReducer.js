import {
  FETCH_USERS_FAILURE,
  FETCH_USERS_LOADED,
  FETCH_USERS_REQUESTED,
  TOGGLE_DATA_COLLECTION,
  SORT_USERS,
} from '../actions/actionTypes';

const initialState = {
  users: [],
  loading: false,
  error: null,
  isSortAsc: true,
  isBigCollection: false,
};

const getSortedUsers = (state, key) => {
  const modifier = state.isSortAsc ? 1 : -1;

  const sortedUsers = [...state.users].sort((a, b) => {
    if (a[key] > b[key]) {
      return modifier * 1;
    }

    if (a[key] < b[key]) {
      return modifier * -1;
    }

    return 0;
  });

  return sortedUsers;
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

    default:
      return state;
  }
};
