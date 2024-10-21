import { RapidProps, RapidState } from "../interface/rr-mixed-interface";
import RapidAppConfig from "../config/rr-app-config";
import { RapidAppContextProps } from "../config/rr-app-context";
import RapidReactComponent from "./rr-react-component";
interface RapidContextProps extends RapidProps {
    appConfig: RapidAppConfig;
    children: any;
    contextProps?: RapidAppContextProps;
}
declare class RapidContextState implements RapidState {
    contextProps: RapidAppContextProps;
}
export default class RapidContextComponent extends RapidReactComponent<RapidContextProps, RapidContextState> {
    state: RapidContextState;
    constructor(props: RapidContextProps);
    componentDidMount(): void;
    private initMethods;
    updatePropsValue(key: any, value: any): void;
    showHideLoader(isShow?: boolean): void;
    updateFlashMessage(isShow: boolean, messageData?: any): void;
    private addToDynamicAction;
    private loadDynamicAction;
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
