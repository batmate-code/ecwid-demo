import axios, { AxiosError, type AxiosInstance } from 'axios';

const storeId = import.meta.env.VITE_ECWID_STORE_ID as string;
const token = import.meta.env.VITE_ECWID_PUBLIC_TOKEN as string;

if (!storeId || !token) {
  throw new Error('Missing VITE_ECWID_STORE_ID or VITE_ECWID_PUBLIC_TOKEN');
}

export const ecwidService: AxiosInstance = axios.create({
  baseURL: `https://app.ecwid.com/api/v3/${storeId}`,
  params: { token },
  timeout: 15000,
});

ecwidService.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.code === 'ERR_CANCELED') return Promise.reject(error);
    const status = error.response?.status ?? 0;
    if (!status || status >= 500) {
      // eslint-disable-next-line no-console
      console.error('[HTTP]', status, error.message);
    }
    return Promise.reject(error);
  },
);
