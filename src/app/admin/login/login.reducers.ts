import { LoginAction, LoginActions } from "./login.actions";

export interface LoginState {
    ticket: string;
    isAuthenticated: boolean;
    errorCode: number;
    errorMessage: string;
}

const initialState: LoginState = {
    ticket: null,
    isAuthenticated: false,
    errorCode: null,
    errorMessage: null,
}

export function LoginReducer(state = initialState, action: LoginAction): LoginState {
    switch(action.type) {
        case LoginActions.ErrorOnLogIn:
            return {
                ...state,
                errorCode: action.errorCode,
                errorMessage: action.errorMessage                
            };
        case LoginActions.TicketReceived:
            return {
                ticket: action.ticket,
                isAuthenticated: true,
                errorCode: null,
                errorMessage: null,
            }
        case LoginActions.LogIn:
            return {
                ...state,
            };
        case LoginActions.LogOut:
            return {
                ticket: null,
                isAuthenticated: false,
                errorCode: null,
                errorMessage: null,
            }
        default:
            console.log(`Warning: '${action["type"]}' not handled in the LoginReducer`);
            return {
                ...state
            };
    }
}
