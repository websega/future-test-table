import { FormikValuesType } from '../../../components/AddRowForm/AddRowForm';
import { ColumnNameType } from '../../reducers/users';

export const FETCH_USERS_REQUESTED = 'FETCH_USERS_REQUSTED';
export const FETCH_USERS_LOADED = 'FETCH_USERS_LOADED';
export const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';
export const SORT_USERS = 'SORT_USERS';
export const TOGGLE_DATA_COLLECTION = 'TOGGLE_DATA_COLLECTION';
export const ADD_USER = 'ADD_USER';
export const TOOGLE_VISIBLE_ADD_ROW = 'TOOGLE_VISIBLE_ADD_ROW';

export interface Name {
  title: string;
  first: string;
  last: string;
}

export interface Coordinates {
  latitude: string;
  longitude: string;
}

export interface Timezone {
  offset: string;
  description: string;
}

export interface Street {
  number: number;
  name: string;
}

export interface Location {
  street: Street;
  city: string;
  state: string;
  postcode: string;
  coordinates: Coordinates;
  timezone: Timezone;
}

export interface Id {
  name: string;
  value: string;
}

export interface UserType {
  gender: string;
  name: Name;
  location: Location;
  email: string;
  phone: string;
  id: Id;
  nat: string;
}

type ActionFetchUsersRequsted = { type: typeof FETCH_USERS_REQUESTED };

type ActionFetchUsersLoaded = {
  type: typeof FETCH_USERS_LOADED;
  payload: UserType[];
};

type ActionFetchUsersFailure = {
  type: typeof FETCH_USERS_FAILURE;
  payload: string | null;
};

type ActionSortUsers = { type: typeof SORT_USERS; payload: ColumnNameType };

type ActionToggleDataCollection = { type: typeof TOGGLE_DATA_COLLECTION };

type ActionAddUsers = { type: typeof ADD_USER; payload: FormikValuesType };

type ActionToogleAddRow = { type: typeof TOOGLE_VISIBLE_ADD_ROW };

export type ActionUsersTypes =
  | ActionFetchUsersRequsted
  | ActionFetchUsersLoaded
  | ActionFetchUsersFailure
  | ActionSortUsers
  | ActionToggleDataCollection
  | ActionAddUsers
  | ActionToogleAddRow;
