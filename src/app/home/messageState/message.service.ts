import { Injectable } from '@angular/core';
import { MessageStore } from './message.store';
import { timer } from 'rxjs';
import { mapTo } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class MessageService {
  constructor(private appStore: MessageStore) {}

  setMessages(messages) {
    this.appStore.set(messages);
  }

}
