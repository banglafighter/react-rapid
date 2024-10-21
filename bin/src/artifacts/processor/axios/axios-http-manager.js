import axios from 'axios';
import { RapidHTTPConst } from "../http/rr-http-const";
export default class AxiosHTTPManager {
    processParams(request) {
        if (request.authCallback !== undefined) {
            request = request.authCallback.process(request);
        }
        let processedRequest = {
            url: request.url,
            baseURL: request.baseURL,
            method: request.method,
            data: request.requestData,
            params: request.params,
            timeout: request.timeoutMS,
            onUploadProgress: request.onUploadProgress,
            onDownloadProgress: request.onDownloadProgress,
        };
        if (request.headers !== undefined) {
            processedRequest.headers = request.headers;
        }
        return processedRequest;
    }
    addHeader(headers, key, value) {
        if (headers === undefined) {
            headers = {};
        }
        headers[key] = value;
        return headers;
    }
    addJSONHeader(headers) {
        return this.addHeader(headers, 'Content-Type', 'application/json');
    }
    addMultipartHeader(headers) {
        return this.addHeader(headers, 'Content-Type', 'multipart/form-data');
    }
    createResponse(isSuccess, response) {
        return {
            isSuccess: isSuccess,
            httpCode: response.status,
            responseData: response.data,
            headers: response.headers,
            others: response.request,
            optional1: response.statusText,
        };
    }
    processErrorResponse(error) {
        if (error.response === undefined) {
            let sentResponse = {
                isSuccess: false,
                message: error.message,
            };
            return sentResponse;
        }
        return this.createResponse(false, error.response);
    }
    httpCall(request, callback) {
        callback.before(request);
        axios(this.processParams(request)).then((response) => {
            callback.success(this.createResponse(true, response));
        }).catch((error) => {
            callback.failed(this.processErrorResponse(error));
        }).finally(() => {
            callback.finally();
        });
    }
    delete(request, callback) {
        request.method = RapidHTTPConst.DELETE;
        this.httpCall(request, callback);
    }
    deleteJSON(request, callback) {
        request.method = RapidHTTPConst.DELETE;
        request.headers = this.addJSONHeader(request.headers);
        request.requestData = JSON.stringify(request.requestData);
        this.httpCall(request, callback);
    }
    put(request, callback) {
        request.method = RapidHTTPConst.PUT;
        this.httpCall(request, callback);
    }
    putJSON(request, callback) {
        request.method = RapidHTTPConst.PUT;
        request.headers = this.addJSONHeader(request.headers);
        request.requestData = JSON.stringify(request.requestData);
        this.httpCall(request, callback);
    }
    get(request, callback) {
        request.method = RapidHTTPConst.GET;
        this.httpCall(request, callback);
    }
    post(request, callback) {
        request.method = RapidHTTPConst.POST;
        this.httpCall(request, callback);
    }
    postJSON(request, callback) {
        request.method = RapidHTTPConst.POST;
        request.requestData = JSON.stringify(request.requestData);
        request.headers = this.addJSONHeader(request.headers);
        this.httpCall(request, callback);
    }
}
