import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { AppState } from '../app.reducers';
import { StageEvent } from '../../models/events';
import { RequestedEventsListAction } from './home.actions';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    public title = "GoldStage";
    private subscription: Subscription;

    public musicEvents: Array<StageEvent> = [];
    public balletEvents: Array<StageEvent> = [];

    constructor(private store: Store<AppState>) { }

    ngOnInit() {
        this.subscription = this.store.select("home").subscribe(state => {
            this.musicEvents = state.musicEvents;
            this.balletEvents = state.balletEvents;
        });
        this.store.dispatch(new RequestedEventsListAction());
    }

    onNavClick(anchorName) {
        document.querySelector(`a[name='${anchorName}']`).scrollIntoView({ behavior: 'smooth' });
        return false;
    }
}
