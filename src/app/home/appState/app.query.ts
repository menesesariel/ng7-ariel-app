import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { AppStore, AppState } from './app.store';
import { AppModel } from './app.model';
import { map } from 'rxjs/operators';


@Injectable({ providedIn: 'root' })
export class AppQuery extends QueryEntity<AppState, AppModel> {
    model$ = this.selectFirst();

    constructor(protected store: AppStore) {
        super(store);
    }

    getHashTagFilter() { 
        return this.select(state => state.name); 
    }

    getOrderedByCountryCounter() {
        let countriesOrderedByPostedMessages = this.model$.pipe(map((model) => {
            if (model.messagesPerCountry.length > 0) {
                var orderedList = model.messagesPerCountry.slice().sort((a, b) => {
                    if (a.counter > b.counter) {
                        return -1;
                    }
                    if (a.counter < b.counter) {
                        return 1;
                    }
                    return 0;
                });
                return orderedList.slice(0, 5);
            }
            return model.messagesPerCountry;
        }));
        return countriesOrderedByPostedMessages;
    }

}
