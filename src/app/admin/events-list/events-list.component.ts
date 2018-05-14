import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';

import { StageEvent } from '../../../models/events';
import { AppState } from '../../app.reducers';
import { RequestedEventsListAction } from './events-list.actions';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-events-list',
    templateUrl: './events-list.component.html',
    styleUrls: ['./events-list.component.scss']
})
export class EventsListComponent implements OnInit, OnDestroy {

    public events: Array<StageEvent> = [];
    private subscription: Subscription;

    constructor(private store: Store<AppState>) { }

    ngOnInit() {
        this.subscription = this.store.select("eventsList").subscribe(state => {
            this.events = state.events;
        })
        this.store.dispatch(new RequestedEventsListAction());
    }

    ngOnDestroy() {
        if(this.subscription) {
            this.subscription.unsubscribe();
        }
    }

}
