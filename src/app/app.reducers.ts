import { ActionReducerMap } from "@ngrx/store";
import { LoginState, loginReducer } from "./admin/login/login.reducers";
import { EventsListState, EventsListReducer } from "./admin/events-list/events-list.reducers";

export interface AppState {
    adminLogin: LoginState;
    eventsList: EventsListState;
}

export const appReducers: ActionReducerMap<AppState> = {
    adminLogin: loginReducer,
    eventsList: EventsListReducer
}