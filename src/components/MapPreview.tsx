import { Link } from 'react-router-dom';

interface MapThumbnailProps {
  img: string;
  link: string;
  title: string;
}

export default function MapPreview({ img, link, title }: MapThumbnailProps) {
  return (
    <li className="group overflow-hidden rounded-md border-4 border-gray-400">
      <Link className="grid h-[300px]" to={`play/${link}`}>
        <img
          className="z-[-1] col-start-1 row-start-1 h-[300px] w-[100%] object-cover object-top transition-[transform] group-hover:scale-110"
          src={img}
        />
        <p
          className="col-start-1 row-start-1 grid min-h-[50px] w-full translate-y-[100%] place-content-center self-end
         justify-self-center bg-black bg-opacity-60 text-center text-xl text-white transition-[transform] group-hover:translate-y-0">
          {title}
        </p>
      </Link>
    </li>
  );
}
