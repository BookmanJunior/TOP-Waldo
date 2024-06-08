import { useEffect, useState } from 'react';

type LoadState<T> =
  | { state: 'loading'; data?: undefined; error?: undefined }
  | { state: 'error'; error: Error; data?: undefined }
  | { state: 'loaded'; data: T; error: undefined };

type FetchDataResult<T> = LoadState<T> & {
  setData: (data: T) => void;
  refetchData: () => void;
};

export default function FetchData<T>(fetchUrl: string): FetchDataResult<T> {
  const [loadState, setLoadState] = useState<LoadState<T>>({ state: 'loading' });
  const setData = (data: T) => setLoadState({ state: 'loaded', data, error: undefined });

  const fetchData = async () => {
    try {
      const res = await fetch(fetchUrl, {
        method: 'GET',
        mode: 'cors',
        credentials: 'include'
      });
      const resResult = await res.json();
      if (res.status >= 400) {
        throw new Error(resResult.message);
      }
      setLoadState({ state: 'loaded', data: resResult, error: undefined });
    } catch (error) {
      if (error instanceof Error) {
        setLoadState({ state: 'error', error });
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { ...loadState, setData, refetchData: fetchData };
}
