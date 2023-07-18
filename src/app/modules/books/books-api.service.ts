import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { api, apiBaseUrl } from 'src/app/config/api';
import { Book } from '../../shared/models';

@Injectable({
  providedIn: 'root'
})
export class BooksApiService {
  constructor(private http: HttpClient) {}
  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(api.book.allBooks);
  }
}
