/* eslint import/first: 0 */
import { configureStore } from '@reduxjs/toolkit';
import _ from 'lodash';
import rootReducer from './reducers';

const setupStore = () => {
  const store = configureStore({
    reducer: rootReducer,
    devTools: true,
  });
  return store;
};

export default setupStore;
