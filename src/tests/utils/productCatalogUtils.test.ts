import { splitCategoryPathToSlugs } from '@/pages/ProductsCatalog/utils';

describe('splitCategoryPathToSlugs', () => {
  it('returns empty array when path is undefined', () => {
    expect(splitCategoryPathToSlugs(undefined)).toEqual([]);
  });

  it('returns empty array for empty string or only slashes', () => {
    expect(splitCategoryPathToSlugs('')).toEqual([]);
    expect(splitCategoryPathToSlugs('/')).toEqual([]);
    expect(splitCategoryPathToSlugs('///')).toEqual([]);
  });

  it('splits a simple path into segments', () => {
    expect(splitCategoryPathToSlugs('electronics/phones/smartphones')).toEqual([
      'electronics',
      'phones',
      'smartphones',
    ]);
  });

  it('ignores extra slashes between segments', () => {
    expect(splitCategoryPathToSlugs('electronics//phones///smartphones')).toEqual([
      'electronics',
      'phones',
      'smartphones',
    ]);
  });

  it('removes leading and trailing slashes', () => {
    expect(splitCategoryPathToSlugs('/electronics/phones/smartphones/')).toEqual([
      'electronics',
      'phones',
      'smartphones',
    ]);
  });

  it('preserves inner whitespace (no trimming performed)', () => {
    expect(splitCategoryPathToSlugs(' electronics/phones /smart ')).toEqual([
      ' electronics',
      'phones ',
      'smart ',
    ]);
  });
});
