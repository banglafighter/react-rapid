import { jsx as _jsx } from "react/jsx-runtime";
import RapidComponent from "./rr-component";
export default class RapidSysComponent extends RapidComponent {
    constructor(props) {
        super(props);
    }
    renderUI() {
        return (_jsx("h1", { children: "Rapid React System Component" }));
    }
    render() {
        this.beforeRenderCall();
        return (this.renderUI());
    }
}
