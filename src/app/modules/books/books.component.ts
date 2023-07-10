import { Component, OnInit } from '@angular/core';
import { booksTableConfig } from './books-table.config';
import { CdkTableState } from '@crystal/ng-cdk-table';
import { ActivatedRoute, Router } from '@angular/router';
import { BooksService } from './books.service';
import { Book } from '../shared/models/book.model';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
})
export class BooksComponent implements OnInit {

  booksTableConfig = booksTableConfig;
  tableState = CdkTableState.Loading;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public booksService: BooksService,
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe((resp) => {
      if (resp['context'].error) {
          this.handleError();
      } else {
          this.tableState = CdkTableState.Data;
          this.handleSuccess(resp['context'].books);
      }
  });
  }

  handleSuccess(data: Book[]) {
    this.booksService.updateList(data);
}

  handleError() {
    this.booksService.updateList([]);
    this.tableState = CdkTableState.Error;
}

}
