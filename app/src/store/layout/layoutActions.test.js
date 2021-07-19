import { toggleSidebar, updateTitle, changeSubNavigation } from './layoutActions';
import * as actionTypes from './layoutActionTypes';
import * as subNavigationTypes from './layoutSubNavigationTypes';

describe('Layout Actions', () => {
  describe('toggleSidebar', () => {
    it('should create an action for toggling the sidebar', () => {
      expect(toggleSidebar()).toEqual({
        type: actionTypes.TOGGLE_SIDEBAR,
      });
    });
  });

  describe('updateTitle', () => {
    it('should create an action with new title', () => {
      expect(updateTitle('newTitle')).toEqual({
        type: actionTypes.UPDATE_TITLE,
        title: 'newTitle',
      });
    });
  });

  describe('changeSubNavigation', () => {
    it('should creat an action with new sub navigation type', () => {
      expect(changeSubNavigation(subNavigationTypes.PURCHASE_ORDERS)).toEqual({
        type: actionTypes.CHANGE_SUB_NAVIGATION,
        subNavigationType: subNavigationTypes.PURCHASE_ORDERS,
      });
    });
  });
});
