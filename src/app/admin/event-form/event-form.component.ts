import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { ActivatedRoute, Data } from '@angular/router';
import { Store } from '@ngrx/store';

import { StageEvent } from '../../../models/events';
import { StageEventLoadedAction, UpdatingStageEventAction, CreatingStageEventAction } from './event-form.actions';
import { Subscription } from 'rxjs';
import { AdminState, AdminFeatureState } from '../admin.reducers';

@Component({
    selector: 'app-event-form',
    templateUrl: './event-form.component.html',
    styleUrls: ['./event-form.component.scss']
})
export class EventFormComponent implements OnInit, OnDestroy {

    public eventForm: FormGroup;
    public isEditMode: boolean = false;
    private subscription: Subscription;

    constructor(private route: ActivatedRoute,
                private store: Store<AdminFeatureState>) { }

    ngOnInit() {
        this.subscription = this.store.select("admin").subscribe(state => {
            this.eventForm = this.createForm(state.eventForm.stageEvent);
            this.isEditMode = state.eventForm.isEditMode;
        });

        if(this.route.data) {
            this.route.data.subscribe((data: Data) => {
                let stageEvent: StageEvent = (data.stageEventResolver && data.stageEventResolver.event) || null;
                if(stageEvent) {
                    this.store.dispatch(new StageEventLoadedAction(stageEvent));            
                } else {
                    // create new stage event
                    this.store.dispatch(new StageEventLoadedAction());
                }
            });
        }
    }

    private createForm(stageEvent: StageEvent): FormGroup {
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

    private getValue(): StageEvent {
        let pictures: FormArray = this.eventForm.get('pictures') as FormArray;
        return {
            ...this.eventForm.value,
            pictures: pictures.value.map(item => item.url),
        }
    }

    ngOnDestroy() {
        if(this.subscription)
            this.subscription.unsubscribe();
    }

    onSave() {
        if(this.isEditMode)
            this.store.dispatch(new UpdatingStageEventAction(this.getValue()));
        else
            this.store.dispatch(new CreatingStageEventAction(this.getValue()));
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
