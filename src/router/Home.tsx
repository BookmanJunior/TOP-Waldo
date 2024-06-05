import MapPreview from '../components/MapPreview';
import SwitchableLeaderboard from '../components/SwitchableLeaderboard';
import { useRootData } from './Root';

export default function Home() {
  const { mapData } = useRootData();

  return (
    <main className="mx-auto w-[1000px] py-4">
      <h1 className="mb-2 text-center text-2xl font-semibold">Maps</h1>
      <ul className="grid grid-cols-[repeat(auto-fit,minmax(300px,300px))] justify-center gap-4">
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
