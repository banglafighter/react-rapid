import { HTTPCallback, ParentActionCaller } from "../../interface/rr-mixed-interface";
import RapidAppConfig from "../../config/rr-app-config";
import RapidHTTRequest from "../../processor/http/rr-http-request";
import RapidHTTCallback from "../../processor/http/rr-http-callback";
export declare class RapidHttpRequestHelper {
    private appConfig;
    private parentComponent;
    private lastCalledData;
    private parentActionCaller?;
    private readonly POST;
    private readonly DELETE;
    private readonly PUT;
    private readonly GET;
    constructor(appConfig: RapidAppConfig, parentActionCaller?: ParentActionCaller, parentComponent?: any);
    private showLoader;
    private hideLoader;
    private resumeAbleCallback;
    resumeHttpRequest(request: RapidHTTRequest, callback: RapidHTTCallback): void;
    private resumeLastFailedRequest;
    private renewAuthorizationAndResumeLastCall;
    private getCallBackHandler;
    private httpManager;
    private httpRequestObject;
    private convertDataObjectToFormData;
    post(url: string, data: object, success?: HTTPCallback, failed?: HTTPCallback, requestConfig?: RapidHTTRequest): void;
    postMultipartFormDataUsingData(url: string, data: any, success?: HTTPCallback, failed?: HTTPCallback, onUploadProgress?: any, requestConfig?: RapidHTTRequest): void;
    postMultipartFormData(url: string, formData: FormData, success?: HTTPCallback, failed?: HTTPCallback, onUploadProgress?: any, requestConfig?: RapidHTTRequest): void;
    postFile(url: string, data: object, success?: HTTPCallback, failed?: HTTPCallback, onUploadProgress?: any, requestConfig?: RapidHTTRequest): void;
    postObjectToFormData(url: string, data: any, success?: HTTPCallback, failed?: HTTPCallback): void;
    postFormData(url: string, formData: FormData, success?: HTTPCallback, failed?: HTTPCallback, requestConfig?: RapidHTTRequest): void;
    postJson(url: string, data: any, success?: HTTPCallback, failed?: HTTPCallback, requestConfig?: RapidHTTRequest): void;
    putJson(url: string, data: any, success?: HTTPCallback, failed?: HTTPCallback, requestConfig?: RapidHTTRequest): void;
    delete(url: string, success?: HTTPCallback, failed?: HTTPCallback, requestConfig?: RapidHTTRequest): void;
    deleteByJson(url: string, data: any, success?: HTTPCallback, failed?: HTTPCallback, requestConfig?: RapidHTTRequest): void;
    getByParams(url: string, queryParams?: any, success?: HTTPCallback, failed?: HTTPCallback, requestConfig?: RapidHTTRequest): void;
    getRequest(url: string, success?: HTTPCallback, failed?: HTTPCallback, requestConfig?: RapidHTTRequest): void;
}
