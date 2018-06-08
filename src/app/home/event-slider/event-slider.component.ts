import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import * as moment from 'moment';

import { StageEvent } from '../../../models/events';



@Component({
    selector: 'app-event-slider',
    templateUrl: './event-slider.component.html',
    styleUrls: ['./event-slider.component.scss']
})
export class EventSliderComponent implements OnInit {

    @Input()
    public title: string;

    @Input()
    public events: Array<StageEvent> = [];

    @Input()
    public class: string;

    public eventIndex: number = 0;
    private pictureIndex: number = 0;

    public get eventDate(): string {
        if(this.events && this.events.length > 0) {
            if(this.events[this.eventIndex]) {
                return moment(this.events[this.eventIndex].date).format("dddd, MMMM Do YYYY");
            }
        }
        return 'Event date not set';
    }

    public get currentPictureUrl(): string {
        if(this.events && this.events.length > 0) {
            let currentEvent = this.events[this.eventIndex];
            if(currentEvent)
                if(currentEvent.pictures && currentEvent.pictures.length > 0)
                    if(currentEvent.pictures[this.pictureIndex])
                        return currentEvent.pictures[this.pictureIndex];
        }
        return '';
    }

    constructor() { }

    ngOnInit() {
    }
  
    eventLeft() {
        if(--this.eventIndex == -1)
            this.eventIndex = this.events.length - 1;
        this.pictureIndex = 0;
    }

    eventRight() {
        if(++this.eventIndex == this.events.length)
            this.eventIndex = 0;
        this.pictureIndex = 0;
    }

    gotoEvent(index) {
        this.eventIndex = index;
        this.pictureIndex = 0;
    }

    nextPicture() {
        if(this.events && this.events.length > 0) {
            let currentEvent = this.events[this.eventIndex];
            if(currentEvent && currentEvent.pictures && currentEvent.pictures.length > 0) {
                let nextIndex = this.pictureIndex + 1;
                if(nextIndex >= currentEvent.pictures.length)
                    this.pictureIndex = 0;
                else
                    this.pictureIndex = nextIndex;
            }
        }
    }

    getBackgroundStyles(stageEvent: StageEvent) {
        let color = 'rgba(221, 190, 96, 0.8)';
        if(this.class && this.class.indexOf('dark') > -1) {
            color = 'rgba(1, 1, 1, 0.8)';
        }
        return {
            'background': `linear-gradient(${color}, ${color}), url(${stageEvent.bannerBackground})`,
            'background-size': "cover",
            'background-position': 'center',
        }
    }
}
