export interface Response {
    statusCode: number,
    message?: string
    errorMessage?: string,
}

export class ErrorResponse implements Response {
    constructor(public statusCode: number,
                public errorMessage: string) {}
}

export class OkResponse implements Response {
    constructor(public statusCode: number,
                public message?: string) {}
}