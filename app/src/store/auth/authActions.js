import * as actionTypes from './authActionTypes';
import { createAction } from '../../utils';
import * as authService from '../../auth/authService';

const handleValidToken = createAction(actionTypes.TOKEN_VALID, 'access', 'refresh');
const handleSuccessfulAuthentication = createAction(
  actionTypes.AUTHENTICATION_SUCCEED,
  'access', 'refresh', 'isKeepingSignedIn'
);

const handleSigningOut = createAction(actionTypes.SIGN_OUT);

export const handleTokenRefreshing = createAction(actionTypes.REFRESH_TOKEN, 'promise');
export const handleSuccessfulRefreshing = createAction(actionTypes.REFRESHING_SUCCEED, 'access');
export const handleFailedRefreshing = createAction(actionTypes.REFRESHING_FAILED, 'error');

export const validateToken = (accessToken, refreshToken) => (dispatch) => authService
  .validateToken(accessToken)
  .then(() => {
    authService.setAccessTokenInStorage(accessToken);
    authService.setRefreshTokenInStorage(refreshToken);

    return dispatch(handleValidToken(accessToken, refreshToken));
  })
  .catch(() => {
    // it prevents uncaught promise rejection error
  });

export const authenticateCustomer = (credentials, isKeepingSignedIn = false) => (dispatch) => authService
  .authenticateCustomer(credentials)
  .then(({ data }) => {
    const { access, refresh } = data;

    authService.setAccessTokenInStorage(access);
    authService.setRefreshTokenInStorage(refresh);

    return dispatch(handleSuccessfulAuthentication(access, refresh, isKeepingSignedIn));
  });

export const createCustomer = (credentials, isKeepingSignedIn = false) => (dispatch) => authService
  .createCustomer(credentials)
  .then(({ data }) => {
    const { access, refresh } = data;

    authService.setAccessTokenInStorage(access);
    authService.setRefreshTokenInStorage(refresh);

    return dispatch(handleSuccessfulAuthentication(access, refresh, isKeepingSignedIn));
  });

export const signOut = () => (dispatch) => {
  dispatch(handleSigningOut());

  authService.setAccessTokenInStorage(null);
  authService.setRefreshTokenInStorage(null);
};
