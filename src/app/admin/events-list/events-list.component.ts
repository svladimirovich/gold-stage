import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { StageEvent } from '../../../models/events';
import { AdminState, AdminFeatureState } from '../admin.reducers';
import { RequestedEventsListAction, DeleteStageEventAction } from './events-list.actions';

@Component({
    selector: 'app-events-list',
    templateUrl: './events-list.component.html',
    styleUrls: ['./events-list.component.scss']
})
export class EventsListComponent implements OnInit, OnDestroy {

    public events: Array<StageEvent> = [];
    private subscription: Subscription;

    constructor(private router: Router,
                private store: Store<AdminFeatureState>) { }

    ngOnInit() {
        this.subscription = this.store.select("admin").subscribe(state => {
            this.events = state.eventsList.events;
        })
        this.store.dispatch(new RequestedEventsListAction());
    }

    ngOnDestroy() {
        if(this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    sectionBackground(stageEvent) {
        return {
            'background': `linear-gradient(rgba(255, 245, 238, 0.7), rgba(255, 245, 238, 0.7)), url(${stageEvent.bannerBackground})`,
            'background-size': "cover",
            'background-position': 'center',
        }
    }

    editEvent(eventId) {
        this.router.navigate(["admin", "event", eventId]);
    }

    deleteEvent(eventId) {
        if(window && window.confirm("Are you sure you want to delete this item?")) {
            this.store.dispatch(new DeleteStageEventAction(eventId));
        }
    }

}
