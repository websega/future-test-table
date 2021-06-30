import { combineReducers } from 'redux';

import { usersReducer } from './users';
import { filtersReducer } from './filters';

export const rootReducer = combineReducers({
  users: usersReducer,
  filters: filtersReducer,
});

export type RootStateType = ReturnType<typeof rootReducer>;
