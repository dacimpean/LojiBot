import * as actionTypes from './authActionTypes';
import { createReducer } from '../../utils';

const initialState = {
  accessToken: null,
  refreshToken: null,
  refreshingTokenPromise: null,
  isKeepingSignedIn: false,
};

export default createReducer(initialState, {
  [actionTypes.TOKEN_VALID]: (state, action) => ({
    ...state,
    accessToken: action.access,
    refreshToken: action.refresh,
  }),

  [actionTypes.AUTHENTICATION_SUCCEED]: (state, action) => ({
    ...state,
    accessToken: action.access,
    refreshToken: action.refresh,
    isKeepingSignedIn: action.isKeepingSignedIn,
  }),

  [actionTypes.REFRESH_TOKEN]: (state, action) => ({
    ...state,
    refreshingTokenPromise: action.promise,
  }),

  [actionTypes.REFRESHING_SUCCEED]: (state, action) => ({
    ...state,
    accessToken: action.access,
    refreshingTokenPromise: null,
  }),

  [actionTypes.REFRESHING_FAILED]: (state) => ({
    ...state,
    refreshingTokenPromise: null,
    accessToken: null,
    refreshToken: null,
  }),

  [actionTypes.SIGN_OUT]: () => initialState,
});
