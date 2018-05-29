import { Actions, Effect } from "@ngrx/effects";
import { EventsListActions, RequestedEventsListAction, ReceivedEventsListAction } from "./events-list.actions";
import { StageEventsService } from "../../services/stage-events.service";

export class EventsListEffects {

    constructor(private actionsObservable: Actions,
                private eventsService: StageEventsService) {}

    @Effect()
    onGetEventList = this.actionsObservable
        .ofType(EventsListActions.RequestedList)
        .switchMap((action: RequestedEventsListAction) => {
            return this.eventsService.getAllStageEvents();
        }).map(result => {
            return new ReceivedEventsListAction(result.events, result.errorCode, result.errorMessage);
        });
}
