import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { BooksContextResolved } from "../shared/models/books-context-resolved.model";
import { DataSource } from '@angular/cdk/collections';
import { Book } from "../shared/models/book.model";
import { BehaviorSubject, Observable, catchError, map, of } from "rxjs";
import { BooksApiService } from "./books-api.service";

@Injectable({
    providedIn: 'root'
})
export class BooksService implements Resolve<BooksContextResolved>, DataSource<Book> {
    private booksSubject = new BehaviorSubject<readonly Book[]>([]);
    constructor(private bookApiService: BooksApiService){

    }

    resolve(): BooksContextResolved | Observable<BooksContextResolved> | Promise<BooksContextResolved>{

        return this.bookApiService.getBooks().pipe(
            map(data => {
                return {
                    books: data,
                    error: false,  
                }
            }),
            catchError(err => {
                console.log(err.message);
                return of({
                    books: [],
                    error: true,
                })
            })
        );
    };

    connect(): Observable<readonly Book[]> {
        return this.booksSubject.asObservable();
    }

    disconnect(): void {
        this.booksSubject.complete();
    }

    updateList(books: Book[]) {
        this.booksSubject.next(books);
    }

}