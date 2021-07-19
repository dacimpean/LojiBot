import * as actionTypes from './layoutActionTypes';
import { createAction } from '../../utils';

export const toggleSidebar = createAction(actionTypes.TOGGLE_SIDEBAR);
export const updateTitle = createAction(actionTypes.UPDATE_TITLE, 'title');
export const changeSubNavigation = createAction(actionTypes.CHANGE_SUB_NAVIGATION, 'subNavigationType');
