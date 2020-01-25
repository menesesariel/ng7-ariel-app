import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { DataStream } from './dataStream.model';

export interface AppState extends EntityState<DataStream> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'dataStreams' })
export class AppStore extends EntityStore<AppState, DataStream> {

  constructor() {
    super();
  }

}

