import {RapidProps} from "./rr-mixed-interface";
import RapidAppConfig from "../config/rr-app-config";
import RapidURLMapping from "../config/rr-url-mapping";
import {RapidAppContextProps} from "../config/rr-app-context";


export interface RapidPageManagerProps extends RapidProps {
    urlMapping: RapidURLMapping;
    appConfig: RapidAppConfig;
    contextProps?: RapidAppContextProps
}