import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

import * as actionTypes from './purchaseOrdersActionTypes';
import { changeActiveFilter, fetchPurchaseOrders } from './purchaseOrdersActions';
import request from '../../utils/request';

jest.mock('../../utils/request');

describe('Purchase Order Actions', () => {
  const mockStore = configureMockStore([thunk]);

  afterEach(() => {
    request.mockClear();
  });

  describe('changeActiveFilter', () => {
    it('should create action for active filter', () => {
      const filter = { title: 'Vendor', asc: false };
      expect(changeActiveFilter(filter)).toEqual({
        type: actionTypes.CHANGE_ACTIVE_FILTER,
        activeFilter: filter,
      });
    });
  });

  describe('fetchPurchaseOrders', () => {
    const auth = { accessToken: 'accessToken' };

    it('should dispatch actions for successful call for purchase orders', (done) => {
      const purchaseOrders = [{ id: 2, status: 'OA' }];
      const store = mockStore({ auth });
      const expectedActions = [{
        type: actionTypes.FETCH_PO_REQUESTED,
      }, {
        type: actionTypes.FETCH_PO_SUCCEED,
        purchaseOrders,
      }];
      request.mockResolvedValue({ data: purchaseOrders });
      store.dispatch(fetchPurchaseOrders()).then(() => {
        expect(request).toHaveBeenCalledWith('get', '/po/purchaseorders/', {}, auth.accessToken);
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
    });

    it('should dispatch an error for failed call for purchase orders', (done) => {
      const store = mockStore({ auth });
      const expectedActions = [{
        type: actionTypes.FETCH_PO_REQUESTED,
      }, {
        type: actionTypes.FETCH_PO_FAILED,
      }];
      request.mockRejectedValue({});
      store.dispatch(fetchPurchaseOrders()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
    });
  });
});
