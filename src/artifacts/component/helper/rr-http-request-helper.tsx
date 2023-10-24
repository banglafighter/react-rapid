import {HTTPCallback, ParentActionCaller, RapidHTTPCall} from "../../interface/rr-mixed-interface";
import {HTTPLastCalledData} from "../../data/rr-mixed-data";
import RapidAppConfig from "../../config/rr-app-config";
import RapidHTTPManager from "../../processor/http/rr-http-manager";
import RapidHTTRequest from "../../processor/http/rr-http-request";
import {RapidUtil} from "../../utils/rr-util";
import RapidHTTCallback from "../../processor/http/rr-http-callback";
import RapidHTTResponse from "../../processor/http/rr-http-response";

export class RapidHttpRequestHelper {

    private appConfig!: RapidAppConfig
    private parentComponent: any
    private lastCalledData!: HTTPLastCalledData
    private parentActionCaller?: ParentActionCaller;
    private readonly POST: string = "post";
    private readonly DELETE: string = "delete";
    private readonly PUT: string = "put";
    private readonly GET: string = "get";

    constructor(appConfig: RapidAppConfig, parentActionCaller?: ParentActionCaller, parentComponent?: any) {
        this.appConfig = appConfig
        this.parentActionCaller = parentActionCaller
        this.parentComponent = parentComponent
    }

    private showLoader() {
        this.parentActionCaller?.call("showLoader")
    }

    private hideLoader() {
        this.parentActionCaller?.call("hideLoader")
    }

    private resumeAbleCallback(success?: HTTPCallback, failed?: HTTPCallback): RapidHTTCallback {
        return {
            before: (response: RapidHTTResponse) => {
                this.showLoader();
            },
            success: (response: RapidHTTResponse) => {
                if (success !== undefined) {
                    success.callback(response);
                }
            },
            failed: (response: RapidHTTResponse) => {
                if (failed !== undefined) {
                    failed.callback(response);
                }
            },
            finally: () => {
                this.hideLoader();
            }
        };
    }

    public resumeHttpRequest(request: RapidHTTRequest, callback: RapidHTTCallback) {
        switch (request.method) {
            case this.POST :
                this.httpManager().post(request, callback);
                break;
            case this.DELETE :
                this.httpManager().delete(request, callback);
                break;
            case this.PUT :
                this.httpManager().put(request, callback);
                break;
            case this.GET :
                this.httpManager().get(request, callback);
                break;
        }
    }

    private resumeLastFailedRequest(): void {
        if (this.lastCalledData) {
            let lastCallData: HTTPLastCalledData = this.lastCalledData;
            if (lastCallData.request && lastCallData.resumeAbleCallback) {
                this.resumeHttpRequest(lastCallData.request, lastCallData.resumeAbleCallback)
            }
        }
    }

    private renewAuthorizationAndResumeLastCall(): void {
        const _this = this;
        let trHttpCall: RapidHTTPCall = {
            resume(): void {
                _this.resumeLastFailedRequest();
            },
            getComponent(): any {
                return _this.parentComponent;
            },
            getHttpRequestHelper(): any {
                return _this;
            }
        };
        this.appConfig.renewAuthorization(trHttpCall);
    }

    private getCallBackHandler(request: RapidHTTRequest, success?: HTTPCallback, failed?: HTTPCallback): RapidHTTCallback {
        let resumeAbleCallback = this.resumeAbleCallback(success, failed);
        let lastCall: HTTPLastCalledData = {
            resumeAbleCallback: resumeAbleCallback,
            request: request
        };

        const _this = this;
        this.lastCalledData = lastCall
        let callback: RapidHTTCallback = {
            before: (response: RapidHTTResponse) => {
                if (request.isShowLoader) {
                    _this.showLoader();
                }
            },
            success: (response: RapidHTTResponse) => {
                if (this.appConfig.isAuthorized(response)) {
                    resumeAbleCallback.success(response);
                } else {
                    _this.renewAuthorizationAndResumeLastCall();
                }
            },
            failed: (response: RapidHTTResponse) => {
                if (this.appConfig.isAuthorized(response)) {
                    resumeAbleCallback.failed(response);
                } else {
                    _this.renewAuthorizationAndResumeLastCall();
                }
            },
            finally: () => {
                if (request.isShowLoader) {
                    _this.hideLoader();
                }
            }
        };
        return callback;
    }

    private httpManager(): RapidHTTPManager {
        return this.appConfig.getHTTPManager();
    }

    private httpRequestObject(relativeURL: string, requestConfig?: RapidHTTRequest): RapidHTTRequest {
        let request: RapidHTTRequest = new RapidHTTRequest();
        if (requestConfig) {
            request = requestConfig
        }
        request.baseURL = this.appConfig.getBaseURL();
        request.url = relativeURL;
        let authCallback = this.appConfig.authCallback();
        if (authCallback) {
            request.authCallback = this.appConfig.authCallback();
        }
        return request;
    }

    private convertDataObjectToFormData(data: any) {
        let formData = new FormData();
        if (data) {
            for (let key in data) {
                if (data[key] instanceof Array) {
                    let items: Array<any> = data[key];
                    items.forEach((value: any) => {
                        formData.append(key, value);
                    })
                } else {
                    formData.append(key, data[key]);
                }
            }
        }
        return formData
    }

    public post(url: string, data: object, success?: HTTPCallback, failed?: HTTPCallback, requestConfig?: RapidHTTRequest): void {
        let request: RapidHTTRequest = this.httpRequestObject(url, requestConfig);
        request.method = this.POST;
        request.requestData = data;
        let callback: RapidHTTCallback = this.getCallBackHandler(request, success, failed);
        this.httpManager().post(request, callback);
    }

