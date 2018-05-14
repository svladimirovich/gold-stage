import { Action } from '@ngrx/store';
import { StageEvent } from '../../../models/events';

export enum EventsListActions {
    RequestedList = "[EventsList] Requested",
    ReceivedList = "[EventsList] Received",
}

export class RequestedEventsListAction implements Action {
    readonly type = EventsListActions.RequestedList;
}

export class ReceivedEventsListAction implements Action {
    readonly type = EventsListActions.ReceivedList;

    constructor(public events: Array<StageEvent>,
                public errorCode?: number,
                public errorMessage?: string) {}
}

export type EventsListAction = RequestedEventsListAction | ReceivedEventsListAction;