import * as actionTypes from './userActionTypes';
import { request } from '../../utils';

export const inviteTeamMember = (email) => (dispatch, getState) => {
  const { auth } = getState();

  dispatch({ type: actionTypes.ADD_TEAM_MEMBER_REQUESTED });
  return request('post', '/user/teaminvite/', { email }, auth.accessToken)
    .then(({ data }) => dispatch({ type: actionTypes.ADD_TEAM_MEMBER_SUCCEED, invitedUser: data }))
    .catch(() => dispatch({ type: actionTypes.ADD_TEAM_MEMBER_FAILED }));
};

export const fetchTeamMembers = () => (dispatch, getState) => {
  const { auth } = getState();

  dispatch({ type: actionTypes.FETCH_TEAM_MEMBERS_REQUESTED });
  return request('get', '/user/teammembers/', {}, auth.accessToken)
    .then(({ data }) => dispatch({ type: actionTypes.FETCH_TEAM_MEMBERS_SUCCEED, members: data }))
    .catch(() => dispatch({ type: actionTypes.FETCH_TEAM_MEMBERS_FAILED }));
};

export const fetchInvitedUsers = () => (dispatch, getState) => {
  const { auth } = getState();

  dispatch({ type: actionTypes.FETCH_INVITED_USERS_REQUESTED });
  return request('get', '/user/invitedusers/', {}, auth.accessToken)
    .then(({ data }) => dispatch({ type: actionTypes.FETCH_INVITED_USERS_SUCCEED, invitedUsers: data }))
    .catch(() => dispatch({ type: actionTypes.FETCH_INVITED_USERS_FAILED }));
};
