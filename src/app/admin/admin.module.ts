import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'

import { AdminRoutingModule } from './admin-routing.module';
import { LoginComponent } from './login/login.component';
import { EventsListComponent } from './events-list/events-list.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AdminRoutingModule
  ],
  declarations: [LoginComponent, EventsListComponent]
})
export class AdminModule { }
