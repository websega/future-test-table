import { UserType } from '../redux/actions/users/types';
import { RootStateType } from '../redux/reducers';
import { FiltersType } from '../redux/reducers/filters';

export const getUsers = (state: RootStateType): UserType[] => state.users.users;

export const getLoading = (state: RootStateType): boolean =>
  state.users.loading;

export const getSortAsc = (state: RootStateType): boolean =>
  state.users.isSortAsc;

export const getIsBigCollection = (state: RootStateType): boolean =>
  state.users.isBigCollection;

export const getVisibleAddRow = (state: RootStateType): boolean =>
  state.users.visibleAddRow;

export const getNationalities = (state: RootStateType): string[] =>
  state.users.nationalities;

export const getFilters = (state: RootStateType): FiltersType => state.filters;
