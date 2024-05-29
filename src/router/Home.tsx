import MapPreview from '../components/MapPreview';
import { useRootData } from './Root';

export default function Home() {
  const { data } = useRootData();

  return (
    <main className="mx-auto max-w-[1000px] py-4">
      <h1 className="mb-2 text-center text-2xl font-semibold">Maps:</h1>
      <ul className="grid grid-cols-[repeat(auto-fit,minmax(300px,300px))] justify-center gap-4">
        {data.map((preview) => (
          <MapPreview
            key={preview.map_id}
            title={preview.title}
            img={preview.img}
            map_id={preview.map_id}
          />
        ))}
      </ul>
    </main>
  );
}
