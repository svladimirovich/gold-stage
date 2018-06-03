import { ActionReducerMap } from "@ngrx/store";
import { HomeState, homeReducer } from "./home/home.reducers";

// TODO: check if 'admin' is part of global AppState in runtime
export interface AppState {
    home: HomeState
}

export const appReducers: ActionReducerMap<AppState> = {
    home: homeReducer
}