import { useRef, useState } from 'react';
import Dropdown from './Dropdown';
import DropdownOptions from './DropdownOptions';
import Timer from './Timer';
import { Modal } from './Modal';
import FetchData from './FetchData';
import { Map as MapProps } from '../types/Map';
import { useParams } from 'react-router-dom';
import getUrl from '../helpers/GetUrl';

export default function Map() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dropdown, setDropdown] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ x: 0, y: 0 });
  const [finalTime, setFinalTime] = useState(0);
  const mainRef = useRef<HTMLDivElement>(null);
  const { map_id } = useParams();
  const url = getUrl();
  const { state, data, error, setData, refetchData } = FetchData<MapProps>(`${url}/maps/${map_id}`);

  if (state === 'loading') return <div>Loading...</div>;

  if (state === 'error') return <div>{error.message}</div>;

  const isGameOver = !data.map_data.length;

  return (
    <main ref={mainRef} className="relative mx-auto my-auto max-w-[1200px]">
      <img
        className="w-full cursor-pointer object-fill"
        onClick={handleMapClick}
        src={data.img}></img>
      {dropdown && (
        <Dropdown setDropdown={setDropdown} dropdownPosition={dropdownPosition}>
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
      <Timer setFinalTime={setFinalTime} isGameOver={isGameOver} />
    </main>
  );

  function handleMapClick(e: React.MouseEvent) {
    if (!data?.map_data.length) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;
    setPosition({
      x: Math.floor((x / rect.width) * 100),
      y: Math.floor((y / rect.width) * 100)
    });
    setDropdownPosition({ x, y });

    if (!dropdown) {
      setDropdown(true);
    }
  }

  async function handleGuess(e: React.FormEvent, charName: string) {
    e.preventDefault();
    setDropdown(false);

    try {
      const res = await fetch(`${url}/marker/verify`, {
        mode: 'cors',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ x: position.x, y: position.y, charName })
      });

      if (res.status >= 400) {
        return;
      }

      if (data) {
        const filteredData = data.map_data.filter((c) => c.name !== charName);
        setData({ ...data, map_data: filteredData });
      }
    } catch (error) {
      console.log(error);
    }
  }

  function handleRestart() {
    setFinalTime(0);
    refetchData();
    mainRef.current?.scrollIntoView({ behavior: 'smooth' });
  }
}
