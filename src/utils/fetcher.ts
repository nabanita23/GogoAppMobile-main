import { API_BASE_URL } from '@/hooks/useFetcher';
import { resetStores, stores } from '@/stores';

import { Platform } from 'react-native';

import { FetcherOptions, FetcherReturn } from './types';

export const fetcher = async <T = any>(url: string, options?: FetcherOptions): Promise<FetcherReturn<T>> => {
  const token = stores.auth.accessToken;

  const resp = await fetch(url.startsWith('https') ? url : `${API_BASE_URL}/${url}`, {
    method: options?.method || 'GET',
    mode: 'cors', // cors, no-cors, *cors, same-origin
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      'client-version-code': '1',
      'client-type': Platform.OS,
      'country-code': 'IN',
      'device-timezone': 'Asia/Kolkata',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    ...(options?.method !== 'GET' && { body: JSON.stringify(options?.body) }),
  });

  if (resp?.status === 401 || resp?.status === 403) {
    await resetStores();
    return {
      status: resp?.status,
      statusText: resp?.statusText,
    };
  }
  const res = await resp?.json();

  if (resp?.status <= 300) {
    return {
      status: resp?.status,
      statusText: resp?.statusText,
      data: res?.data?.data || res?.data || res,
      meta: res?.data?.meta || res?.meta,
    };
  } else {
    return {
      status: resp?.status,
      statusText: resp?.statusText,
      isError: true,
      error: res?.error,
    };
  }
};
