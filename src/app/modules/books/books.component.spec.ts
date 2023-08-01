import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { BooksComponent } from './books.component';
import { Observable, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { BooksService } from './books.service';
import { CdkTableState, CrCdkTableModule } from '@crystal/ng-cdk-table';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';

describe('BooksComponent', () => {
  let component: BooksComponent;
  let fixture: ComponentFixture<BooksComponent>;
  let mockBooks = [];
  let activatedRoute = jasmine.createSpyObj('ActivatedRoute', [], { 'data': of({}) });

  let booksService = jasmine.createSpyObj('BooksService', ['updateList', 'connect']);
  beforeEach(async () => {
    booksService.connect.and.returnValue(of(mockBooks))
    
    await TestBed.configureTestingModule({
      declarations: [ BooksComponent, HeaderComponent ],
      imports: [ CrCdkTableModule, RouterTestingModule, HttpClientModule ],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRoute },
        { provide: BooksService, useValue: booksService },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('GIVEN- data from resolver -WHEN- subscribing to route data -THEN- table state is set to Data and rows are updated', fakeAsync(() => {
    booksService.updateList.calls.reset();
    
    (Object?.getOwnPropertyDescriptor(activatedRoute, "data")?.get as jasmine.Spy<() =>
    Observable<any>>).and.returnValue(of(
      {
        context: {
            books: mockBooks,
            error: false
        }
      }
    ));
    fixture.detectChanges();
    component.ngOnInit();
    tick();
    expect(component.tableState).toBe(CdkTableState.Data);
    expect(booksService.updateList).toHaveBeenCalledWith(mockBooks);
  }));

  it('GIVEN- error from resolver -WHEN- subscribing to route data -THEN- table state is set to Error', fakeAsync(() => {
    booksService.updateList.calls.reset();
    (Object?.getOwnPropertyDescriptor(activatedRoute, "data")?.get as jasmine.Spy<() =>
    Observable<any>>).and.returnValue(of(
      {
        context: {
            books: [],
            error: true
        }
      }
    ));
    fixture.detectChanges();
    component.ngOnInit();
    tick();
    expect(component.tableState).toBe(CdkTableState.Error);
  }));
  
});
