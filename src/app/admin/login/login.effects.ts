import { Effect, Actions } from '@ngrx/effects';
import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';
import { LoginActions, TicketReceivedAction, LoggingInAction, ErrorOnLogInAction } from './login.actions';
import { UsersService } from '../../services/users.service';
import { CookieService } from 'ngx-cookie';

@Injectable()
export class LoginEffects {

    constructor(private actionsObservable: Actions,
                private router: Router,
                private usersService: UsersService,
                private cookieService: CookieService) {}

    @Effect()
    login = this.actionsObservable
        .ofType(LoginActions.LogIn)
        .switchMap((action: LoggingInAction) => {
            return this.usersService.login(action.login, action.password);
        }).map(result => {
            if(result.ticket && result.errorCode == null) {
                return new TicketReceivedAction(result.ticket);
            }
            return new ErrorOnLogInAction(result.errorCode, result.errorMessage);
        });

    @Effect({dispatch: false})
    ticketReceived = this.actionsObservable
        .ofType(LoginActions.TicketReceived)
        .do((action: TicketReceivedAction) => {
            this.cookieService.put('Ticket', action.ticket, { path: '/'});
            this.router.navigate(['admin','events']);
        })
}