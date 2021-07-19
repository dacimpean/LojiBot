import * as actionTypes from './layoutActionTypes';
import { createReducer } from '../../utils';

const initialState = {
  isSidebarCollapsed: false,
  title: 'Loji',
};

export default createReducer(initialState, {
  [actionTypes.TOGGLE_SIDEBAR]: ({ isSidebarCollapsed, ...state }) => ({
    ...state,
    isSidebarCollapsed: !isSidebarCollapsed,
  }),

  [actionTypes.UPDATE_TITLE]: (state, action) => ({
    ...state,
    title: action.title,
  }),
});
