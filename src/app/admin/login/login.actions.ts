import { Action } from '@ngrx/store';

export enum LoginActions {
    LogIn = "[Login] Try",
    ErrorOnLogIn = "[Login] Error",
    TicketReceived = "[Login] Ticked Received",
    LogOut = "[Login] Log Out",
}

export class LoggingInAction implements Action {
    readonly type = LoginActions.LogIn;
    public login: string;
    public password: string;
    constructor(credentials: {
        login: string,
        password: string
    }) {
        this.login = credentials.login;
        this.password = credentials.password
    }
}

export class ErrorOnLogInAction implements Action {
    readonly type = LoginActions.ErrorOnLogIn;
    constructor(public errorCode: number,
                public errorMessage: string) {}
}

export class TicketReceivedAction implements Action {
    readonly type = LoginActions.TicketReceived;
    constructor(public ticket: string) {}
}

export class LoggingOutAction implements Action {
    readonly type = LoginActions.LogOut;
}

export type LoginAction = LoggingInAction | ErrorOnLogInAction | TicketReceivedAction | LoggingOutAction;