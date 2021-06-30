import { FilterFieldType } from '../../reducers/filters';

export const SET_FILTERS = 'SET_FILTERS';
export const CLEAR_FILTERS = 'CLEAR_FILTERS';

type ActionSetFilters = {
  type: typeof SET_FILTERS;
  payload: { field: FilterFieldType; value: string };
};

type ActionClearFilters = {
  type: typeof CLEAR_FILTERS;
};

export type ActionFiltersType = ActionSetFilters | ActionClearFilters;
