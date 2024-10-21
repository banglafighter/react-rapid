import RapidURLMapping from "./rr-url-mapping";
import RapidAppConfig from "./rr-app-config";
export default class RapidAppRegistry {
    constructor() {
        this.rapidURLMapping = new RapidURLMapping();
        this.rapidAppConfig = new RapidAppConfig();
        this.initInternalThings();
    }
    getURLMapping() {
        return this.rapidURLMapping;
    }
    getAppConfig() {
        return this.rapidAppConfig;
    }
    getContextProps() {
        return this.rapidAppContextProps;
    }
    initInternalThings() {
        this.rapidAppConfig = this.initAppConfig();
        this.rapidURLMapping = this.initURLMapping();
        this.rapidAppContextProps = this.initContextProps();
        this.register(this.rapidURLMapping, this.rapidAppConfig);
    }
}
