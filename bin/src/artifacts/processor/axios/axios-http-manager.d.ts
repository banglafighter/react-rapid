import RapidHTTPManager from "../http/rr-http-manager";
import RapidHTTRequest from "../http/rr-http-request";
import RapidHTTCallback from "../http/rr-http-callback";
export default class AxiosHTTPManager implements RapidHTTPManager {
    private processParams;
    private addHeader;
    private addJSONHeader;
    private addMultipartHeader;
    private createResponse;
    private processErrorResponse;
    private httpCall;
    delete(request: RapidHTTRequest, callback: RapidHTTCallback): void;
    deleteJSON(request: RapidHTTRequest, callback: RapidHTTCallback): void;
    put(request: RapidHTTRequest, callback: RapidHTTCallback): void;
    putJSON(request: RapidHTTRequest, callback: RapidHTTCallback): void;
    get(request: RapidHTTRequest, callback: RapidHTTCallback): void;
    post(request: RapidHTTRequest, callback: RapidHTTCallback): void;
    postJSON(request: RapidHTTRequest, callback: RapidHTTCallback): void;
}
