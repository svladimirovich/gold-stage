import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { TransferState, makeStateKey } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';

import { ClientConfiguration } from '../../../config.client';
import { BasicServiceResponse, handleHttpClientError } from './common';
import { StageEvent } from '../../models/events';
import { isPlatformServer } from '@angular/common';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';

interface StageEventsServiceGetAllResponse extends BasicServiceResponse {
    events?: Array<StageEvent>;
}

interface StageEventsServiceGetReponse extends BasicServiceResponse {
    event?: StageEvent;
}

@Injectable()
export class StageEventsService implements Resolve<StageEventsServiceGetReponse> {

    private configuration: ClientConfiguration = new ClientConfiguration();

    constructor(private http: HttpClient,
                @Inject(PLATFORM_ID) private platformId,
                private transferState: TransferState) { }

    public getAllStageEvents(): Observable<StageEventsServiceGetAllResponse> {
        const transferKey = makeStateKey('events');
        if(this.transferState.hasKey(transferKey)) {
            let result = this.transferState.get<StageEventsServiceGetAllResponse>(transferKey, null);
            this.transferState.remove(transferKey);
            return Observable.of(result);
        } else {        
            return this.http.get(`${this.configuration.BaseUrl}/api/events`)
                .map((response: any) => {
                    return {
                        events: response
                    }
                })
                .catch(handleHttpClientError)
                .do(result => {
                    if (isPlatformServer(this.platformId)) {
                        this.transferState.set<StageEventsServiceGetAllResponse>(transferKey, result);
                    }
                });
        }
    }

    public getStageEvent(id: string): Observable<StageEventsServiceGetReponse> {
        const transferKey = makeStateKey(`event/${id}`);
        if(this.transferState.hasKey(transferKey)) {
            let result = this.transferState.get<StageEventsServiceGetReponse>(transferKey, null);
            this.transferState.remove(transferKey);
            return Observable.of(result);
        } else {        
            return this.http.get(`${this.configuration.BaseUrl}/api/events/${id}`)
                .map((response: any) => {
                    return {
                        event: response
                    }
                })
                .catch(handleHttpClientError)
                .do(result => {
                    if (isPlatformServer(this.platformId)) {
                        this.transferState.set<StageEventsServiceGetReponse>(transferKey, result);
                    }
                });
        }
    }

    public updateStageEvent(stageEvent: StageEvent): Observable<BasicServiceResponse> {
        return this.http.patch(`${this.configuration.BaseUrl}/api/events/${stageEvent.id}`, stageEvent)
            .map((response: any) => {
                return {};
            })
            .catch(handleHttpClientError);
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<StageEventsServiceGetReponse> {
        return this.getStageEvent(route.params["id"]);
    }
}
