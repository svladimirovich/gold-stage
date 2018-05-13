import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { ClientConfiguration } from '../../../config.client';

interface UsersServiceLoginResponse {
    ticket?: string;
    errorCode?: number;
    errorMessage?: string;
}

@Injectable()
export class UsersService {

    private configuration: ClientConfiguration = new ClientConfiguration();

    constructor(private http: HttpClient) { }

    public login(login: string, password: string): Observable<UsersServiceLoginResponse> {
        return this.http.post(`${this.configuration.BaseUrl}/api/users/login`, { login, password })
            .map((response: any) => {
                return {
                    ticket: response.ticket
                }
            })
            // TODO: must handle errors correctly since this isn't the only type of error that can turn out
            .catch((response: HttpErrorResponse) => {
                return Observable.of({
                    errorCode: response.status,
                    errorMessage: (response.error && response.error.errorMessage) ? response.error.errorMessage : response.message,
                });
            });
    }
}
