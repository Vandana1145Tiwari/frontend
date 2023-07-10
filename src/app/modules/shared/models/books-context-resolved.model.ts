import { Book } from "./book.model";

export interface BooksContextResolved {
    books: Book[];
    error: boolean;
}