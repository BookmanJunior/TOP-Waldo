import { CharacterData } from './CharacterData';

export interface Map {
  id: number;
  map_data: CharacterData[];
  img: string;
  title: string;
}
