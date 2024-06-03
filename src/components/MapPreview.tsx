import { Link } from 'react-router-dom';
import { MapPreviewProps } from '../types/MapPreview';

export default function MapPreview({ img, map_id, title }: MapPreviewProps) {
  return (
    <li className="group overflow-hidden rounded-md border-4 border-gray-400">
      <Link className="grid h-[300px]" to={`play/${map_id}`}>
        <img
          className="col-start-1 row-start-1 h-[300px] w-[100%] object-cover object-top transition-[transform] group-hover:scale-110"
          src={img}
        />
        <p
          className="z-[2] col-start-1 row-start-1 grid min-h-[50px] w-full translate-y-[100%] place-content-center self-end
         justify-self-center bg-black bg-opacity-60 text-center text-xl text-white transition-[transform] group-hover:translate-y-0">
          {title}
        </p>
      </Link>
    </li>
  );
}
