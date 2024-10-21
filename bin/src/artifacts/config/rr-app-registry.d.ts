import RapidURLMapping from "./rr-url-mapping";
import { RapidAppContextProps } from "./rr-app-context";
import RapidAppConfig from "./rr-app-config";
export default abstract class RapidAppRegistry {
    private rapidURLMapping;
    private rapidAppConfig;
    private rapidAppContextProps?;
    constructor();
    getURLMapping(): RapidURLMapping;
    getAppConfig(): RapidAppConfig;
    getContextProps(): RapidAppContextProps | undefined;
    private initInternalThings;
    abstract initURLMapping(): RapidURLMapping;
    abstract initAppConfig(): RapidAppConfig;
    abstract initContextProps(): RapidAppContextProps | undefined;
    abstract register(urlMapping: RapidURLMapping, appConfig: RapidAppConfig): void;
}
