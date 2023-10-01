import { debounce } from '@/utils/debounce';
import { useEffect, useMemo, useRef } from 'react';

export const useDebounce = (callback: () => void) => {
  const ref = useRef<any>();

  useEffect(() => {
    ref.current = callback;
  }, [callback]);

  const debouncedCallback = useMemo(() => {
    const func = () => {
      ref.current?.();
    };

    return debounce(func, 500);
  }, []);

  return debouncedCallback;
};
