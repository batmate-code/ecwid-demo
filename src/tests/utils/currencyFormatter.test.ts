import { formatCurrency } from '@/utils';

describe('formatCurrency', () => {
  it('formats integer dollars', () => {
    expect(formatCurrency(0)).toBe('$0.00');
    expect(formatCurrency(1)).toBe('$1.00');
    expect(formatCurrency(1000)).toBe('$1,000.00');
  });

  it('formats fractional dollars with rounding', () => {
    expect(formatCurrency(19.95)).toBe('$19.95');
    expect(formatCurrency(19.955)).toBe('$19.96');
  });

  it('formats negative values', () => {
    expect(formatCurrency(-5)).toBe('-$5.00');
    expect(formatCurrency(-1234.56)).toBe('-$1,234.56');
  });
});
