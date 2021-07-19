import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

import * as actionTypes from './itemsActionTypes';
import { fetchPOItems } from './itemsActions';
import request from '../../utils/request';

jest.mock('../../utils/request');

describe('Parts Actions', () => {
  const mockStore = configureMockStore([thunk]);

  describe('fetchParts', () => {
    const auth = { accessToken: 'access' };

    it('should fetch parts and dispatch an action if the call is resolved', (done) => {
      const items = [{ id: 3, name: 'Second Part' }];
      const store = mockStore({ auth });
      const expectedActions = [{
        type: actionTypes.FETCH_ITEMS_REQUESTED,
      }, {
        type: actionTypes.FETCH_ITEMS_SUCCEED,
        items,
      }];
      request.mockResolvedValue({ data: items });
      store.dispatch(fetchPOItems('purchaseOrderId1')).then(() => {
        expect(request).toHaveBeenCalledWith(
          'get',
          '/po/purchaseorderitems/',
          { filter_po: 'purchaseOrderId1' },
          auth.accessToken
        );
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
    });

    it('should dispatch an action if the call is rejected', (done) => {
      const store = mockStore({ auth });
      const expectedActions = [{
        type: actionTypes.FETCH_ITEMS_REQUESTED,
      }, {
        type: actionTypes.FETCH_ITEMS_FAILED,
      }];
      request.mockRejectedValue({});
      store.dispatch(fetchPOItems()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
    });
  });
});
