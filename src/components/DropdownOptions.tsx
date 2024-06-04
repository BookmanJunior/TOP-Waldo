import { useState } from 'react';
import { CharacterData } from '../types/CharacterData';

type DropdownOptionsProps = {
  data: CharacterData[];
  handleGuess: (e: React.FormEvent, charName: string) => void;
  position: { x: number; y: number };
};

export default function DropdownOptions({ data, handleGuess, position }: DropdownOptionsProps) {
  const [optionsOpen, setOptionsOpen] = useState(false);
  const [guessedCharacter, setGuessedCharacter] = useState('');

  const isOutOfBoundY = position.y > 80;

  return (
    <div className="relative">
      <button
        onClick={() => setOptionsOpen(!optionsOpen)}
        className={` mb-2 flex items-center gap-4 rounded-sm bg-white px-4 py-1 after:inline-block 
        ${optionsOpen ? 'after:rotate-45' : 'after:rotate-[-135deg]'} after:border-b-[2px] after:border-r-[2px]
         after:border-black after:p-[3px] after:transition-[transform]`}>
        Who is it?
      </button>
      {optionsOpen && (
        <form
          onSubmit={(e) => handleGuess(e, guessedCharacter)}
          className={`absolute z-50 w-max ${isOutOfBoundY ? 'bottom-[55px]' : ''}`}>
          <ul className="rounded-[2px] bg-white">
            {data.map((char, i) => (
              <li key={i} className="hover:bg-gray-400">
                <button
                  onClick={() => setGuessedCharacter(char.name)}
                  className="flex h-[50px] w-full items-center gap-1 px-4 py-1 text-start md-[800px]:h-[75px]">
                  {char.name}
                  <img
                    src={char.img}
                    alt={char.name}
                    className="-order-last aspect-square max-h-full max-w-full object-cover md-[800px]:h-[75px]"
                  />
                </button>
              </li>
            ))}
          </ul>
        </form>
      )}
    </div>
  );
}
