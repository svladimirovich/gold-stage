import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { TransferState, makeStateKey } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';

import { ClientConfiguration } from '../../../config.client';
import { BasicServiceResponse, handleHttpClientError } from './common';
import { StageEvent } from '../../models/events';
import { isPlatformServer } from '@angular/common';

interface StageEventsServiceGetAllResponse extends BasicServiceResponse {
    events?: Array<StageEvent>;
}

@Injectable()
export class StageEventsService {

    private configuration: ClientConfiguration = new ClientConfiguration();

    constructor(private http: HttpClient,
                @Inject(PLATFORM_ID) private platformId,
                private transferState: TransferState) { }

    public getAllStageEvents(): Observable<StageEventsServiceGetAllResponse> {
        // TODO: actially we should check for authenticated user
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
}
