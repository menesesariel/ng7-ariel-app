import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { AppStore, AppState } from './app.store';
import { DataStream } from './dataStream.model';

@Injectable({ providedIn: 'root' })
export class AppQuery extends QueryEntity<AppState, DataStream> {
  constructor(protected store: AppStore) {
    super(store);
  }
}
