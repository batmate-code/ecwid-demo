import '@testing-library/jest-dom';

class ResizeObserverMock {}
globalThis.ResizeObserver = globalThis.ResizeObserver || ResizeObserverMock;
