import { FormikValuesType } from '../../components/AddRowForm/AddRowForm';
import {
  ActionUsersTypes,
  ADD_USER,
  FETCH_USERS_FAILURE,
  FETCH_USERS_LOADED,
  FETCH_USERS_REQUESTED,
  SORT_USERS,
  TOGGLE_DATA_COLLECTION,
  TOOGLE_VISIBLE_ADD_ROW,
  UserType,
} from '../actions/users/types';

const initialState = {
  users: [],
  loading: false,
  error: null,
  isSortAsc: true,
  isBigCollection: false,
  visibleAddRow: false,
  nationalities: [],
};

type InitialStateType = {
  users: UserType[];
  loading: boolean;
  error: null | string;
  isSortAsc: boolean;
  isBigCollection: boolean;
  visibleAddRow: boolean;
  nationalities: string[];
};

export type ColumnNameType =
  | 'id'
  | 'firstName'
  | 'lastName'
  | 'email'
  | 'phone'
  | 'gender'
  | 'nationality';

const compareValue = (
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

      return modifier * compareValue(nameA, nameB);
    }

    if (key === 'lastName') {
      const nameA = a.name.last;
      const nameB = b.name.last;

      return modifier * compareValue(nameA, nameB);
    }

    if (key === 'id') {
      const nameA = a.id.value;
      const nameB = b.id.value;
      return modifier * compareValue(nameA, nameB);
    }

    if (key === 'nationality') {
      const nameA = a.nat;
      const nameB = b.nat;
      return modifier * compareValue(nameA, nameB);
    }

    return modifier * compareValue(a[key], b[key]);
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

const getNationalitites = (users: UserType[]) => {
  return Array.from(new Set(users.map((user) => user.nat)));
};

export const usersReducer = (
  state: InitialStateType = initialState,
  action: ActionUsersTypes
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
        loading: false,
        nationalities: getNationalitites(action.payload),
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
