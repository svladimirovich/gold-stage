import { StageEvent } from "../../models/events";
import { HomeActions, HomeAction } from "./home.actions";

export interface HomeState {
    state: "idle" | "loading";
    musicEvents: Array<StageEvent>;
    balletEvents: Array<StageEvent>;
    errorCode: number;
    errorMessage: string;
}

const initialState: HomeState = {
    state: "idle",
    musicEvents: [],
    balletEvents: [],
    errorCode: null,
    errorMessage: null,
}

export function homeReducer(state = initialState, action: HomeAction): HomeState {
    switch(action.type) {
        case HomeActions.RequestingList:
            return {
                ...state,
                state: "loading",
            }
        case HomeActions.UpdatedList:
            return {
                state: "idle",
                musicEvents: (action.events && action.events.length > 0) ? action.events.filter(e => e.eventType == "music") : state.musicEvents,
                balletEvents: (action.events && action.events.length > 0) ? action.events.filter(e => e.eventType == "ballet") : state.balletEvents,
                errorCode: action.errorCode,
                errorMessage: action.errorMessage
            }
        default:
            return state;
    }
}
