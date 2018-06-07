import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
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

    constructor() { }

    ngOnInit() {
    }
  
    eventLeft() {
        if(--this.eventIndex == -1)
            this.eventIndex = this.events.length - 1;
    }

    eventRight() {
        if(++this.eventIndex == this.events.length)
            this.eventIndex = 0;
    }

    gotoEvent(index) {
        this.eventIndex = index;
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
