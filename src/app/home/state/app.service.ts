import { ID } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { AppStore } from './app.store';
import { books } from './../app.data';
import { timer } from 'rxjs';
import { mapTo } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AppService {
  constructor(private appStore: AppStore) {}

  getBooks() {
    timer(1000)
      .pipe(mapTo(books))
      .subscribe(books => {
        this.appStore.set(books);
      });
  }

  getBook(id: ID) {
    const book = books.find(current => +current.id === +id);

    timer(50)
      .pipe(mapTo(book))
      .subscribe(book => {
        this.appStore.add(book);
      });
  }
}
