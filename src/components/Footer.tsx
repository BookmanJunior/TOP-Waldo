import { Link } from 'react-router-dom';
import Home from '../assets/home.svg';
import SoundOn from '../assets/sound-on.svg';
import SoundOff from '../assets/sound-off.svg';

interface FooterProps {
  children: React.ReactNode | React.ReactNode[];
  soundOn: boolean;
  modifySound: () => void;
}

export default function Footer({ children, soundOn, modifySound }: FooterProps) {
  return (
    <footer className="pointer-events-none fixed bottom-0 grid w-[min(1200px,100%)] grid-cols-2 items-center bg-pink-100 bg-opacity-70 p-2">
      <div className="flex  gap-4 [&>*]:pointer-events-auto [&>*]:w-[24px]">
        <Link to="/" className="block">
          <img src={Home} alt="Home" className="max-w-ful max-h-full" />
        </Link>
        <button onClick={modifySound}>
          <img src={soundOn ? SoundOn : SoundOff} alt="Sound On" />
        </button>
      </div>
      {children}
    </footer>
  );
}
