import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { ActivatedRoute, Data } from '@angular/router';
import { Store } from '@ngrx/store';

import { StageEvent } from '../../../models/events';
import { AppState } from '../../app.reducers';
import { FormLoadedAction, SavingFormAction } from './event-form.actions';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-event-form',
    templateUrl: './event-form.component.html',
    styleUrls: ['./event-form.component.scss']
})
export class EventFormComponent implements OnInit, OnDestroy {

    public eventForm: FormGroup;
    private subscription: Subscription;

    constructor(private route: ActivatedRoute,
                private store: Store<AppState>) { }

    ngOnInit() {
        this.subscription = this.store.select("eventForm").subscribe(state => {
            this.eventForm = this.createForm(state.stageEvent);
        });

        this.route.data.subscribe((data: Data) => {
            let stageEvent: StageEvent = (data.eventResolverResponse && data.eventResolverResponse.event) || {};
            this.store.dispatch(new FormLoadedAction(stageEvent));            
        });
    }

    private createForm(stageEvent: StageEvent) {
        return new FormGroup({
            'id': new FormControl(stageEvent.id),
            'title': new FormControl(stageEvent.title),
            'date': new FormControl(stageEvent.date),
            'shortDescription': new FormControl(stageEvent.shortDescription),
            'fullDescription': new FormControl(stageEvent.fullDescription),
            'location': new FormControl(stageEvent.location),
            'bannerBackground': new FormControl(stageEvent.bannerBackground),
            'pictures': new FormArray(stageEvent.pictures.map(pictureUrl => new FormGroup({
                'url' : new FormControl(pictureUrl)
            }))),
            'minTicketPrice': new FormControl(stageEvent.minTicketPrice),
            'maxTicketPrice': new FormControl(stageEvent.maxTicketPrice),
            'soldOut': new FormControl(stageEvent.soldOut),
            'eventType': new FormControl(stageEvent.eventType),
        });
    }

    ngOnDestroy() {
        if(this.subscription)
            this.subscription.unsubscribe();
    }

    onSave() {
        this.store.dispatch(new SavingFormAction(this.eventForm.value));
    }

    onRemovePicture(index: number) {
        let pictures: FormArray = this.eventForm.get('pictures') as FormArray;
        pictures.removeAt(index);   
        pictures.markAsDirty();
    }

    onAddPicture(imageUrl) {
        let pictures: FormArray = this.eventForm.get('pictures') as FormArray;
        pictures.push(new FormGroup({ 'url': new FormControl(imageUrl) }));
        pictures.markAsDirty();
    }

    public getPictureControls() {
        return (<FormArray>this.eventForm.get('pictures')).controls;
    }

}
