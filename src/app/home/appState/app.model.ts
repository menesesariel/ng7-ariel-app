import { ID } from '@datorama/akita';

export type AppModel = {
  id: ID;
  messagesCount: number,
  messagesPerMinuteArray: number[],
  messagesPerMinuteAverage: number,
  messagesPerCountry: CountryCounter[]
}

export type CountryCounter = {
  id: string,
  counter: number
}