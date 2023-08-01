import { TestBed, fakeAsync, tick } from "@angular/core/testing";
import { BooksService } from "./books.service";
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Observable, of, throwError } from "rxjs";
import { BooksContextResolved } from "src/app/shared/models";

describe('BooksService', () => {
    let service: BooksService;
    let bookApiService = jasmine.createSpyObj('BookApiService', ['getBooks']);
    beforeEach(async () => {   
      await TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [
            BooksService
        ]
      })
      .compileComponents();
  
      service = TestBed.inject(BooksService);
    });
  
    it('should create', () => {
      expect(service).toBeTruthy();
    });

    it('GIVEN- books from API service -WHEN- resolving route -THEN- return route data with books', fakeAsync(() => {
        bookApiService.getBooks.and.returnValue(of([]));
        (service.resolve() as Observable<BooksContextResolved>).subscribe(data => {
            expect(data).toEqual({
                books: [],
                error: false,
              })
        });
        tick();
    }));

    it('GIVEN- error from API service -WHEN- resolving route -THEN- return route data with error', fakeAsync(() => {
        bookApiService.getBooks.and.returnValue(throwError(() => new Error('test')));
        (service.resolve() as Observable<BooksContextResolved>).subscribe(data => {
            expect(data).toEqual({
                books: [],
                error: true,
              })
        });
        tick();
    }));

    
  });