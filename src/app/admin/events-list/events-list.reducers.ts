import { StageEvent } from "../../../models/events";
import { EventsListAction, EventsListActions } from "./events-list.actions";

export interface EventsListState {
    state: "idle" | "loading";
    events: Array<StageEvent>;
    errorCode: number;
    errorMessage: string;
}

const initialState: EventsListState = {
    state: "idle",
    events: [],
    errorCode: null,
    errorMessage: null,
}

export function eventsListReducer(state = initialState, action: EventsListAction): EventsListState {
    switch(action.type) {
        case EventsListActions.RequestingList:
            return {
                ...state,
                state: "loading",
            }
        case EventsListActions.UpdatedList:
            return {
                state: "idle",
                events: (action.events && action.events.length > 0) ? action.events : state.events,
                errorCode: action.errorCode,
                errorMessage: action.errorMessage
            }
        default:
            console.log(`Warning: '${action["type"]}' not handled in the EventsListReducer`);
            return {
                ...state
            };
    }
}
