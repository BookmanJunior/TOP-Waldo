import { useEffect, useState } from 'react';

type LoadState<T> =
  | { state: 'loading'; data?: undefined; error?: undefined }
  | { state: 'error'; error: Error; data?: undefined }
  | { state: 'loaded'; data: T; error: undefined };

type FetchDataResult<T> = LoadState<T> & { setData: (data: T) => void };

export default function FetchData<T>(fetchUrl: string): FetchDataResult<T> {
  const [loadState, setLoadState] = useState<LoadState<T>>({ state: 'loading' });
  const setData = (data: T) => setLoadState({ state: 'loaded', data, error: undefined });

  useEffect(() => {
    async function getData() {
      try {
        const res = await fetch(fetchUrl);
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
    }

    getData();
  }, []);

  return { ...loadState, setData };
}
