import layoutReducer from './layoutReducer';
import * as actionTypes from './layoutActionTypes';
import * as subNavigationTypes from './layoutSubNavigationTypes';

describe('Layout Reducer', () => {
  it('should toggle sidebar state', () => {
    const action = { type: actionTypes.TOGGLE_SIDEBAR };
    const { isSidebarCollapsed } = layoutReducer(undefined, action);
    expect(isSidebarCollapsed).toBe(true);
  });

  it('should update layout title', () => {
    const action = { type: actionTypes.UPDATE_TITLE, title: 'newTitle' };
    const { title } = layoutReducer(undefined, action);
    expect(title).toBe('newTitle');
  });

  it('should change sub navigation type', () => {
    const action = {
      type: actionTypes.CHANGE_SUB_NAVIGATION,
      subNavigationType: subNavigationTypes.PURCHASE_ORDERS,
    };
    const { subNavigationType } = layoutReducer(undefined, action);
    expect(subNavigationType).toBe(subNavigationTypes.PURCHASE_ORDERS);
  });
});
