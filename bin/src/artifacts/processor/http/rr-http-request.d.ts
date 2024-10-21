import RapidHTTAuthCallback from "./rr-http-auth-callback";
export default class RapidHTTRequest {
    url?: string;
    method?: any;
    baseURL?: string;
    requestData?: any;
    params?: any;
    headers?: any;
    timeoutMS: number;
    isShowLoader: boolean;
    authCallback?: RapidHTTAuthCallback;
    onUploadProgress?: (progressEvent: any) => void;
    onDownloadProgress?: (progressEvent: any) => void;
}
