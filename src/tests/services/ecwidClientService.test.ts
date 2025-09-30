import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

let axiosCreateMock: any;
let axiosInstance: any;

vi.mock('axios', () => {
  const responseUse = vi.fn();
  axiosInstance = {
    interceptors: { response: { use: responseUse } },
    defaults: { baseURL: '', params: {}, timeout: 0 },
  };
  axiosCreateMock = vi.fn((config: any) => {
    axiosInstance.defaults.baseURL = config?.baseURL;
    axiosInstance.defaults.params = config?.params;
    axiosInstance.defaults.timeout = config?.timeout;
    return axiosInstance;
  });
  return {
    default: { create: axiosCreateMock },
    create: axiosCreateMock,
  };
});

const importService = async () => {
  vi.resetModules();
  return await import('@/api/services/ecwidClientService');
};

beforeEach(() => {
  vi.clearAllMocks();
});

afterEach(() => {
  vi.unstubAllEnvs();
});

describe('ecwidService', () => {
  it('creates axios instance with correct baseURL, token param and timeout', async () => {
    vi.stubEnv('VITE_ECWID_STORE_ID', '12345');
    vi.stubEnv('VITE_ECWID_PUBLIC_TOKEN', 'PUBLIC_TOKEN');

    const { ecwidService } = await importService();

    expect(axiosCreateMock).toHaveBeenCalledTimes(1);
    expect(ecwidService).toBe(axiosInstance);

    expect(axiosInstance.defaults.baseURL).toBe('https://app.ecwid.com/api/v3/12345');
    expect(axiosInstance.defaults.params).toEqual({ token: 'PUBLIC_TOKEN' });
    expect(axiosInstance.defaults.timeout).toBe(15000);
  });

  it('throws on missing env variables', async () => {
    vi.stubEnv('VITE_ECWID_STORE_ID', '');
    vi.stubEnv('VITE_ECWID_PUBLIC_TOKEN', '');

    await expect(importService()).rejects.toThrow(
      /Missing VITE_ECWID_STORE_ID or VITE_ECWID_PUBLIC_TOKEN/,
    );
    expect(axiosCreateMock).not.toHaveBeenCalled();
  });

  it('response interceptor logs only for 0/≥500 and not for 4xx errors', async () => {
    vi.stubEnv('VITE_ECWID_STORE_ID', 'S');
    vi.stubEnv('VITE_ECWID_PUBLIC_TOKEN', 'T');

    await importService();

    const useCalls = axiosInstance.interceptors.response.use.mock.calls;
    const errorHandler = useCalls[0][1];

    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});

    await expect(errorHandler({ message: 'Network fail' } as any)).rejects.toBeTruthy();
    expect(spy).toHaveBeenCalledWith('[HTTP]', 0, 'Network fail');
    spy.mockClear();

    await expect(
      errorHandler({ message: 'Test', response: { status: 500 } } as any),
    ).rejects.toBeTruthy();
    expect(spy).toHaveBeenCalledWith('[HTTP]', 500, 'Test');
    spy.mockClear();

    await expect(
      errorHandler({ message: 'Not found', response: { status: 404 } } as any),
    ).rejects.toBeTruthy();
    expect(spy).not.toHaveBeenCalled();

    await expect(
      errorHandler({ message: 'Canceled', code: 'ERR_CANCELED' } as any),
    ).rejects.toBeTruthy();
    expect(spy).not.toHaveBeenCalled();

    spy.mockRestore();
  });
});
