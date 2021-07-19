import { concat } from 'lodash';

import * as actionTypes from './userActionTypes';
import { createReducer } from '../../utils';

const initialState = {
  user: null,
  members: [],
  invitedUsers: [],
};

export default createReducer(initialState, {
  [actionTypes.ACTIVE_USER_UPDATED]: (state, action) => ({
    ...state,
    user: action.user,
  }),
  [actionTypes.FETCH_TEAM_MEMBERS_SUCCEED]: (state, action) => ({
    ...state,
    members: action.members,
  }),
  [actionTypes.FETCH_INVITED_USERS_SUCCEED]: (state, action) => ({
    ...state,
    invitedUsers: action.invitedUsers,
  }),
  [actionTypes.ADD_TEAM_MEMBER_SUCCEED]: (state, action) => ({
    ...state,
    invitedUsers: concat(state.invitedUsers, action.invitedUser),
  }),
});
