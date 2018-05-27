import { Action } from '@ngrx/store';
import { StageEvent } from '../../../models/events';

export enum EventFormActions {
    SavingForm = "[EventForm] Saving Form",
    FormSaved = "[EventForm] Form Saved",
    FormLoaded = "[EventForm] Form Loaded"
}

export class SavingFormAction implements Action {
    readonly type = EventFormActions.SavingForm;
    constructor(public stageEvent: StageEvent) {}
}

export class FormSavedAction implements Action {
    readonly type = EventFormActions.FormSaved;
}

export class FormLoadedAction implements Action {
    readonly type = EventFormActions.FormLoaded;
    constructor(public stageEvent: StageEvent) {}
}


export type EventFormAction = SavingFormAction | FormSavedAction | FormLoadedAction;