import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { useBuildUrl } from '@/pages/ProductsCatalog/hooks/useBuildUrl';

const TestComponent = ({
  nextPath,
  options,
  testId = 'result',
}: {
  nextPath: string;
  options?: Parameters<ReturnType<typeof useBuildUrl>['buildUrl']>[1];
  testId?: string;
}) => {
  const { buildUrl } = useBuildUrl();
  return <div data-testid={testId}>{buildUrl(nextPath, options)}</div>;
};

const renderWithLocation = (ui: React.ReactElement, initialUrl: string) =>
  render(<MemoryRouter initialEntries={[initialUrl]}>{ui}</MemoryRouter>);

describe('useBuildUrl', () => {
  it('saves current query params when building a new path', () => {
    renderWithLocation(
      <TestComponent nextPath="/catalog" />,
      '/products?query=tea&page=2&sort=NAME_ASC',
    );
    expect(screen.getByTestId('result').textContent).toBe(
      '/catalog?query=tea&page=2&sort=NAME_ASC',
    );
  });

  it('normalizes missing leading slash in nextPath', () => {
    renderWithLocation(<TestComponent nextPath="catalog" />, '/?query=abc');
    expect(screen.getByTestId('result').textContent).toBe('/catalog?query=abc');
  });

  it('does not append "?" when there is no search in the current location', () => {
    renderWithLocation(<TestComponent nextPath="/catalog" />, '/products');
    expect(screen.getByTestId('result').textContent).toBe('/catalog');
  });

  it('resetPage=true forces page=1 while saving other params', () => {
    renderWithLocation(
      <TestComponent nextPath="/catalog" options={{ resetPage: true }} />,
      '/products?query=tea&page=7&sort=PRICE_DESC',
    );
    expect(screen.getByTestId('result').textContent).toBe(
      '/catalog?query=tea&page=1&sort=PRICE_DESC',
    );
  });

  it('resetPage=true sets page=1 even if page is missing', () => {
    renderWithLocation(
      <TestComponent nextPath="/catalog" options={{ resetPage: true }} />,
      '/products?query=tea',
    );
    expect(screen.getByTestId('result').textContent).toBe('/catalog?query=tea&page=1');
  });
});
