import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Data } from '@angular/router';
import { StageEvent } from '../../../models/events';

@Component({
    selector: 'app-event-form',
    templateUrl: './event-form.component.html',
    styleUrls: ['./event-form.component.scss']
})
export class EventFormComponent implements OnInit {

    public eventForm: FormGroup;

    constructor(private route: ActivatedRoute) { }

    ngOnInit() {
        this.route.data.subscribe((data: Data) => {
            let stageEvent: StageEvent = (data.eventResolverResponse && data.eventResolverResponse.event) || {};
            this.eventForm = new FormGroup({
                'id': new FormControl(stageEvent.id),
                'title': new FormControl(stageEvent.title),
                'date': new FormControl(stageEvent.date),
                'shortDescription': new FormControl(stageEvent.shortDescription),
                'fullDescription': new FormControl(stageEvent.fullDescription),
                'location': new FormControl(stageEvent.location),
                'bannerBackground': new FormControl(stageEvent.bannerBackground),
                'minTicketPrice': new FormControl(stageEvent.minTicketPrice),
                'maxTicketPrice': new FormControl(stageEvent.maxTicketPrice),
                'soldOut': new FormControl(stageEvent.soldOut),
                'eventType': new FormControl(stageEvent.eventType),
            });
        })
    }

    onSubmit() {
        
    }

}
