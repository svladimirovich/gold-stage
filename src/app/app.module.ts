import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CookieModule } from 'ngx-cookie';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { appReducers } from './app.reducers';
import { LoginEffects } from './admin/login/login.effects';
import { AppComponent } from './app.component';
import { NewslistComponent } from './newslist/newslist.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { AdminGuard } from './admin/admin.guard';
import { UsersService } from './services/users.service';
import { EventsListEffects } from './admin/events-list/events-list.effects';
import { StageEventsService } from './services/stage-events.service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NewslistComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'gold-stage'}),
    BrowserAnimationsModule,
    HttpClientModule,
    BrowserTransferStateModule,
    AppRoutingModule,
    CookieModule.forRoot(),
    StoreModule.forRoot(appReducers),
    EffectsModule.forRoot([LoginEffects, EventsListEffects])
  ],
  providers: [AdminGuard, UsersService, StageEventsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
