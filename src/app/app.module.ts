import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { NewslistComponent } from './newslist/newslist.component';


@NgModule({
  declarations: [
    AppComponent,
    NewslistComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'gold-stage'}),
    HttpClientModule,
    BrowserTransferStateModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
