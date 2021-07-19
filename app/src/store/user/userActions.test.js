import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

import * as actionTypes from './userActionTypes';
import { inviteTeamMember, fetchTeamMembers, fetchInvitedUsers } from './userActions';
import request from '../../utils/request';

jest.mock('../../utils/request');

describe('User Actions', () => {
  let auth;
  let mockedStore;

  beforeEach(() => {
    auth = { accessToken: 'access' };
    mockedStore = configureMockStore([thunk])({ auth });
  });

  describe('inviteTeamMember', () => {
    it('should send invitation and dispatch actions', (done) => {
      const invitedUser = { id: 'invitedUserId1', email: 'in@test.com' };
      const expectedActions = [{
        type: actionTypes.ADD_TEAM_MEMBER_REQUESTED,
      }, {
        type: actionTypes.ADD_TEAM_MEMBER_SUCCEED,
        invitedUser,
      }];
      request.mockResolvedValue({ data: invitedUser });
      mockedStore.dispatch(inviteTeamMember('test@test.test')).then(() => {
        expect(request).toHaveBeenCalledWith(
          'post', '/user/teaminvite/', { email: 'test@test.test' }, auth.accessToken
        );
        expect(mockedStore.getActions()).toEqual(expectedActions);
        done();
      });
    });

    it('should dispatch actions if inviting failed', (done) => {
      const expectedActions = [{
        type: actionTypes.ADD_TEAM_MEMBER_REQUESTED,
      }, {
        type: actionTypes.ADD_TEAM_MEMBER_FAILED,
      }];
      request.mockRejectedValue({});
      mockedStore.dispatch(inviteTeamMember('bademail')).then(() => {
        expect(mockedStore.getActions()).toEqual(expectedActions);
        done();
      });
    });
  });

  describe('fetchTeamMembers', () => {
    it('should fetch members and dispatch actions', (done) => {
      const expectedActions = [{
        type: actionTypes.FETCH_TEAM_MEMBERS_REQUESTED,
      }, {
        type: actionTypes.FETCH_TEAM_MEMBERS_SUCCEED,
        members: [],
      }];
      request.mockResolvedValue({ data: [] });
      mockedStore.dispatch(fetchTeamMembers()).then(() => {
        expect(request).toHaveBeenCalledWith('get', '/user/teammembers/', {}, auth.accessToken);
        expect(mockedStore.getActions()).toEqual(expectedActions);
        done();
      });
    });

    it('should dispatch if the fetch is failed', (done) => {
      const expectedActions = [{
        type: actionTypes.FETCH_TEAM_MEMBERS_REQUESTED,
      }, {
        type: actionTypes.FETCH_TEAM_MEMBERS_FAILED,
      }];
      request.mockRejectedValue({});
      mockedStore.dispatch(fetchTeamMembers()).then(() => {
        expect(mockedStore.getActions()).toEqual(expectedActions);
        done();
      });
    });
  });

  describe('fetchInvitedUsers', () => {
    it('should fetch invited users and dispatch actions', (done) => {
      const expectedActions = [{
        type: actionTypes.FETCH_INVITED_USERS_REQUESTED,
      }, {
        type: actionTypes.FETCH_INVITED_USERS_SUCCEED,
        invitedUsers: [],
      }];
      request.mockResolvedValue({ data: [] });
      mockedStore.dispatch(fetchInvitedUsers()).then(() => {
        expect(request).toHaveBeenCalledWith('get', '/user/invitedusers/', {}, auth.accessToken);
        expect(mockedStore.getActions()).toEqual(expectedActions);
        done();
      });
    });

    it('should dispatch if the fetch is failed', (done) => {
      const expectedActions = [{
        type: actionTypes.FETCH_INVITED_USERS_REQUESTED,
      }, {
        type: actionTypes.FETCH_INVITED_USERS_FAILED,
      }];
      request.mockRejectedValue({});
      mockedStore.dispatch(fetchInvitedUsers()).then(() => {
        expect(mockedStore.getActions()).toEqual(expectedActions);
        done();
      });
    });
  });
});
