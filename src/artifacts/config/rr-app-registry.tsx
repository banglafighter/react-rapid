import RapidURLMapping from "./rr-url-mapping";
import {RapidAppContextProps} from "./rr-app-context";
import RapidAppConfig from "./rr-app-config";

export default abstract class RapidAppRegistry {

    private rapidURLMapping: RapidURLMapping = new RapidURLMapping()
    private rapidAppConfig: RapidAppConfig = new RapidAppConfig()
    private rapidAppContextProps?: RapidAppContextProps

    constructor() {
        this.initInternalThings()
    }

    getURLMapping(): RapidURLMapping {
        return this.rapidURLMapping
    }

    getAppConfig(): RapidAppConfig {
        return this.rapidAppConfig
    }

    getContextProps(): RapidAppContextProps | undefined {
        return this.rapidAppContextProps
    }

    private initInternalThings() {
        this.rapidAppConfig = this.initAppConfig()
        this.rapidURLMapping = this.initURLMapping()
        this.rapidAppContextProps = this.initContextProps()
        this.register(this.rapidURLMapping, this.rapidAppConfig)
    }

    abstract initURLMapping(): RapidURLMapping

    abstract initAppConfig(): RapidAppConfig

    abstract initContextProps(): RapidAppContextProps | undefined


    abstract register(urlMapping: RapidURLMapping, appConfig: RapidAppConfig): void

}