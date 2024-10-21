import { jsx as _jsx } from "react/jsx-runtime";
import RapidReactComponent from "../component/rr-react-component";
export default class RapidNotFoundView extends RapidReactComponent {
    render() {
        return _jsx("h1", { children: "404 Not Found!!" });
        ;
    }
}
