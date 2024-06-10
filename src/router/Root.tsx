import { Outlet, useOutletContext } from 'react-router-dom';
import FetchData from '../components/FetchData';
import getUrl from '../helpers/GetUrl';
import { MapPreviewProps } from '../types/MapPreview';
import Spinner from '../components/Spinner';

type ContextProps = {
  mapData: MapPreviewProps[];
};

export default function Root() {
  const { state, data, error } = FetchData<MapPreviewProps[]>(`${getUrl()}/maps`);

  if (state === 'loading') return <Spinner />;

  if (state === 'error') throw error;

  return <Outlet context={{ mapData: data }} />;
}

export function useRootData() {
  return useOutletContext<ContextProps>();
}
