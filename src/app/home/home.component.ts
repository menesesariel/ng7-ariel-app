import { MessageService } from './messageState/message.service';
import { AppService } from './appState/app.service';
import { Message } from './messageState/message.model';
import { AppModel, CountryCounter } from './appState/app.model'
import { MessageQuery } from './messageState/message.query';
import { AppQuery } from './appState/app.query';
import { Component, OnInit } from '@angular/core';
import { Observable, timer } from 'rxjs';
import PubNub from 'pubnub'

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  messages$: Observable<Message[]>;
  selectLoading$: Observable<boolean>;
  appModel$: Observable<AppModel>;
  messagesByCountry$: Observable<CountryCounter[]>
  hashTagFilter$: Observable<string>;

  constructor(
    private appQuery: AppQuery,
    private appService: AppService,
    private messageService: MessageService,
    private messageQuery: MessageQuery,

  ) { }

  ngOnInit() {

    this.appService.setInitialState();
    this.messages$ = this.messageQuery.getByHashTag();
    this.messagesByCountry$ = this.appQuery.getOrderedByCountryCounter();
    this.appModel$ = this.appQuery.selectFirst();
    this.hashTagFilter$ = this.appQuery.getHashTagFilter();
    var self = this;

    var messagesCount = 0;
    var messageCountPerMinute = 0;
    var counting = true;
    var messages: Array<Message> = [];

    const pubnub = new PubNub({
      subscribeKey: 'sub-c-78806dd4-42a6-11e4-aed8-02ee2ddab7fe'
    });

    pubnub.subscribe({
      channels: ['pubnub-twitter']
    });

    pubnub.addListener({
      message: function ({ message }) {
        var messageObject: Message = {
          id: message.id,
          author: message.user.name,
          text: message.text,
          profile_url: message.user.profile_image_url_https,
          country: message.place ? message.place.country || "" : "",
          username: message.user.screen_name
        };
        messages = [...messages, messageObject]

        messagesCount++;
        messageCountPerMinute++;

        self.setMessages(messages);
        self.setCount(messagesCount, messageObject.country);

        if (counting) {
          timer(60000).subscribe(x => {
            counting = true;
            self.logLastMinuteMessages(messageCountPerMinute);
            messageCountPerMinute = 0;
          });
        }
        counting = false;
      }
    });
  }

  setMessages(messages) {
    this.messageService.setMessages(messages);
  }

  setHashTagFilter(text) {
    this.messageQuery.setFilter(text);
  }

  setCount(messagesCount, messageCountry) {
    this.appService.setCount(messagesCount, messageCountry);
  }

  logLastMinuteMessages(messagesCount) {
    this.appService.logLastMinuteMessages(messagesCount);
  }
}
