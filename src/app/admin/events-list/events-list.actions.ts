import { Action } from '@ngrx/store';
import { StageEvent } from '../../../models/events';

export enum EventsListActions {
    RequestingList = "[EventsList] Requesting List",
    UpdatedList = "[EventsList] Updated List",
    DeleteStageEvent = "[EventsList] Delete Stage Event",
}

export class RequestedEventsListAction implements Action {
    readonly type = EventsListActions.RequestingList;
}

export class DeleteStageEventAction implements Action {
    readonly type = EventsListActions.DeleteStageEvent;
    constructor(public stageEventId: string) {}
}

export class UpdatingEventsListAction implements Action {
    readonly type = EventsListActions.UpdatedList;

    constructor(public events: Array<StageEvent>,
                public errorCode?: number,
                public errorMessage?: string) {}
}

export type EventsListAction = RequestedEventsListAction | DeleteStageEventAction | UpdatingEventsListAction;