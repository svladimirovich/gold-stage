import { ActionReducerMap } from "@ngrx/store";

import { LoginState, loginReducer } from "./login/login.reducers";
import { EventsListState, eventsListReducer } from "./events-list/events-list.reducers";
import { EventFormState, eventFormReducer } from "./event-form/event-form.reducers";

export interface AdminFeatureState {
    admin: AdminState;
}

export interface AdminState {
    adminLogin: LoginState;
    eventsList: EventsListState;
    eventForm: EventFormState;
}

export const adminReducers: ActionReducerMap<AdminState> = {
    adminLogin: loginReducer,
    eventsList: eventsListReducer,
    eventForm: eventFormReducer,
}