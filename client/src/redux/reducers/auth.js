/* eslint no-param-reassign: 0 */
import _ from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
import WrappedUser from '@schemas/User';
import API from '@services/api';

const initialState = {
  isLoading: false,
  error: null,
  // Mocked user
  user: new WrappedUser({
    id: '123',
    email: 'john@example.com',
  }),
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    start: (state) => {
      return {
        ...state,
        isLoading: true,
        user: null,
      };
    },
    success: (state, action) => {
      return {
        ...state,
        isLoading: false,
        user: new WrappedUser(action.payload.user),
      };
    },
    failure: (state, action) => {
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
        user: null,
      };
    },
    refresh: (state, action) => {
      return {
        ...state,
        user: new WrappedUser(action.payload),
      };
    },
    logout: (state) => {
      return {
        ...state,
        isLoading: false,
        user: null,
      };
    },
  },
});

const { actions, reducer } = slice;

export const start = () => async (dispatch) => {
  dispatch(actions.start());
};

export const authenticate = (identity, options = {}) => async (dispatch) => {
  try {
    const { data: user } = await API.users.me();
    dispatch(actions.success({ user, identity }));
  } catch (error) {
    dispatch(actions.failure({ error }));
    if (options.onError) {
      console.log('[redux/auth/authenticate] onError:', error);
      options.onError(error);
    }
  }
};

export const refreshUser = (options = {}) => async (dispatch) => {
  try {
    const { data: user } = await API.users.me();
    dispatch(actions.refresh(user));
  } catch (error) {
    dispatch(actions.failure({ error }));
    if (options.onError) options.onError(error);
  }
};

export const fail = (error) => async (dispatch) => {
  dispatch(actions.failure({ error }));
};

export const logout = () => async (dispatch) => {
  dispatch(actions.logout());
};

export default reducer;
