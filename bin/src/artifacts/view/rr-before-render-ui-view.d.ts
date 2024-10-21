import RapidReactComponent from "../component/rr-react-component";
import { RapidState } from "../interface/rr-mixed-interface";
import RapidComponentState from "../component/rr-component-state";
declare class Props {
    componentState?: RapidComponentState;
    component?: any;
}
export default class RapidBeforeRenderUIView extends RapidReactComponent<Props, RapidState> {
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
