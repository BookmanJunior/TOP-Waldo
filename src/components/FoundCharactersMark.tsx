import Checkmark from '../assets/checkmark.svg';
import { Coordinates } from '../types/Coordinates';

type FoundCharactersMark = {
  foundPositions: Coordinates[];
};

export default function FoundCharactersMark({ foundPositions }: FoundCharactersMark) {
  return foundPositions.map((position) => (
    <img
      key={position.y + position.x}
      style={{ top: `${position.y}%`, left: `${position.x}%` }}
      src={Checkmark}
      className="pointer-events-none absolute w-[24px]"></img>
  ));
}
