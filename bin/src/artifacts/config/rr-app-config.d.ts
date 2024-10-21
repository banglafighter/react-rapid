import RapidComponentState from "../component/rr-component-state";
import RapidHTTResponse from "../processor/http/rr-http-response";
import RapidHTTAuthCallback from "../processor/http/rr-http-auth-callback";
import { RapidHTTPCall } from "../interface/rr-mixed-interface";
import RapidHTTPManager from "../processor/http/rr-http-manager";
export default class RapidAppConfig {
    private generalConfig;
    pageTitle: string;
    pageTitlePostFix?: string;
    staticURL: string;
    getBeforeRenderUIView(componentState: RapidComponentState, component: any): import("react/jsx-runtime").JSX.Element;
    commonOperationView(appConfig?: RapidAppConfig, route?: any): import("react/jsx-runtime").JSX.Element;
    getNotFoundView(): import("react/jsx-runtime").JSX.Element;
    getSuspenseLoader(): import("react/jsx-runtime").JSX.Element;
    getHTTPManager(): RapidHTTPManager;
    authCallback(): RapidHTTAuthCallback | undefined;
    getBaseURL(): string;
    isAuthorized(response?: RapidHTTResponse): boolean;
    renewAuthorization(RapidHttpCall: RapidHTTPCall): void;
    addToGeneralConfig(key: string, value: any): void;
    getFromGeneralConfig(key: string, defaultValue?: any): any;
}
