import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooksComponent } from './modules/books/books.component';
import { BooksService } from './modules/books/books.service';

const routes: Routes = [
  {
    path: '',
    component: BooksComponent,
    resolve: {
      context: BooksService
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
