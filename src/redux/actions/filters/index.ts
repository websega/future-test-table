import { FilterFieldType } from '../../reducers/filters';
import { ActionFiltersType, CLEAR_FILTERS, SET_FILTERS } from './types';

export const setFilters = (
  field: FilterFieldType,
  value: string
): ActionFiltersType => ({
  type: SET_FILTERS,
  payload: { field, value },
});

export const clearFilters = (): ActionFiltersType => ({
  type: CLEAR_FILTERS,
});
