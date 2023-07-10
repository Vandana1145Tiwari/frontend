import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Book } from "../shared/models/book.model";
import { HttpClient } from '@angular/common/http';

const apiBaseUrl = 'https://localhost:7173';
@Injectable({
    providedIn: 'root',
  })
  export class BooksApiService {
    constructor(private http: HttpClient) { }
    getBooks(): Observable<Book[]> {
        return this.http
          .get<Book[]>(`${apiBaseUrl}/books`);
      }
    
  }