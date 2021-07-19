import { numberToPrice } from './billing';

describe('Billing Utils', () => {
  it('should change number to price number', () => {
    expect(numberToPrice(67)).toEqual('67.00');
  });
});
