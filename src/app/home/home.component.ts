import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { AppState } from '../app.reducers';
import { StageEvent } from '../../models/events';
import { RequestedEventsListAction } from './home.actions';

//import { DomSanitizer } from '@angular/platform-browser'

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit {

    public title = "GoldStage";
    private subscription: Subscription;

    public musicEvents: Array<StageEvent> = [];
    public musicEventIndex: number = 0;
    public balletEvents: Array<StageEvent> = [];
    public balletEventIndex: number = 0;

    public menuOpen: boolean = false;

    constructor(private store: Store<AppState>,
                //private domSanitizer: DomSanitizer
    ) { }

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

    musicLeft() {
        if(--this.musicEventIndex == -1)
            this.musicEventIndex = this.musicEvents.length - 1;
    }

    balletLeft() {
        if(--this.balletEventIndex == -1)
            this.balletEventIndex = this.balletEvents.length - 1;
    }

    musicRight() {
        if(++this.musicEventIndex == this.musicEvents.length)
            this.musicEventIndex = 0;
    }

    balletRight() {
        if(++this.balletEventIndex == this.balletEvents.length)
            this.balletEventIndex = 0;
    }

    gotoMusic(index) {
        this.musicEventIndex = index;
    }

    gotoBallet(index) {
        this.balletEventIndex = index;
    }

    getVideoNode() {
        // this.domSanitizer.bypassSecurityTrustHtml(

        // <!-- poster="posterImage.jpg" -->

        return `
                <video id="logo_vid" preload="auto" loop autoplay muted> 
                    <source src="http://www.goldstage.fr/static/videos/goldstage.mp4" type="video/mp4" />
                </video> 
                <div class="logo"></div>
            `;
    }

    brightBackground(stageEvent: StageEvent) {
        return {
            'background': `linear-gradient(rgba(255, 245, 238, 0.7), rgba(255, 245, 238, 0.7)), url(${stageEvent.bannerBackground})`,
            'background-size': "cover",
            'background-position': 'center',
        }
    }

    darkBackground(stageEvent: StageEvent) {
        return {
            'background': `linear-gradient(rgba(1, 1, 1, 0.8), rgba(1, 1, 1, 0.8)), url(${stageEvent.bannerBackground})`,
            'background-size': "cover",
            'background-position': 'center',
        }
    }

    toggleMenu() {
        this.menuOpen = !this.menuOpen;
    }
}
