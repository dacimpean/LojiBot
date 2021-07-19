import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import {
  handleTokenRefreshing,
  handleSuccessfulRefreshing,
  handleFailedRefreshing,
  validateToken,
  authenticateCustomer,
  createCustomer,
  signOut,
} from './authActions';
import * as actionTypes from './authActionTypes';
import * as authService from '../../auth/authService';
import { ACTIVE_USER_UPDATED } from '../user/userActionTypes';

jest.mock('../../auth/authService');

describe('Auth Actions', () => {
  const mockStore = configureMockStore([thunk]);

  describe('handleTokenRefreshing', () => {
    it('should create action with refresh token promise', () => {
      expect(handleTokenRefreshing({})).toEqual({
        type: actionTypes.REFRESH_TOKEN,
        promise: {},
      });
    });
  });

  describe('handleSuccessfulRefreshing', () => {
    it('should create an action about successful token refresh', () => {
      expect(handleSuccessfulRefreshing('access')).toEqual({
        type: actionTypes.REFRESHING_SUCCEED,
        access: 'access',
      });
    });
  });

  describe('handleFailedRefreshing', () => {
    it('should create an action about failed refreshing', () => {
      expect(handleFailedRefreshing()).toEqual({
        type: actionTypes.REFRESHING_FAILED,
      });
    });
  });

  describe('validateToken', () => {
    it('should dispatch handle successful token validation', (done) => {
      const user = { email: 'test@test.test' };
      const store = mockStore({ accessToken: 'access', refreshToken: 'refresh' });
      const expectedActions = [{
        type: ACTIVE_USER_UPDATED,
        user,
      }, {
        type: actionTypes.TOKEN_VALID,
        access: 'access',
        refresh: 'refresh',
      }];
      authService.validateToken.mockResolvedValue({ data: user });
      store.dispatch(validateToken('access', 'refresh'))
        .then(() => {
          expect(authService.validateToken).toHaveBeenCalledWith('access');
          expect(authService.setAccessTokenInStorage).toHaveBeenCalledWith('access');
          expect(authService.setRefreshTokenInStorage).toHaveBeenCalledWith('refresh');
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });
  });

  describe('authenticateCustomer', () => {
    it('should set created tokens and dispatch successful authentication event', (done) => {
      const store = mockStore({ accessToken: null, refreshToken: null });
      const credentials = {
        username: 'test',
        password: 'test',
      };
      const data = {
        access: 'newAccess',
        refresh: 'newRefresh',
      };
      const expectedActions = [{
        type: actionTypes.AUTHENTICATION_SUCCEED,
        access: data.access,
        refresh: data.refresh,
        isKeepingSignedIn: true,
      }];
      authService.authenticateCustomer.mockResolvedValue({ data });
      store.dispatch(authenticateCustomer(credentials, true))
        .then(() => {
          expect(authService.authenticateCustomer).toHaveBeenCalledWith(credentials);
          expect(authService.setAccessTokenInStorage).toHaveBeenCalledWith(data.access);
          expect(authService.setRefreshTokenInStorage).toHaveBeenCalledWith(data.refresh);
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });
  });

  describe('createCustomer', () => {
    it('should set tokens and dispatch successful registration', (done) => {
      const store = mockStore({ accessToken: null, refreshToken: null });
      const data = {
        access: 'access',
        refresh: 'refresh',
      };
      const credentials = {
        username: 'username',
        email: 'test@test.test',
        password: 'test',
      };
      const expectedActions = [{
        type: actionTypes.AUTHENTICATION_SUCCEED,
        access: data.access,
        refresh: data.refresh,
        isKeepingSignedIn: false,
      }];
      authService.createCustomer.mockResolvedValue({ data });
      store.dispatch(createCustomer(credentials))
        .then(() => {
          expect(authService.createCustomer).toHaveBeenCalledWith(credentials);
          expect(authService.setAccessTokenInStorage).toHaveBeenCalledWith(data.access);
          expect(authService.setRefreshTokenInStorage).toHaveBeenCalledWith(data.refresh);
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });
  });

  describe('signOut', () => {
    it('should drop tokens and dispatch sign out event', () => {
      const store = mockStore({ accessToken: 'access', refreshToken: 'regresh' });
      const expectedActions = [{
        type: actionTypes.SIGN_OUT,
      }];
      store.dispatch(signOut());
      expect(authService.setAccessTokenInStorage).toHaveBeenCalledWith(null);
      expect(authService.setRefreshTokenInStorage).toHaveBeenCalledWith(null);
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
