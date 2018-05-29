import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AdminRoutingModule } from './admin-routing.module';
import { LoginComponent } from './login/login.component';
import { EventsListComponent } from './events-list/events-list.component';
import { EventFormComponent } from './event-form/event-form.component';
import { adminReducers } from './admin.reducers';
import { LoginEffects } from './login/login.effects';
import { EventsListEffects } from './events-list/events-list.effects';
import { EventFormEffects } from './event-form/event-form.effects';
import { AdminGuard } from './admin.guard';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    MatMomentDateModule,
    MatDatepickerModule,
    StoreModule.forFeature('admin', adminReducers),
    EffectsModule.forFeature([LoginEffects, EventsListEffects, EventFormEffects]),    
  ],
  declarations: [LoginComponent, EventsListComponent, EventFormComponent],
  providers: [AdminGuard]
})
export class AdminModule { }
