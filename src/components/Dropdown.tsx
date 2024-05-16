import { useState } from 'react';
import { CharacterData } from '../types/CharacterData';

type DropdownProps = {
  setDropdown: (dropdown: boolean) => void;
  position: {
    x: number;
    y: number;
  };
  data: CharacterData[];
  setData: (arg: CharacterData[]) => void;
};

export default function Dropdown({ setDropdown, position, data, setData }: DropdownProps) {
  const [optionsOpen, setOptionsOpen] = useState(false);
  return (
    <div
      className="absolute flex translate-x-[-40px] translate-y-[-30px] gap-4"
      style={{
        top: `${position.y}px`,
        left: `${position.x}px`
      }}>
      <div
        onClick={(e) => {
          e.stopPropagation();
          setDropdown(false);
          setOptionsOpen(!optionsOpen);
        }}
        className="h-[75px] w-[75px] cursor-pointer rounded-[50%] bg-red-800 bg-opacity-30 outline-dashed outline-4 outline-red-400"></div>
      <div>
        <button
          onClick={() => setOptionsOpen(!optionsOpen)}
          className={`flex items-center gap-4 rounded-sm bg-white px-4 py-1 after:inline-block ${optionsOpen ? 'after:rotate-45' : 'after:rotate-[-135deg]'} after:border-b-[2px] after:border-r-[2px] after:border-black after:p-[3px] after:transition-[transform]`}>
          Who is it?
        </button>
        {optionsOpen && (
          <ul className="bg-white">
            {data.map((char, i) => (
              <li key={i} className="hover:bg-gray-400">
                <button onClick={() => handleGuess(char)} className="w-full px-4 py-1 text-start">
                  {char.name}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );

  function handleGuess(char: CharacterData) {
    if (Math.abs(char.x - position.x) <= 40 && Math.abs(char.y - position.y) <= 40) {
      console.log('You got it');
      setData(data.filter((c) => c.name !== char.name));
      setDropdown(false);
    } else {
      console.log('Wrong');
      setDropdown(false);
    }
  }
}
