import RapidHTTRequest from "../../processor/http/rr-http-request";
import { RapidUtil } from "../../utils/rr-util";
export class RapidHttpRequestHelper {
    constructor(appConfig, parentActionCaller, parentComponent) {
        this.POST = "post";
        this.DELETE = "delete";
        this.PUT = "put";
        this.GET = "get";
        this.appConfig = appConfig;
        this.parentActionCaller = parentActionCaller;
        this.parentComponent = parentComponent;
    }
    showLoader() {
        this.parentActionCaller?.call("showLoader");
    }
    hideLoader() {
        this.parentActionCaller?.call("hideLoader");
    }
    resumeAbleCallback(success, failed) {
        return {
            before: (response) => {
                this.showLoader();
            },
            success: (response) => {
                if (success !== undefined) {
                    success.callback(response);
                }
            },
            failed: (response) => {
                if (failed !== undefined) {
                    failed.callback(response);
                }
            },
            finally: () => {
                this.hideLoader();
            }
        };
    }
    resumeHttpRequest(request, callback) {
        switch (request.method) {
            case this.POST:
                this.httpManager().post(request, callback);
                break;
            case this.DELETE:
                this.httpManager().delete(request, callback);
                break;
            case this.PUT:
                this.httpManager().put(request, callback);
                break;
            case this.GET:
                this.httpManager().get(request, callback);
                break;
        }
    }
    resumeLastFailedRequest() {
        if (this.lastCalledData) {
            let lastCallData = this.lastCalledData;
            if (lastCallData.request && lastCallData.resumeAbleCallback) {
                this.resumeHttpRequest(lastCallData.request, lastCallData.resumeAbleCallback);
            }
        }
    }
    renewAuthorizationAndResumeLastCall() {
        const _this = this;
        let trHttpCall = {
            resume() {
                _this.resumeLastFailedRequest();
            },
            getComponent() {
                return _this.parentComponent;
            },
            getHttpRequestHelper() {
                return _this;
            }
        };
        this.appConfig.renewAuthorization(trHttpCall);
    }
    getCallBackHandler(request, success, failed) {
        let resumeAbleCallback = this.resumeAbleCallback(success, failed);
        let lastCall = {
            resumeAbleCallback: resumeAbleCallback,
            request: request
        };
        const _this = this;
        this.lastCalledData = lastCall;
        let callback = {
            before: (response) => {
                if (request.isShowLoader) {
                    _this.showLoader();
                }
            },
            success: (response) => {
                if (this.appConfig.isAuthorized(response)) {
                    resumeAbleCallback.success(response);
                }
                else {
                    _this.renewAuthorizationAndResumeLastCall();
                }
            },
            failed: (response) => {
                if (this.appConfig.isAuthorized(response)) {
                    resumeAbleCallback.failed(response);
                }
                else {
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
    httpManager() {
        return this.appConfig.getHTTPManager();
    }
    httpRequestObject(relativeURL, requestConfig) {
        let request = new RapidHTTRequest();
        if (requestConfig) {
            request = requestConfig;
        }
        request.baseURL = this.appConfig.getBaseURL();
        request.url = relativeURL;
        let authCallback = this.appConfig.authCallback();
        if (authCallback) {
            request.authCallback = this.appConfig.authCallback();
        }
        return request;
    }
    convertDataObjectToFormData(data) {
        let formData = new FormData();
        if (data) {
            for (let key in data) {
                if (data[key] instanceof Array) {
                    let items = data[key];
                    items.forEach((value) => {
                        formData.append(key, value);
                    });
                }
                else {
                    formData.append(key, data[key]);
                }
            }
        }
        return formData;
    }
    post(url, data, success, failed, requestConfig) {
        let request = this.httpRequestObject(url, requestConfig);
        request.method = this.POST;
        request.requestData = data;
        let callback = this.getCallBackHandler(request, success, failed);
        this.httpManager().post(request, callback);
    }
    postMultipartFormDataUsingData(url, data, success, failed, onUploadProgress, requestConfig) {
        let formData = this.convertDataObjectToFormData(data);
        this.postMultipartFormData(url, formData, success, failed, onUploadProgress, requestConfig);
    }
    postMultipartFormData(url, formData, success, failed, onUploadProgress, requestConfig) {
        let request = this.httpRequestObject(url, requestConfig);
        request.headers = request.headers = RapidUtil.addDataToObject(request.headers, 'Content-Type', 'multipart/form-data');
        request.method = this.POST;
        request.onDownloadProgress = onUploadProgress;
        request.requestData = formData;
        let callback = this.getCallBackHandler(request, success, failed);
        this.httpManager().post(request, callback);
    }
    postFile(url, data, success, failed, onUploadProgress, requestConfig) {
        let request = this.httpRequestObject(url, requestConfig);
        request.headers = request.headers = RapidUtil.addDataToObject(request.headers, 'Content-Type', 'multipart/form-data');
        request.method = this.POST;
        request.onDownloadProgress = onUploadProgress;
        request.requestData = this.convertDataObjectToFormData(data);
        let callback = this.getCallBackHandler(request, success, failed);
        this.httpManager().post(request, callback);
    }
    postObjectToFormData(url, data, success, failed) {
        let request = this.httpRequestObject(url);
        request.method = this.POST;
        request.requestData = this.convertDataObjectToFormData(data);
        let callback = this.getCallBackHandler(request, success, failed);
        this.httpManager().post(request, callback);
    }
    postFormData(url, formData, success, failed, requestConfig) {
        let request = this.httpRequestObject(url, requestConfig);
        request.method = this.POST;
        request.requestData = formData;
        let callback = this.getCallBackHandler(request, success, failed);
        this.httpManager().post(request, callback);
    }
    postJson(url, data, success, failed, requestConfig) {
        let request = this.httpRequestObject(url, requestConfig);
        request.method = this.POST;
        if (data instanceof Map) {
            request.requestData = RapidUtil.mapToObject(data);
        }
        else {
            request.requestData = data;
        }
        request.requestData = RapidUtil.makeDataObject(request.requestData);
        let callback = this.getCallBackHandler(request, success, failed);
        this.httpManager().postJSON(request, callback);
    }
    putJson(url, data, success, failed, requestConfig) {
        let request = this.httpRequestObject(url, requestConfig);
        request.method = this.PUT;
        if (data instanceof Map) {
            request.requestData = RapidUtil.mapToObject(data);
        }
        else {
            request.requestData = data;
        }
        request.requestData = RapidUtil.makeDataObject(request.requestData);
        let callback = this.getCallBackHandler(request, success, failed);
        this.httpManager().putJSON(request, callback);
    }
    delete(url, success, failed, requestConfig) {
        let request = this.httpRequestObject(url, requestConfig);
        request.method = this.DELETE;
        let callback = this.getCallBackHandler(request, success, failed);
        this.httpManager().delete(request, callback);
    }
    deleteByJson(url, data, success, failed, requestConfig) {
        let request = this.httpRequestObject(url, requestConfig);
        request.method = this.DELETE;
        if (data instanceof Map) {
            request.requestData = RapidUtil.mapToObject(data);
        }
        else {
            request.requestData = data;
        }
        request.requestData = RapidUtil.makeDataObject(request.requestData);
        let callback = this.getCallBackHandler(request, success, failed);
        this.httpManager().deleteJSON(request, callback);
    }
    getByParams(url, queryParams, success, failed, requestConfig) {
        let request = this.httpRequestObject(url, requestConfig);
        request.params = queryParams;
        request.method = this.GET;
        let callback = this.getCallBackHandler(request, success, failed);
        this.httpManager().get(request, callback);
    }
    getRequest(url, success, failed, requestConfig) {
        let request = this.httpRequestObject(url, requestConfig);
        request.method = this.GET;
        let callback = this.getCallBackHandler(request, success, failed);
        this.httpManager().get(request, callback);
    }
}
