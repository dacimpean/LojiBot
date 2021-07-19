import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

import { fetchVendors } from './vendorsActions';
import * as actionTypes from './vendorActionTypes';
import request from '../../utils/request';

jest.mock('../../utils/request');

describe('Vendor Actions', () => {
  const mockStore = configureMockStore([thunk]);

  afterEach(() => {
    request.mockClear();
  });

  describe('fetchVendors', () => {
    const auth = { accessToken: 'accessToken' };

    it('should dispatch actions for successful call for vendors', (done) => {
      const vendors = [{ id: 1, name: 'Test' }];
      const store = mockStore({ auth });
      const expectedActions = [{
        type: actionTypes.FETCH_VENDORS_REQUESTED,
      }, {
        type: actionTypes.FETCH_VENDORS_SUCCEED,
        vendors,
      }];
      request.mockResolvedValue({ data: vendors });
      store.dispatch(fetchVendors()).then(() => {
        expect(request).toHaveBeenCalledWith('get', '/po/vendors/', {}, auth.accessToken);
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
    });

    it('should dispatch an error for failed call', (done) => {
      const store = mockStore({ auth });
      const expectedActions = [{
        type: actionTypes.FETCH_VENDORS_REQUESTED,
      }, {
        type: actionTypes.FETCH_VENDORS_FAILED,
      }];
      request.mockRejectedValue({});
      store.dispatch(fetchVendors()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
    });
  });
});
