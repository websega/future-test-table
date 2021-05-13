export const FETCH_USERS_REQUESTED = 'FETCH_USERS_REQUSTED';
export const FETCH_USERS_LOADED = 'FETCH_USERS_LOADED';
export const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';
export const SORT_USERS = 'SORT_USERS';
export const TOGGLE_DATA_COLLECTION = 'TOGGLE_DATA_COLLECTION';
export const FILTER_USERS = 'FILTER_USERS';
export const ADD_USER = 'ADD_USER';

type ActionFetchUsersRequsted = { type: typeof FETCH_USERS_REQUESTED };
type ActionFetchUsersLoaded = {
  type: typeof FETCH_USERS_LOADED;
  payload: any[];
};
type ActionFetchUsersFailure = {
  type: typeof FETCH_USERS_FAILURE;
  payload: string | null;
};
type ActionSortUsers = { type: typeof SORT_USERS; payload: string };
type ActionToggleDataCollection = { type: typeof TOGGLE_DATA_COLLECTION };
type ActionFilterUsers = { type: typeof FILTER_USERS; payload: string };
type ActionAddUsers = { type: typeof ADD_USER; payload: any };

export type ActionTypes =
  | ActionFetchUsersRequsted
  | ActionFetchUsersLoaded
  | ActionFetchUsersFailure
  | ActionSortUsers
  | ActionToggleDataCollection
  | ActionFilterUsers
  | ActionAddUsers;
