import { Actions, Effect } from "@ngrx/effects";

import { StageEventsService } from "../services/stage-events.service";
import { HomeActions, RequestedEventsListAction, UpdatingEventsListAction } from "./home.actions";

export class HomeEffects {

    constructor(private actionsObservable: Actions,
                private eventsService: StageEventsService) {}

    @Effect()
    onRequestEventList = this.actionsObservable
        .ofType(HomeActions.RequestingList)
        .switchMap((action: RequestedEventsListAction) => {
            return this.eventsService.getAllStageEvents();
        }).map(result => {
            return new UpdatingEventsListAction(result.events, result.errorCode, result.errorMessage);
        });
}
