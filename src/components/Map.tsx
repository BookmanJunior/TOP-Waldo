import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import fail from '../assets/fail.mp3';
import success from '../assets/success.mp3';
import getUrl from '../helpers/GetUrl';
import { Coordinates } from '../types/Coordinates';
import { Map as MapProps } from '../types/Map';
import Dropdown from './Dropdown';
import DropdownOptions from './DropdownOptions';
import FetchData from './FetchData';
import Footer from './Footer';
import FoundCharactersMark from './FoundCharactersMark';
import { Modal } from './Modal';
import Spinner from './Spinner';
import Timer from './Timer';

const failAudio = new Audio(fail);
const successAudio = new Audio(success);

export default function Map() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dropdown, setDropdown] = useState(false);
  const [finalTime, setFinalTime] = useState(0);
  const [foundPositions, setFoundPositions] = useState<Coordinates[]>([]);
  const [guessOutcome, setGuessOutcome] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const mainRef = useRef<HTMLDivElement>(null);
  const { map_id } = useParams();
  const url = getUrl();
  const { state, data, error, setData, refetchData } = FetchData<MapProps>(`${url}/maps/${map_id}`);

  useEffect(() => {
    let timeOut: number;
    if (guessOutcome) {
      timeOut = setTimeout(() => {
        setGuessOutcome(false);
      }, 3000);
    }
    return () => {
      clearTimeout(timeOut);
    };
  }, [guessOutcome]);

  if (state === 'loading') return <Spinner />;

  if (state === 'error') throw error;

  const isGameOver = !data.map_data.length;

  return (
    <main ref={mainRef} className="relative my-auto max-w-[1200px]">
      <img
        className="w-full cursor-pointer object-fill"
        onClick={handleMapClick}
        src={data.img}></img>
      {dropdown && (
        <Dropdown setDropdown={setDropdown} dropdownPosition={position}>
          <DropdownOptions data={data.map_data} handleGuess={handleGuess} position={position} />
        </Dropdown>
      )}
      {isGameOver && (
        <Modal
          isOpen={isGameOver}
          finalTime={finalTime}
          map_id={data.map_id}
          handleRestart={handleRestart}
        />
      )}
      <Footer soundOn={soundOn} modifySound={modifyAudio}>
        <Timer setFinalTime={setFinalTime} isGameOver={isGameOver} />
      </Footer>
      {foundPositions.length > 0 && <FoundCharactersMark foundPositions={foundPositions} />}
      {guessOutcome && (
        <div
          style={{
            top: `${position.y}%`,
            left: `${position.x}%`
          }}
          className="pointer-events-none absolute bg-red-500 px-6 py-4 text-white">
          Wrong Guess
        </div>
      )}
    </main>
  );

  function handleMapClick(e: React.MouseEvent) {
    if (!data?.map_data.length) return;
    if (guessOutcome) {
      setGuessOutcome(false);
    }

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;

    setPosition({
      x: Math.floor((x / rect.width) * 100),
      y: Math.floor((y / rect.height) * 100)
    });

    if (!dropdown) {
      setDropdown(true);
    }
  }

  async function handleGuess(e: React.FormEvent, charName: string) {
    e.preventDefault();
    setDropdown(false);

    if (!successAudio.paused || !failAudio.paused) {
      restartAudio();
    }

    try {
      const res = await fetch(`${url}/marker/verify`, {
        mode: 'cors',
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ x: position.x, y: position.y, charName })
      });

      if (res.status >= 400) {
        failAudio.play();
        setGuessOutcome(true);
        return;
      }

      if (data) {
        const filteredData = data.map_data.filter((c) => c.name !== charName);
        setData({ ...data, map_data: filteredData });
        setFoundPositions([...foundPositions, position]);
        successAudio.play();
      }
    } catch (error) {
      console.log(error);
    }
  }

  function handleRestart() {
    setFinalTime(0);
    setFoundPositions([]);
    refetchData();
    mainRef.current?.scrollIntoView({ behavior: 'smooth' });
  }

  function restartAudio() {
    successAudio.pause();
    successAudio.currentTime = 0;
    failAudio.pause();
    failAudio.currentTime = 0;
  }

  function modifyAudio() {
    const isSound = !soundOn;
    setSoundOn(isSound);

    if (isSound) {
      successAudio.volume = 1;
      failAudio.volume = 1;
      restartAudio();
      return;
    }

    successAudio.volume = 0;
    failAudio.volume = 0;
    restartAudio();
  }
}
