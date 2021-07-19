import itemsReducer from './itemsReducer';
import * as actionTypes from './itemsActionTypes';

describe('Parts Reducer', () => {
  it('should update state if items are fetching', () => {
    const action = { type: actionTypes.FETCH_ITEMS_REQUESTED };
    const { arePartsFetching, items } = itemsReducer(undefined, action);
    expect(arePartsFetching).toBe(true);
    expect(items).toEqual({});
  });

  it('should update state if fetch was resolved', () => {
    const items = [{ id: 'itemId', po: 'poId1', name: 'First part' }];
    const action = { type: actionTypes.FETCH_ITEMS_SUCCEED, items };
    const state = itemsReducer({ arePartsFetching: true }, action);
    expect(state.arePartsFetching).toBe(false);
    expect(state.items).toEqual({
      poId1: [items[0]],
    });
  });

  it('should update state if fetch was rejected', () => {
    const action = { type: actionTypes.FETCH_ITEMS_FAILED };
    const { arePartsFetching } = itemsReducer({ arePartsFetching: true }, action);
    expect(arePartsFetching).toBe(false);
  });
});
