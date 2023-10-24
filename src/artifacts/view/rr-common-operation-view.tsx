import RapidSysComponent from "../component/rr-sys-component";
import RapidComponentState from "../component/rr-component-state";
import {RapidProps} from "../interface/rr-mixed-interface";

interface Props extends RapidProps {}

class State extends RapidComponentState {}


export default class RapidCommonOperationView extends RapidSysComponent<Props, State> {

    renderUI() {
        return <></>
    }

}