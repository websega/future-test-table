import { RootStateType } from '../redux/reducer';

export const getUsers = (state: RootStateType): any[] => state.users;
export const getFilteredUsers = (state: RootStateType): any[] =>
  state.filteredUsers;
export const getLoading = (state: RootStateType): boolean => state.loading;
export const getSortAsc = (state: RootStateType): boolean => state.isSortAsc;
export const getIsBigCollection = (state: RootStateType): boolean =>
  state.isBigCollection;
