import AxiosHTTPManager from "../processor/axios/axios-http-manager";
import React, {lazy} from "react";
import RapidComponentState from "../component/rr-component-state";
import RapidHTTResponse from "../processor/http/rr-http-response";
import RapidHTTAuthCallback from "../processor/http/rr-http-auth-callback";
import RapidSuspenseView from "../view/rr-suspense-view";
import RapidNotFoundView from "../view/rr-not-found-view";
import {RapidHTTPCall} from "../interface/rr-mixed-interface";
import RapidCommonOperationView from "../view/rr-common-operation-view";
import RapidHTTPManager from "../processor/http/rr-http-manager";


const RapidBeforeRenderUIView = lazy(() => import('../view/rr-before-render-ui-view'));


export default class RapidAppConfig {

    private generalConfig: { [key: string]: any } = {};
    public pageTitle: string = "Rapid React"
    public pageTitlePostFix?: string = undefined
    public staticURL: string = ""

    public getBeforeRenderUIView(componentState: RapidComponentState, component: any) {
        return (<RapidBeforeRenderUIView componentState={componentState} component={component}/>)
    }

    public commonOperationView(appConfig?: RapidAppConfig, route?: any) {
        return (<RapidCommonOperationView appConfig={appConfig} route={route}/>)
    }

    public getNotFoundView() {
        return (<RapidNotFoundView/>)
    }

    public getSuspenseLoader() {
        return (<RapidSuspenseView/>)
    }

    public getHTTPManager(): RapidHTTPManager {
        return new AxiosHTTPManager();
    }

    public authCallback(): RapidHTTAuthCallback | undefined {
        return undefined;
    }

    public getBaseURL(): string {
        return "";
    }

    public isAuthorized(response?: RapidHTTResponse): boolean {
        return true;
    }

    public renewAuthorization(pfHttpCall: RapidHTTPCall): void {
        pfHttpCall.resume();
    }

    public addToGeneralConfig(key: string, value: any) {
        this.generalConfig[key] = value
    }

    public getFromGeneralConfig(key: string, defaultValue: any = undefined) {
        if (this.generalConfig[key]) {
            return this.generalConfig[key]
        }
        return defaultValue
    }

}