import { RapidProps } from "../interface/rr-mixed-interface";
import RapidComponentState from "./rr-component-state";
import RapidComponent from "./rr-component";
export default class RapidSysComponent<P extends RapidProps, S extends RapidComponentState> extends RapidComponent<P, S> {
    constructor(props: any);
    renderUI(): import("react/jsx-runtime").JSX.Element;
    render(): import("react/jsx-runtime").JSX.Element;
}
