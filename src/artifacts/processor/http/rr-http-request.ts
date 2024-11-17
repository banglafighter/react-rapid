import RapidHTTAuthCallback from "./rr-http-auth-callback";

export default class RapidHTTRequest {

    public url?: string;
    public method?: any;
    public baseURL?: string;
    public requestData?: any;
    public params?: any;
    public headers?: any;
    public responseType?: string;
    public timeoutMS: number = 60000;
    public isShowLoader: boolean = true;
    public authCallback?: RapidHTTAuthCallback;
    public onUploadProgress?: (progressEvent: any) => void;
    public onDownloadProgress?: (progressEvent: any) => void;

}