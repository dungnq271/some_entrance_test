import { expect, describe, it } from 'vitest';
import sumTopTwoIntegers from '.';

describe('sumTopTwoIntegers works correctly', () => {
  it('returns undefined if there is no integer in the array', () => {
    expect(sumTopTwoIntegers(['a', '1', 'de', 'f', '23'])).toBe(undefined);
  });

  it('returns undefined if there is only one integer in the array', () => {
    expect(sumTopTwoIntegers(['a', 'bc', 1, 'f', '12'])).toBe(undefined);
  });

  it('returns the sum of top 2 integers even if they are equal', () => {
    expect(sumTopTwoIntegers(['a', 2, 1, 5, 3, 5, 'f'])).toBe(10);
  });

  it('returns the sum of top 2 integers in normal cases', () => {
    expect(sumTopTwoIntegers([1, 4, 2, 3, 5])).toBe(9);
  });
});
