import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BooksModule } from './modules/books/books.module';
import { CrShadowDomModule } from '@crystal/ng-shadow-dom';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BooksModule,
    CrShadowDomModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
