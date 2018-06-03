import { Actions, Effect } from "@ngrx/effects";
import { Router } from "@angular/router";
import { Observable } from 'rxjs/Rx';

import { StageEventsService } from "../../services/stage-events.service";
import { EventFormActions, UpdatingStageEventAction, StageEventLoadedAction, CreatingStageEventAction } from "./event-form.actions";

export class EventFormEffects {
    constructor(private actionsObservable: Actions,
                private eventsService: StageEventsService,
                private router: Router) {}

    @Effect({dispatch: false}) // to supress Error: Effect "EventFormEffects.onSavingForm" dispatched an invalid action: undefined
    onUpdateStageEvent = this.actionsObservable
        .ofType(EventFormActions.UpdatingStageEvent)
        .switchMap((action: UpdatingStageEventAction) => {
            return Observable.forkJoin(this.eventsService.updateStageEvent(action.stageEvent), Observable.of(action.stageEvent));
        }).map(([result, stageEvent]) => {
            if(result.errorCode || result.errorMessage) {
                return new StageEventLoadedAction(stageEvent, result.errorCode, result.errorMessage);
            } else {
                this.router.navigate(['/admin','events']);
            }
        });

    @Effect({dispatch: false})
    onCreateStageEvent = this.actionsObservable
        .ofType(EventFormActions.CreatingStageEvent)
        .switchMap((action: CreatingStageEventAction) => {
            return Observable.forkJoin(this.eventsService.insertStageEvent(action.stageEvent), Observable.of(action.stageEvent));
        }).map(([result, stageEvent]) => {
            if(result.errorCode || result.errorMessage) {
                return new StageEventLoadedAction(stageEvent, result.errorCode, result.errorMessage);
            } else {
                this.router.navigate(['/admin','events']);
            }
        })
}

