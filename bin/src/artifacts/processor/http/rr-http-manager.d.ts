import RapidHTTRequest from "./rr-http-request";
import RapidHTTCallback from "./rr-http-callback";
export default interface RapidHTTPManager {
    postJSON(request: RapidHTTRequest, callback: RapidHTTCallback): void;
    post(request: RapidHTTRequest, callback: RapidHTTCallback): void;
    get(request: RapidHTTRequest, callback: RapidHTTCallback): void;
    deleteJSON(request: RapidHTTRequest, callback: RapidHTTCallback): void;
    delete(request: RapidHTTRequest, callback: RapidHTTCallback): void;
    putJSON(request: RapidHTTRequest, callback: RapidHTTCallback): void;
    put(request: RapidHTTRequest, callback: RapidHTTCallback): void;
}
