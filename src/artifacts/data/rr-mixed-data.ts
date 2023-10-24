import RapidHTTCallback from "../processor/http/rr-http-callback";
import RapidHTTRequest from "../processor/http/rr-http-request";


export enum SortDirection {
    ascending = 'asc',
    descending = 'desc',
    neutral = 'neutral'
}

export interface HTTPLastCalledData {
    resumeAbleCallback?: RapidHTTCallback;
    request?: RapidHTTRequest;
}