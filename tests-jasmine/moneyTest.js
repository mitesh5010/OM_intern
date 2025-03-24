import { formatCurrancy } from "../scripts/utils/money.js";

describe('test suite : formatCurrancy', () => {
  it('working with 0', () => {
    expect(formatCurrancy(0)).toEqual('0.00');
  });
  it('test case with nearest rouned number', () => {
    expect(formatCurrancy(2055.5)).toEqual('20.56');
  });
});