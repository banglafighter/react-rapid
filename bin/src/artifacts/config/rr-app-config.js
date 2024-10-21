import { jsx as _jsx } from "react/jsx-runtime";
import AxiosHTTPManager from "../processor/axios/axios-http-manager";
import { lazy } from "react";
import RapidSuspenseView from "../view/rr-suspense-view";
import RapidNotFoundView from "../view/rr-not-found-view";
import RapidCommonOperationView from "../view/rr-common-operation-view";
const RapidBeforeRenderUIView = lazy(() => import('../view/rr-before-render-ui-view'));
export default class RapidAppConfig {
    constructor() {
        this.generalConfig = {};
        this.pageTitle = "Rapid React";
        this.pageTitlePostFix = undefined;
        this.staticURL = "";
    }
    getBeforeRenderUIView(componentState, component) {
        return (_jsx(RapidBeforeRenderUIView, { componentState: componentState, component: component }));
    }
    commonOperationView(appConfig, route) {
        return (_jsx(RapidCommonOperationView, { appConfig: appConfig, route: route }));
    }
    getNotFoundView() {
        return (_jsx(RapidNotFoundView, {}));
    }
    getSuspenseLoader() {
        return (_jsx(RapidSuspenseView, {}));
    }
    getHTTPManager() {
        return new AxiosHTTPManager();
    }
    authCallback() {
        return undefined;
    }
    getBaseURL() {
        return "";
    }
    isAuthorized(response) {
        return true;
    }
    renewAuthorization(RapidHttpCall) {
        RapidHttpCall.resume();
    }
    addToGeneralConfig(key, value) {
        this.generalConfig[key] = value;
    }
    getFromGeneralConfig(key, defaultValue = undefined) {
        if (this.generalConfig[key]) {
            return this.generalConfig[key];
        }
        return defaultValue;
    }
}
