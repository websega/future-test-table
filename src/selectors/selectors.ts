import { UserType } from '../redux/actions/types';
import { RootStateType } from '../redux/reducer';

export const getUsers = (state: RootStateType): UserType[] => state.users;

export const getFilteredUsers = (state: RootStateType): UserType[] =>
  state.filteredUsers;

export const getLoading = (state: RootStateType): boolean => state.loading;

export const getSortAsc = (state: RootStateType): boolean => state.isSortAsc;

export const getIsBigCollection = (state: RootStateType): boolean =>
  state.isBigCollection;

export const getVisibleAddRow = (state: RootStateType): boolean =>
  state.visibleAddRow;
