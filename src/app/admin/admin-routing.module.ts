import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { EventsListComponent } from './events-list/events-list.component';
import { AdminGuard } from './admin.guard';
import { EventFormComponent } from './event-form/event-form.component';
import { StageEventsService } from '../services/stage-events.service';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'login'
    }, {
        path: 'login',
        component: LoginComponent  
    }, {
        path: 'event/:id',
        component: EventFormComponent, canActivate: [AdminGuard], resolve: { eventResolverResponse: StageEventsService }
    }, {
        path: 'events',
        component: EventsListComponent, canActivate: [AdminGuard]
    },
    // {
    //     path: '**',
    //     component: NotFound
    // }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }
