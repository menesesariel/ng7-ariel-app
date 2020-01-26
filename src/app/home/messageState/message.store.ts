import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Message } from './message.model';

export interface MessageState extends EntityState<Message> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'dataStreams' })
export class MessageStore extends EntityStore<MessageState, Message> {

  constructor() {
    super();
  }

}