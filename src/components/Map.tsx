import { useState } from 'react';
import Dropdown from './Dropdown';
import Timer from './Timer';
import { Modal } from './Modal';
import { CharacterData } from '../types/CharacterData';

type MapProps = {
  mapImage: string;
  data: CharacterData[];
};

export default function Map({ mapImage, data }: MapProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dropdown, setDropdown] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ x: 0, y: 0 });
  const [finalTime, setFinalTime] = useState(0);
  const [mapData, setMapdata] = useState(data);

  const isGameOver = !mapData.length;

  return (
    <main className="relative">
      <img
        className="w-full cursor-pointer object-fill"
        onClick={handleMapClick}
        src={mapImage}></img>
      {dropdown && (
        <Dropdown
          position={position}
          setDropdown={setDropdown}
          dropdownPosition={dropdownPosition}
          data={mapData}
          setData={setMapdata}
        />
      )}
      <Modal isOpen={isGameOver} finalTime={finalTime} />
      <Timer setFinalTime={setFinalTime} isGameOver={isGameOver} />
    </main>
  );

  function handleMapClick(e: React.MouseEvent) {
    if (mapData.length) return;

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
}
