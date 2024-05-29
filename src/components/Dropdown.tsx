import { useState } from 'react';
import { CharacterData } from '../types/CharacterData';

type Position = { x: number; y: number };

type DropdownOptionsProps = {
  data: CharacterData[];
  handleGuess: (arg0: CharacterData) => void;
};

type DropdownProps = {
  setDropdown: (dropdown: boolean) => void;
  dropdownPosition: Position;
} & DropdownOptionsProps;

export default function Dropdown({
  setDropdown,
  dropdownPosition,
  data,
  handleGuess
}: DropdownProps) {
  return (
    <div
      className="absolute flex translate-x-[-20px] translate-y-[-20px]  flex-wrap gap-4"
      style={{
        top: `${dropdownPosition.y}px`,
        left: `${dropdownPosition.x}px`
      }}>
      <div
        onClick={(e) => {
          e.stopPropagation();
          setDropdown(false);
        }}
        className="h-[50px] w-[50px] cursor-pointer rounded-[50%] bg-red-800 bg-opacity-30 outline-dashed outline-4 outline-red-400"></div>
      <DropdownOptions data={data} handleGuess={handleGuess} />
    </div>
  );
}

function DropdownOptions({ data, handleGuess }: DropdownOptionsProps) {
  const [optionsOpen, setOptionsOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setOptionsOpen(!optionsOpen)}
        className={` mb-2 flex items-center gap-4 rounded-sm bg-white px-4 py-1 after:inline-block 
        ${optionsOpen ? 'after:rotate-45' : 'after:rotate-[-135deg]'} after:border-b-[2px] after:border-r-[2px]
         after:border-black after:p-[3px] after:transition-[transform]`}>
        Who is it?
      </button>
      {optionsOpen && (
        <ul className="rounded-[2px] bg-white">
          {data.map((char, i) => (
            <li key={i} className="hover:bg-gray-400">
              <button
                onClick={() => handleGuess(char)}
                className="flex w-full flex-wrap items-center gap-1 px-4 py-1 text-start">
                {char.name}
                <img
                  src={char.img}
                  alt={char.name}
                  className="-order-last aspect-square w-[75px] object-cover"
                />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
