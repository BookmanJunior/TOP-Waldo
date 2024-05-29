import { useState } from 'react';
import { CharacterData } from '../types/CharacterData';

type DropdownOptionsProps = {
  data: CharacterData[];
  handleGuess: (e: React.FormEvent, charName: string) => void;
};

export default function DropdownOptions({ data, handleGuess }: DropdownOptionsProps) {
  const [optionsOpen, setOptionsOpen] = useState(false);
  const [guessedCharacter, setGuessedCharacter] = useState('');

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
        <form onSubmit={(e) => handleGuess(e, guessedCharacter)}>
          <ul className="rounded-[2px] bg-white">
            {data.map((char, i) => (
              <li key={i} className="hover:bg-gray-400">
                <button
                  onClick={() => setGuessedCharacter(char.name)}
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
        </form>
      )}
    </div>
  );
}
