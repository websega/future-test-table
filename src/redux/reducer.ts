import { FormikValuesType } from '../components/AddRowForm/AddRowForm';
import {
  ActionTypes,
  ADD_USER,
  FETCH_USERS_FAILURE,
  FETCH_USERS_LOADED,
  FETCH_USERS_REQUESTED,
  FILTER_USERS,
  SORT_USERS,
  TOGGLE_DATA_COLLECTION,
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

const sortUsersData = (
  a: Omit<ColumnNameType, 'id' | 'firstName' | 'lastName'> | string,
  b: Omit<ColumnNameType, 'id' | 'firstName' | 'lastName'> | string
): number => {
  if (a > b) {
    return 1;
  }

  if (a < b) {
    return -1;
  }

  return 0;
};

const getSortedUsers = (state: InitialStateType, key: ColumnNameType) => {
  const modifier = state.isSortAsc ? 1 : -1;

  return [...state.users].sort((a, b) => {
    if (key === 'firstName') {
      const nameA = a.name.first;
      const nameB = b.name.first;

      return modifier * sortUsersData(nameA, nameB);
    }

    if (key === 'lastName') {
      const nameA = a.name.last;
      const nameB = b.name.last;

      return modifier * sortUsersData(nameA, nameB);
    }

    if (key === 'id') {
      const nameA = a.id.value;
      const nameB = b.id.value;
      return modifier * sortUsersData(nameA, nameB);
    }

    return modifier * sortUsersData(a[key], b[key]);
  });
};

const filterUsers = (state: InitialStateType, searchStr: string) => {
  if (searchStr.trim() === '') {
    return [];
  }

  const lowerCaseStr = searchStr.trim().toLowerCase();

  return state.users.filter((user) => {
    const { id, name, email, phone } = user;

    if (
      id.value.includes(lowerCaseStr) ||
      name.first.toLowerCase().includes(lowerCaseStr) ||
      name.last.toLowerCase().includes(lowerCaseStr) ||
      email.toLowerCase().includes(lowerCaseStr) ||
      phone.toLowerCase().includes(lowerCaseStr)
    ) {
      return true;
    }

    return false;
  });
};

const addUser = (state: InitialStateType, user: FormikValuesType) => {
  const newUser = {
    gender: '',
    name: {
      title: '',
      first: user.firstName,
      last: user.lastName,
    },
    location: {
      street: {
        number: 0,
        name: '',
      },
      city: '',
      state: '',
      postcode: '',
      coordinates: {
        latitude: '',
        longitude: '',
      },
      timezone: {
        offset: '',
        description: '',
      },
    },
    email: user.email,
    phone: user.phone,
    id: {
      name: '',
      value: user.id,
    },
    nat: '',
  };

  return [...state.users, newUser];
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
        users: addUser(state, action.payload),
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
