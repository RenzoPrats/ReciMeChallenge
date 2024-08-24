import { Difficulty } from "./difficulty";

export type Recipe = {
  id: number;
  name: string;
  difficulty: Difficulty;
  position: number;
  imageUrl: string;
};
