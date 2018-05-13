import { ActionReducerMap } from "@ngrx/store";
import { LoginState, LoginReducer } from "./admin/login/login.reducers";

export interface AppState {
    adminLogin: LoginState;
}

export const appReducers: ActionReducerMap<AppState> = {
    adminLogin: LoginReducer,
}