import RapidReactComponent from "./rr-react-component";
import { RapidProps, RapidState } from "../interface/rr-mixed-interface";
export interface LayoutRendererProps extends RapidProps {
    component: any;
    suspenseLoader?: any;
    additionalData?: any;
}
export default class RapidLayoutRenderer extends RapidReactComponent<LayoutRendererProps, RapidState> {
    render(): import("react/jsx-runtime").JSX.Element;
}
