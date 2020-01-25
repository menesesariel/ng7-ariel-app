import { ID } from '@datorama/akita';

export type DataStream = {
  id: ID;
  name: string;
  author: string;
  genres: string[];
  description: string;
  price: number;
};
