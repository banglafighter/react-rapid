import RapidHTTResponse from "./rr-http-response";

export default interface RapidHTTCallback {
    before(response: RapidHTTResponse): void;
    success(response: RapidHTTResponse): void;
    failed(response: RapidHTTResponse): void;
    finally(): void;
}