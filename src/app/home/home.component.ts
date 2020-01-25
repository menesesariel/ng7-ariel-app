import { AppService } from './state/app.service';
import { DataStream } from './state/dataStream.model';
import { AppQuery } from './state/app.query';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { switchMap, startWith, tap } from 'rxjs/operators';

@Component({
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  dataStreams$: Observable<DataStream[]>;
  selectLoading$: Observable<boolean>;
  sortControl = new FormControl('price');

  constructor(
    private appQuery: AppQuery,
    private appService: AppService
  ) {}

  ngOnInit() {
    this.dataStreams$ = this.sortControl.valueChanges.pipe(
      startWith<keyof DataStream>('price'),
      switchMap(sortBy => {
        return this.appQuery.selectAll({ sortBy: sortBy });
      })
    );
    this.selectLoading$ = this.appQuery.selectLoading();
    this.getBooks();
  }

  getBooks() {
    if (true ) {
      this.appService.getBooks();
    }
  }
}
