import { Dispatch, SetStateAction, useCallback, useState } from 'react';

interface UseLoadingOutput {
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setLoadingTrue: () => void;
  setLoadingFalse: () => void;
  toggleLoading: () => void;
}

export function useLoading(defaultValue?: boolean): UseLoadingOutput {
  const [loading, setLoading] = useState(!!defaultValue);

  const setLoadingTrue = useCallback(() => setLoading(true), []);
  const setLoadingFalse = useCallback(() => setLoading(false), []);
  const toggleLoading = useCallback(() => setLoading(x => !x), []);

  return { loading, setLoading, setLoadingTrue, setLoadingFalse, toggleLoading };
}
