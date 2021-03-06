import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { isPlatformServer } from '@angular/common';
import { TransferState, makeStateKey } from '@angular/platform-browser';
import { Observable } from 'rxjs/Rx';
import { CookieService } from 'ngx-cookie';

import { ClientConfiguration } from '../../../config.client';
import { AdminUser } from '../../models/users';
import { BasicServiceResponse, handleHttpClientError } from './common';

interface UsersServiceLoginResponse extends BasicServiceResponse {
    ticket?: string;
}

interface UsersServiceGetProfileResponse extends BasicServiceResponse {
    userProfile?: AdminUser;
}

@Injectable()
export class UsersService {

    private configuration: ClientConfiguration = new ClientConfiguration();

    constructor(private http: HttpClient,
                @Inject(PLATFORM_ID) private platformId,
                private transferState: TransferState,
                private cookieService: CookieService) { }

    public login(login: string, password: string): Observable<UsersServiceLoginResponse> {
        return this.http.post(`${this.configuration.BaseUrl}/api/users/login`, { login, password })
            .map((response: any) => {
                return {
                    ticket: response.ticket
                }
            })
            .catch(handleHttpClientError);
    }

    public getUserByTicket(): Observable<UsersServiceGetProfileResponse> {
        const ticket = this.cookieService.get('Ticket');
        if(ticket) {
            const transferKey = makeStateKey('users/byTicket/' + ticket);
            if(this.transferState.hasKey(transferKey)) {
                let result = this.transferState.get<UsersServiceGetProfileResponse>(transferKey, null);
                this.transferState.remove(transferKey);
                return Observable.of(result);
            } else {
                return this.http.get(`${this.configuration.BaseUrl}/api/users/byTicket`, { params: { ticket: ticket }})
                    .map((response: any) => {
                        return {
                            userProfile: response
                        };
                    })
                    .catch(handleHttpClientError)
                    .do(result => {
                        if (isPlatformServer(this.platformId)) {
                            this.transferState.set<UsersServiceGetProfileResponse>(transferKey, result);
                        }
                    });
            }
        } else {
            return Observable.of(
                {
                    errorCode: 401,
                    errorMessage: "User not authenticated.",
                }                
            );
        }
    }
}
