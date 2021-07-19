import vendorReducer from './vendorsReducer';
import * as actionTypes from './vendorActionTypes';

describe('Vendors Reducer', () => {
  it('should update state when data is fetching', () => {
    const action = { type: actionTypes.FETCH_VENDORS_REQUESTED };
    const { areVendorsFetching: initialValue } = vendorReducer(undefined, {});
    expect(initialValue).toBe(false);
    const { areVendorsFetching } = vendorReducer(undefined, action);
    expect(areVendorsFetching).toBe(true);
  });

  it('should update state when date is loaded', () => {
    const action = {
      type: actionTypes.FETCH_VENDORS_SUCCEED,
      vendors: [{ id: 1, name: 'Test' }],
    };
    const state = vendorReducer(undefined, action);
    expect(state).toEqual({
      areVendorsFetching: false,
      vendors: {
        1: { id: 1, name: 'Test' },
      },
    });
  });

  it('should update state if fetching failed', () => {
    const action = {
      type: actionTypes.FETCH_VENDORS_FAILED,
    };
    const { areVendorsFetching } = vendorReducer({ areVendorsFetching: true }, action);
    expect(areVendorsFetching).toBe(false);
  });
});
