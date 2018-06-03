import { Action } from '@ngrx/store';
import { StageEvent } from '../../models/events';

export enum HomeActions {
    RequestingList = "[Home] Requesting List",
    UpdatedList = "[Home] Updated List",
}

export class RequestedEventsListAction implements Action {
    readonly type = HomeActions.RequestingList;
}

export class UpdatingEventsListAction implements Action {
    readonly type = HomeActions.UpdatedList;

    constructor(public events: Array<StageEvent>,
                public errorCode?: number,
                public errorMessage?: string) {}
}

export type HomeAction = RequestedEventsListAction | UpdatingEventsListAction;