    public postMultipartFormDataUsingData(url: string, data: any, success?: HTTPCallback, failed?: HTTPCallback, onUploadProgress?: any, requestConfig?: RapidHTTRequest): void {
        let formData = this.convertDataObjectToFormData(data);
        this.postMultipartFormData(
            url,
            formData,
            success,
            failed,
            onUploadProgress,
            requestConfig
        )
    }

    public postMultipartFormData(url: string, formData: FormData, success?: HTTPCallback, failed?: HTTPCallback, onUploadProgress?: any, requestConfig?: RapidHTTRequest): void {
        let request: RapidHTTRequest = this.httpRequestObject(url, requestConfig);
        request.headers = request.headers = RapidUtil.addDataToObject(request.headers, 'Content-Type', 'multipart/form-data');
        request.method = this.POST;
        request.onDownloadProgress = onUploadProgress;
        request.requestData = formData
        let callback: RapidHTTCallback = this.getCallBackHandler(request, success, failed);
        this.httpManager().post(request, callback);
    }

    public postFile(url: string, data: object, success?: HTTPCallback, failed?: HTTPCallback, onUploadProgress?: any, requestConfig?: RapidHTTRequest): void {
        let request: RapidHTTRequest = this.httpRequestObject(url, requestConfig);
        request.headers = request.headers = RapidUtil.addDataToObject(request.headers, 'Content-Type', 'multipart/form-data');
        request.method = this.POST;
        request.onDownloadProgress = onUploadProgress;
        request.requestData = this.convertDataObjectToFormData(data);
        let callback: RapidHTTCallback = this.getCallBackHandler(request, success, failed);
        this.httpManager().post(request, callback);
    }

    public postObjectToFormData(url: string, data: any, success?: HTTPCallback, failed?: HTTPCallback): void {
        let request: RapidHTTRequest = this.httpRequestObject(url);
        request.method = this.POST;
        request.requestData = this.convertDataObjectToFormData(data);
        let callback: RapidHTTCallback = this.getCallBackHandler(request, success, failed);
        this.httpManager().post(request, callback);
    }

    public postFormData(url: string, formData: FormData, success?: HTTPCallback, failed?: HTTPCallback, requestConfig?: RapidHTTRequest): void {
        let request: RapidHTTRequest = this.httpRequestObject(url, requestConfig);
        request.method = this.POST;
        request.requestData = formData;
        let callback: RapidHTTCallback = this.getCallBackHandler(request, success, failed);
        this.httpManager().post(request, callback);
    }

    public postJson(url: string, data: any, success?: HTTPCallback, failed?: HTTPCallback, requestConfig?: RapidHTTRequest): void {
        let request: RapidHTTRequest = this.httpRequestObject(url, requestConfig);
        request.method = this.POST;
        if (data instanceof Map) {
            request.requestData = RapidUtil.mapToObject(data);
        } else {
            request.requestData = data
        }
        request.requestData = RapidUtil.makeDataObject(request.requestData);
        let callback: RapidHTTCallback = this.getCallBackHandler(request, success, failed);
        this.httpManager().postJSON(request, callback);
    }

    public putJson(url: string, data: any, success?: HTTPCallback, failed?: HTTPCallback, requestConfig?: RapidHTTRequest): void {
        let request: RapidHTTRequest = this.httpRequestObject(url, requestConfig);
        request.method = this.PUT;
        if (data instanceof Map) {
            request.requestData = RapidUtil.mapToObject(data);
        } else {
            request.requestData = data
        }
        request.requestData = RapidUtil.makeDataObject(request.requestData);
        let callback: RapidHTTCallback = this.getCallBackHandler(request, success, failed);
        this.httpManager().putJSON(request, callback);
    }

    public delete(url: string, success?: HTTPCallback, failed?: HTTPCallback, requestConfig?: RapidHTTRequest): void {
        let request: RapidHTTRequest = this.httpRequestObject(url, requestConfig);
        request.method = this.DELETE;
        let callback: RapidHTTCallback = this.getCallBackHandler(request, success, failed);
        this.httpManager().delete(request, callback);
    }

    public deleteByJson(url: string, data: any, success?: HTTPCallback, failed?: HTTPCallback, requestConfig?: RapidHTTRequest): void {
        let request: RapidHTTRequest = this.httpRequestObject(url, requestConfig);
        request.method = this.DELETE;
        if (data instanceof Map) {
            request.requestData = RapidUtil.mapToObject(data);
        } else {
            request.requestData = data
        }
        request.requestData = RapidUtil.makeDataObject(request.requestData);
        let callback: RapidHTTCallback = this.getCallBackHandler(request, success, failed);
        this.httpManager().deleteJSON(request, callback);
    }

    public getByParams(url: string, queryParams?: any, success?: HTTPCallback, failed?: HTTPCallback, requestConfig?: RapidHTTRequest): void {
        let request: RapidHTTRequest = this.httpRequestObject(url, requestConfig);
        request.params = queryParams
        request.method = this.GET;
        let callback: RapidHTTCallback = this.getCallBackHandler(request, success, failed);
        this.httpManager().get(request, callback);
    }

    public getRequest(url: string, success?: HTTPCallback, failed?: HTTPCallback, requestConfig?: RapidHTTRequest): void {
        let request: RapidHTTRequest = this.httpRequestObject(url, requestConfig);
        request.method = this.GET;
        let callback: RapidHTTCallback = this.getCallBackHandler(request, success, failed);
        this.httpManager().get(request, callback);
    }

}