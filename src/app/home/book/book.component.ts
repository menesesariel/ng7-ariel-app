import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppQuery } from '../state/app.query';
import { AppService } from '../state/app.service';

@Component({
  templateUrl: './book.component.html'
})
export class BookComponent implements OnInit {
  book$ = this.appQuery.selectEntity(this.bookId);

  constructor(
    private activatedRoute: ActivatedRoute,
    private appService: AppService,
    private appQuery: AppQuery
  ) {}

  ngOnInit() {
    if (this.appQuery.hasEntity(this.bookId) === false) {
      this.appService.getBook(this.bookId);
    }
  }

  get bookId() {
    return this.activatedRoute.snapshot.params.id;
  }
}
