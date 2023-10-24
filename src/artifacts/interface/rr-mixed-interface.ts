import RapidHTTResponse from "../processor/http/rr-http-response";
import RapidAppConfig from "../config/rr-app-config";
import {RapidMessageData} from "../data/rr-message-data";


export interface RapidProps {
    appConfig?: RapidAppConfig
    route?: any
}
export interface RapidState { }
export interface HTTPCallback { callback(response: RapidHTTResponse): void; }
export interface RapidPageManagerState extends RapidState {}

export interface CustomValidation {
    validate(fieldName: string, value: any, formData: { [key: string]: any }): RapidMessageData;
}

export interface RapidHTTPCall {
    resume(): void;
    getComponent(): any;
    getHttpRequestHelper(): any;
}

export interface RapidInputEvent {
    fire(event: any): void;
}

export interface ParentActionCaller {
    call(actionName?: string, data?: any): void;
}
