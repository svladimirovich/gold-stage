import { Actions, Effect } from "@ngrx/effects";
import { Observable } from 'rxjs/Rx';

import { EventsListActions, RequestedEventsListAction, UpdatingEventsListAction, DeleteStageEventAction } from "./events-list.actions";
import { StageEventsService } from "../../services/stage-events.service";

export class EventsListEffects {

    constructor(private actionsObservable: Actions,
                private eventsService: StageEventsService) {}

    @Effect()
    onRequestEventList = this.actionsObservable
        .ofType(EventsListActions.RequestingList)
        .switchMap((action: RequestedEventsListAction) => {
            return this.eventsService.getAllStageEvents();
        }).map(result => {
            return new UpdatingEventsListAction(result.events, result.errorCode, result.errorMessage);
        });

    @Effect()
    onDeleteStageEvent = this.actionsObservable
        .ofType(EventsListActions.DeleteStageEvent)
        .switchMap((action: DeleteStageEventAction) => {
            return this.eventsService.deleteStageEvent(action.stageEventId).switchMap(result => {
                return Observable.forkJoin(Observable.of(result), this.eventsService.getAllStageEvents());
            });
        }).map(([deleteResult, listResult]) => {
            return new UpdatingEventsListAction(
                listResult.events,
                deleteResult.errorCode || listResult.errorCode,
                deleteResult.errorMessage || listResult.errorMessage
            );
        })
}
