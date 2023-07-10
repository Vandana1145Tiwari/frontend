import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BooksComponent } from './books.component';
import { CrCdkTableModule } from '@crystal/ng-cdk-table';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    BooksComponent
  ],
  imports: [
    CommonModule,
    CrCdkTableModule,
    HttpClientModule,
  ],
  providers: [],
})
export class BooksModule { }
