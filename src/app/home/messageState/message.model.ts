import { ID } from '@datorama/akita';

export type Message = {
  id: ID;
  country: string;
  author: string;
  username: string;
  text: string;
  profile_url: string;
};

