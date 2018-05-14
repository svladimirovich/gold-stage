import { HttpErrorResponse } from "@angular/common/http";
import { Observable } from 'rxjs/Rx';

export interface BasicServiceResponse {
    errorCode?: number;
    errorMessage?: string;
}

export function handleHttpClientError(response: HttpErrorResponse): Observable<BasicServiceResponse> {
    return Observable.of({
        errorCode: response.status,
        errorMessage: (response.error && response.error.errorMessage) ? response.error.errorMessage : response.message,
    });
}
