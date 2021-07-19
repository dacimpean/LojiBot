import authReducer from './authReducer';
import * as actionTypes from './authActionTypes';

describe('Auth Reducer', () => {
  it('should update tokens if validation succeed', () => {
    const action = { type: actionTypes.TOKEN_VALID, access: 'access', refresh: 'refresh' };
    expect(authReducer(undefined, action)).toEqual({
      accessToken: 'access',
      refreshToken: 'refresh',
      refreshingTokenPromise: null,
      isKeepingSignedIn: false,
    });
  });

  it('should update tokens after authentication', () => {
    const action = {
      type: actionTypes.AUTHENTICATION_SUCCEED, access: 'access', refresh: 'refresh', isKeepingSignedIn: true,
    };
    expect(authReducer(undefined, action)).toEqual({
      accessToken: 'access',
      refreshToken: 'refresh',
      refreshingTokenPromise: null,
      isKeepingSignedIn: true,
    });
  });

  it('should set refresh token promise during its validation', () => {
    const action = { type: actionTypes.REFRESH_TOKEN, promise: {} };
    expect(authReducer(undefined, action)).toEqual({
      accessToken: null,
      refreshToken: null,
      refreshingTokenPromise: {},
      isKeepingSignedIn: false,
    });
  });

  it('should update access token if refresh token was valid', () => {
    const action = { type: actionTypes.REFRESHING_SUCCEED, access: 'access' };
    expect(authReducer({
      accessToken: 'old',
      refreshToken: 'refresh',
      refreshingTokenPromise: {},
      isKeepingSignedIn: false,
    }, action)).toEqual({
      accessToken: 'access',
      refreshToken: 'refresh',
      refreshingTokenPromise: null,
      isKeepingSignedIn: false,
    });
  });

  it('should drop refresh promise if refreshing failed', () => {
    const action = { type: actionTypes.REFRESHING_FAILED };
    expect(authReducer({
      accessToken: 'old',
      refreshToken: 'refresh',
      refreshingTokenPromise: {},
      isKeepingSignedIn: false,
    }, action)).toEqual({
      accessToken: null,
      refreshToken: null,
      refreshingTokenPromise: null,
      isKeepingSignedIn: false,
    });
  });

  it('should set initial state on sign out', () => {
    const action = { type: actionTypes.SIGN_OUT };
    expect(authReducer({
      accessToken: 'access',
      refreshToken: 'refresh',
      refreshingTokenPromise: null,
      isKeepingSignedIn: true,
    }, action)).toEqual({
      accessToken: null,
      refreshToken: null,
      refreshingTokenPromise: null,
      isKeepingSignedIn: false,
    });
  });
});
