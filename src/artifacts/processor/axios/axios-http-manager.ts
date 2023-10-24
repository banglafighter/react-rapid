import RapidHTTPManager from "../http/rr-http-manager";
import RapidHTTRequest from "../http/rr-http-request";
import RapidHTTCallback from "../http/rr-http-callback";
import axios, {AxiosError, AxiosResponse} from 'axios';
import {RapidHTTPConst} from "../http/rr-http-const";
import PFHTTResponse from "../http/rr-http-response";


export default class AxiosHTTPManager implements RapidHTTPManager {


    private processParams(request: RapidHTTRequest): any {
        if (request.authCallback !== undefined) {
            request = request.authCallback.process(request);
        }

        let processedRequest: any = {
            url: request.url,
            baseURL: request.baseURL,
            method: request.method,
            data: request.requestData,
            params: request.params,
            timeout: request.timeoutMS,
            onUploadProgress: request.onUploadProgress,
            onDownloadProgress: request.onDownloadProgress,
        }

        if (request.headers !== undefined) {
            processedRequest.headers = request.headers;
        }
        return processedRequest;
    }

    private addHeader(headers: any, key: any, value: any): any {
        if (headers === undefined) {
            headers = {};
        }
        headers[key] = value;
        return headers;
    }

    private addJSONHeader(headers: any): any {
        return this.addHeader(headers, 'Content-Type', 'application/json');
    }

    private addMultipartHeader(headers: any): any {
        return this.addHeader(headers, 'Content-Type', 'multipart/form-data');
    }

    private createResponse(isSuccess: boolean, response: any) {
        return {
            isSuccess: isSuccess,
            httpCode: response.status,
            responseData: response.data,
            headers: response.headers,
            others: response.request,
            optional1: response.statusText,
        }
    }

    private processErrorResponse(error: AxiosError) {
        if (error.response === undefined) {
            let sentResponse: PFHTTResponse = {
                isSuccess: false,
                message: error.message,
            }
            return sentResponse;
        }
        return this.createResponse(false, error.response)
    }


    private httpCall(request: RapidHTTRequest, callback: RapidHTTCallback) {
        callback.before(request);
        axios(this.processParams(request)).then((response: AxiosResponse) => {
            callback.success(this.createResponse(true, response));
        }).catch((error: AxiosError) => {
            callback.failed(this.processErrorResponse(error));
        }).finally(() => {
            callback.finally();
        });
    }


    public delete(request: RapidHTTRequest, callback: RapidHTTCallback): void {
        request.method = RapidHTTPConst.DELETE;
        this.httpCall(request, callback);
    }


    public deleteJSON(request: RapidHTTRequest, callback: RapidHTTCallback): void {
        request.method = RapidHTTPConst.DELETE;
        request.headers = this.addJSONHeader(request.headers);
        request.requestData = JSON.stringify(request.requestData);
        this.httpCall(request, callback);
    }

    public put(request: RapidHTTRequest, callback: RapidHTTCallback): void {
        request.method = RapidHTTPConst.PUT;
        this.httpCall(request, callback);
    }


    public putJSON(request: RapidHTTRequest, callback: RapidHTTCallback): void {
        request.method = RapidHTTPConst.PUT;
        request.headers = this.addJSONHeader(request.headers);
        request.requestData = JSON.stringify(request.requestData);
        this.httpCall(request, callback);
    }


    public get(request: RapidHTTRequest, callback: RapidHTTCallback): void {
        request.method = RapidHTTPConst.GET;
        this.httpCall(request, callback);
    }


    public post(request: RapidHTTRequest, callback: RapidHTTCallback): void {
        request.method = RapidHTTPConst.POST;
        this.httpCall(request, callback);
    }


    public postJSON(request: RapidHTTRequest, callback: RapidHTTCallback): void {
        request.method = RapidHTTPConst.POST;
        request.requestData = JSON.stringify(request.requestData);
        request.headers = this.addJSONHeader(request.headers);
        this.httpCall(request, callback);
    }

}