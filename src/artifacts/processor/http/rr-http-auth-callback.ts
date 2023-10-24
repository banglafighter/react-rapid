import RapidHTTRequest from "./rr-http-request";

export default interface RapidHTTAuthCallback {
    process(request: RapidHTTRequest): RapidHTTRequest;
}