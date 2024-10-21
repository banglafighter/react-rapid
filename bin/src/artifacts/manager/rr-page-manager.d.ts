import RapidAppConfig from "../config/rr-app-config";
import RapidReactComponent from "../component/rr-react-component";
import { RapidPageManagerProps } from "../interface/rr-page-manager-props";
import { RapidPageManagerState } from "../interface/rr-mixed-interface";
declare global {
    interface Window {
        appConfig: RapidAppConfig;
    }
}
export default class RapidPageManager extends RapidReactComponent<RapidPageManagerProps, RapidPageManagerState> {
    static defaultProps: {
        routeType: string;
    };
    constructor(props: RapidPageManagerProps);
    private getRouter;
    private generateURL;
    render(): import("react/jsx-runtime").JSX.Element;
}
