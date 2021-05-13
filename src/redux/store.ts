import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import { reducer } from './reducer';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const setupStore = () => {
  if (process.env.NODE_ENV !== 'production') {
    return createStore(
      reducer,
      composeEnhancers(applyMiddleware(logger, thunk))
    );
  }
  return createStore(reducer, applyMiddleware(thunk));
};

const store = setupStore();

export default store;
