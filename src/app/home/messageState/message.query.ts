import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { MessageStore, MessageState } from './message.store';
import { Message } from "./message.model";
import { map } from 'rxjs/operators';


@Injectable({ providedIn: 'root' })
export class MessageQuery extends QueryEntity<MessageState, Message> {
    messages$ = this.selectAll();
    private filter: string = "";

    constructor(protected store: MessageStore) {
        super(store);
    }

    getByHashTag() {
        let filteredMessages = this.messages$.pipe(map((messages) => {
            if(this.filter){
                messages = messages.filter(y => {
                    return y.text.includes(this.filter);
                });
            }
            return messages.slice(Math.max(messages.length - 100, 1));
        }));
        
        return filteredMessages;
    }

    setFilter(text){
        this.filter = text;
    }
}
