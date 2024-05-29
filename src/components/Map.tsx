import { useState } from 'react';
import Dropdown from './Dropdown';
import Timer from './Timer';
import { Modal } from './Modal';
import { CharacterData } from '../types/CharacterData';
import FetchData from './FetchData';
import { Map as MapProps } from '../types/Map';
import { useParams } from 'react-router-dom';

export default function Map() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dropdown, setDropdown] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ x: 0, y: 0 });
  const [finalTime, setFinalTime] = useState(0);
  const { map_id } = useParams();
  const { state, data, error, setData } = FetchData<MapProps>(
    `http://localhost:3000/maps/${map_id}`
  );

  if (state === 'loading') return <div>Loading...</div>;

  if (state === 'error') return <div>{error.message}</div>;

  const isGameOver = !data.map_data.length;

  return (
    <main className="relative">
      <img
        className="w-full cursor-pointer object-fill"
        onClick={handleMapClick}
        src={data.img}></img>
      {dropdown && (
        <Dropdown
          setDropdown={setDropdown}
          dropdownPosition={dropdownPosition}
          data={data.map_data}
          handleGuess={handleGuess}
        />
      )}
      <Modal isOpen={isGameOver} finalTime={finalTime} />
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

  function handleGuess(char: CharacterData) {
    if (Math.abs(char.x - position.x) <= 40 && Math.abs(char.y - position.y) <= 40) {
      if (data) {
        const filteredData = data.map_data.filter((c) => c.name !== char.name);
        setData({ ...data, map_data: filteredData });
      }
      setDropdown(false);
    } else {
      setDropdown(false);
    }
  }
}
