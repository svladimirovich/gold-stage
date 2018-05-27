import { ActionReducerMap } from "@ngrx/store";
import { LoginState, loginReducer } from "./admin/login/login.reducers";
import { EventsListState, eventsListReducer } from "./admin/events-list/events-list.reducers";
import { eventFormReducer, EventFormState } from "./admin/event-form/event-form.reducers";

export interface AppState {
    adminLogin: LoginState;
    eventsList: EventsListState;
    eventForm: EventFormState;
}

export const appReducers: ActionReducerMap<AppState> = {
    adminLogin: loginReducer,
    eventsList: eventsListReducer,
    eventForm: eventFormReducer,
}