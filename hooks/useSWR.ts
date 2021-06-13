import useNativeSWR from 'swr';
import { Fetcher, Key, SWRConfiguration } from 'swr/dist/types';
import { useState, useEffect } from 'react';

export default function useSWR<Data = any, Error = any>(
  key: Key,
  fn: Fetcher<Data> | null,
  config?: SWRConfiguration<Data, Error> | undefined,
) {
  const { data, error, ...rest } = useNativeSWR<Data, Error>(key, fn, config);
  const [internalData, setInternalData] = useState<Data>();

  const isFirstLoading = !internalData;
  const isLoading = !data && !error;

  useEffect(() => {
    if (data) {
      setInternalData(data);
    }
  }, [data]);

  return { data: internalData, isFirstLoading, isLoading, error, ...rest };
}
