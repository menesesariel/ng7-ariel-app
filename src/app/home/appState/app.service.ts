import { Injectable } from '@angular/core';
import { AppStore } from './app.store';
import { AppModel, CountryCounter } from './app.model';

@Injectable({ providedIn: 'root' })
export class AppService {
  constructor(private appStore: AppStore) { }

  setCount(messagesCount, messageCountry) {
    let model = this.appStore.getValue().entities[1]; // get first element our model
    let index = model.messagesPerCountry.findIndex(x => x.id === messageCountry);
    let messagesPerCountryTmp = model.messagesPerCountry.slice();
    if (index === -1) {
      let counter: CountryCounter = { id: messageCountry, counter: 1 };
      messagesPerCountryTmp = [...model.messagesPerCountry, counter];
    } else {
      messagesPerCountryTmp = Object.assign([], model.messagesPerCountry, { [index]: { id: messageCountry, counter: model.messagesPerCountry[index].counter + 1 } });
    }
    this.appStore.upsert(1, { messagesCount: messagesCount, messagesPerCountry: messagesPerCountryTmp })
  }

  logLastMinuteMessages(lastMinuteMessagesCount) {
    let model = this.appStore.getValue().entities[1]; // get first element our model
    let newArray = [...model.messagesPerMinuteArray, lastMinuteMessagesCount];
    var sum = newArray.reduce(function (a, b) {
      return a + b;
    }, 0);
    let average = (sum / newArray.length);
    this.appStore.upsert(1, { messagesPerMinuteArray: newArray, messagesPerMinuteAverage: average });
  }

  setInitialState() {
    let initialModel: AppModel = {
      id: 1,
      messagesCount: 0,
      messagesPerCountry: [] as CountryCounter[],
      messagesPerMinuteArray: [] as number[],
      messagesPerMinuteAverage: 0
    }
    this.appStore.set({ 1: initialModel });
  }
}
