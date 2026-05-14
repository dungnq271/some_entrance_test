import { expect, describe, it } from 'vitest';
import mostFrequentStringLengths from '.';

describe('mostFrequentStringLengths works correctly', () => {
  it('returns empty array if the input array is empty', () => {
    expect(mostFrequentStringLengths([])).toEqual([]);
  });

  it('returns array of one string if the input array has only one string', () => {
    expect(mostFrequentStringLengths(['abc'])).toEqual(['abc']);
  });

  it('returns the array if all the strings in the array have equal length', () => {
    const arr = ['abc', 'def', 'ghi'];
    expect(mostFrequentStringLengths(arr)).toEqual(arr);
  });

  it('returns the most frequent string lengths in the input array', () => {
    let arr = ['a', 'ab', 'abc', 'cd', 'def', 'gh'];
    expect(mostFrequentStringLengths(arr)).toEqual(['ab', 'cd', 'gh']);
  });

  it('returns the array of the first most frequent string lengths if there are 2 or more most frequent string lengths in the input array', () => {
    let arr = ['a', 'b', 'cd', 'e', 'gh', 'ij'];
    expect(mostFrequentStringLengths(arr)).toEqual(['a', 'b', 'e']);
  });
});
