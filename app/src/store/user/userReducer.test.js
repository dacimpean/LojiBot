import * as actionTypes from './userActionTypes';
import userReducer from './userReducer';

describe('User Reducer', () => {
  it('should store active user after signup or signin', () => {
    const user = { email: 'test@test.test', username: 'test', isManage: true };
    const action = { type: actionTypes.ACTIVE_USER_UPDATED, user };
    const state = userReducer(undefined, action);
    expect(state.user).toEqual(user);
  });

  it('should store just invited user', () => {
    const invitedUser = { id: 'invitedUserId2', email: 'tes@ts.test' };
    const action = { type: actionTypes.ADD_TEAM_MEMBER_SUCCEED, invitedUser };
    const state = userReducer(undefined, action);
    expect(state.invitedUsers).toEqual([invitedUser]);
  });

  it('should store team members', () => {
    const members = [{ id: 'teamMemberId1', email: 'test@test.test' }];
    const action = { type: actionTypes.FETCH_TEAM_MEMBERS_SUCCEED, members };
    const state = userReducer(undefined, action);
    expect(state.members).toEqual(members);
  });

  it('should store invited users (pre registered members)', () => {
    const invitedUsers = [{ id: 'invitedUserId0', email: 'invited@test.test' }];
    const action = { type: actionTypes.FETCH_INVITED_USERS_SUCCEED, invitedUsers };
    const state = userReducer(undefined, action);
    expect(state.invitedUsers).toEqual(invitedUsers);
  });
});
