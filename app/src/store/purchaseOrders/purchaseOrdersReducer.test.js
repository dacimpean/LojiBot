import purchaseOrdersReducer from './purchaseOrdersReducer';
import * as actionTypes from './purchaseOrdersActionTypes';

describe('Purchase Orders Reducer', () => {
  it('should indicate that PO data is fetching', () => {
    const action = {
      type: actionTypes.FETCH_PO_REQUESTED,
    };
    const { arePOFetching } = purchaseOrdersReducer(undefined, action);
    expect(arePOFetching).toBe(true);
  });

  it('should update purchase orders', () => {
    const purchaseOrder = { status: 'OA' };
    const action = {
      type: actionTypes.FETCH_PO_SUCCEED,
      purchaseOrders: [purchaseOrder],
    };
    const { purchaseOrders } = purchaseOrdersReducer(undefined, action);
    expect(purchaseOrders).toEqual({
      OA: [purchaseOrder],
    });
  });

  it('should update the state if PO fetch is failed', () => {
    const action = {
      type: actionTypes.FETCH_PO_FAILED,
    };
    const { arePOFetching } = purchaseOrdersReducer({ arePOFetching: true }, action);
    expect(arePOFetching).toBe(false);
  });

  it('should update active filter for purchase orders', () => {
    const payload = { title: 'Due Date', asc: false };
    const action = {
      type: actionTypes.CHANGE_ACTIVE_FILTER,
      activeFilter: payload,
    };
    const { purchaseOrderTableHeadOptions } = purchaseOrdersReducer(undefined, action);
    expect(purchaseOrderTableHeadOptions.activeFilter).toEqual(payload);
  });
});
