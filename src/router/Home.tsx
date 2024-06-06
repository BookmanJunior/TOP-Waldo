import MapPreview from '../components/MapPreview';
import SwitchableLeaderboard from '../components/SwitchableLeaderboard';
import { useRootData } from './Root';

export default function Home() {
  const { mapData } = useRootData();

  return (
    <main className="mx-auto w-[1000px] px-4">
      <h1 className="mb-2 border-b-[1px] border-gray-700 border-opacity-50 py-4 pb-1 text-2xl font-semibold">
        Maps
      </h1>
      <ul className="grid grid-cols-3 gap-4 max-[650px]:grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
        {mapData.map((preview) => (
          <MapPreview
            key={preview.map_id}
            title={preview.title}
            img={preview.img}
            map_id={preview.map_id}
          />
        ))}
      </ul>
      <SwitchableLeaderboard />
    </main>
  );
}
