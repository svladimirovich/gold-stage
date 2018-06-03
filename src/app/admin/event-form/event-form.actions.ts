import { Action } from '@ngrx/store';
import { StageEvent } from '../../../models/events';

export enum EventFormActions {
    UpdatingStageEvent = "[EventForm] Updating Stage Event",
    StageEventLoaded = "[EventForm] Stage Event Loaded",
    CreatingStageEvent = "[EventForm] Creating Stage Event",
}

export class UpdatingStageEventAction implements Action {
    readonly type = EventFormActions.UpdatingStageEvent;
    constructor(public stageEvent: StageEvent) {}
}

export class StageEventLoadedAction implements Action {
    readonly type = EventFormActions.StageEventLoaded;
    constructor(public stageEvent?: StageEvent,
                public errorCode?: number,
                public errorMessage?: string) {}
}

export class CreatingStageEventAction implements Action {
    readonly type = EventFormActions.CreatingStageEvent;
    constructor(public stageEvent: StageEvent) {}
}

export type EventFormAction = UpdatingStageEventAction | StageEventLoadedAction | CreatingStageEventAction;