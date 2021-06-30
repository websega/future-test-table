import {
  ActionFiltersType,
  SET_FILTERS,
  CLEAR_FILTERS,
} from '../actions/filters/types';

const initialState = {
  gender: '',
  nationality: '',
  search: '',
};

export type FilterFieldType = keyof typeof initialState;

type InitialStateType = Record<FilterFieldType, string>;

export const filtersReducer = (
  state: InitialStateType = initialState,
  action: ActionFiltersType
): InitialStateType => {
  switch (action.type) {
    case SET_FILTERS: {
      const { field, value } = action.payload;

      return {
        ...state,
        [field]: value,
      };
    }

    case CLEAR_FILTERS:
      return initialState;

    default:
      return state;
  }
};
