import purchaseOrdersReducer from './purchaseOrdersReducer';
import * as actionTypes from './purchaseOrdersActionTypes';

describe('Purchase Orders Reducer', () => {
  it('should update purchase orders', () => {
    const purchaseOrder = { status: 'OA' };
    const action = {
      type: actionTypes.FETCHING_PO_SUCCEED,
      purchaseOrders: [purchaseOrder],
    };
    expect(purchaseOrdersReducer(undefined, action)).toEqual({
      purchaseOrders: {
        OA: [purchaseOrder],
      },
      vendors: {},
    });
  });

  it('should update vendors', () => {
    const vendors = [{ id: 'vendorId', name: 'vendorName' }];
    const action = {
      type: actionTypes.FETCHING_VENDORS_SUCCEED,
      vendors,
    };
    expect(purchaseOrdersReducer(undefined, action)).toEqual({
      purchaseOrders: {},
      vendors: {
        [vendors[0].id]: vendors[0],
      },
    });
  });
});
