import {
  FETCH_USERS_FAILURE,
  FETCH_USERS_LOADED,
  FETCH_USERS_REQUESTED,
  SORT_USERS,
} from '../actions/actionTypes';

const initialState = {
  users: [],
  loading: false,
  error: null,
  isSortAsc: true,
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
        loading: false,
        users: action.payload,
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

    default:
      return state;
  }
};
