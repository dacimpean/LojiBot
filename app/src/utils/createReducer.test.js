import createReducer from './createReducer';

describe('Create Reducer Utility', () => {
  it('should create a new reducer', () => {
    const orderAction = { type: 'NEW_ORDER', orderId: 'orderId1' };
    const initialState = { orderId: 'orderId0' };
    const newReducer = createReducer(initialState, {
      [orderAction.type]: (state, action) => ({ ...state, orderId: action.orderId }),
    });

    expect(newReducer(undefined, orderAction)).toEqual({
      orderId: orderAction.orderId,
    });
  });
});
