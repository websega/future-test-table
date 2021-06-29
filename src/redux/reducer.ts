import {
  FETCH_USERS_FAILURE,
  FETCH_USERS_LOADED,
  FETCH_USERS_REQUESTED,
  TOGGLE_DATA_COLLECTION,
  SORT_USERS,
  FILTER_USERS,
  ADD_USER,
  ActionTypes,
  TOOGLE_VISIBLE_ADD_ROW,
  UserType,
} from './actions/types';

const initialState = {
  users: [],
  filteredUsers: [],
  loading: false,
  error: null,
  isSortAsc: true,
  isBigCollection: false,
  visibleAddRow: false,
};

type InitialStateType = {
  users: UserType[];
  filteredUsers: UserType[];
  loading: boolean;
  error: null | string;
  isSortAsc: boolean;
  isBigCollection: boolean;
  visibleAddRow: boolean;
};

export type ColumnNameType =
  | 'id'
  | 'firstName'
  | 'lastName'
  | 'email'
  | 'phone';

const getSortedUsers = (state: InitialStateType, key: ColumnNameType) => {
  const modifier = state.isSortAsc ? 1 : -1;

  return [...state.users].sort((a, b) => {
    if (a[key] > b[key]) {
      return modifier * 1;
    }

    if (a[key] < b[key]) {
      return modifier * -1;
    }

    return 0;
  });
};

const filterUsers = (state: InitialStateType, searchStr: string) => {
  if (searchStr.trim() === '') {
    return [];
  }

  const lowerCaseStr = searchStr.trim().toLowerCase();

  return state.users.filter((user) => {
    const { id, firstName, lastName, email, phone } = user;

    if (
      id === lowerCaseStr ||
      firstName.toLowerCase().match(lowerCaseStr) ||
      lastName.toLowerCase().match(lowerCaseStr) ||
      email.toLowerCase().match(lowerCaseStr) ||
      phone.toLowerCase().match(lowerCaseStr)
    ) {
      return true;
    }

    return false;
  });
};

export const reducer = (
  state: InitialStateType = initialState,
  action: ActionTypes
): InitialStateType => {
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
    case ADD_USER:
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    case TOOGLE_VISIBLE_ADD_ROW:
      return {
        ...state,
        visibleAddRow: !state.visibleAddRow,
      };

    default:
      return state;
  }
};

export type RootStateType = ReturnType<typeof reducer>;
