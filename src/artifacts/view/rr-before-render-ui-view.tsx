import React from 'react';
import RapidReactComponent from "../component/rr-react-component";
import {RapidState} from "../interface/rr-mixed-interface";
import RapidComponentState from "../component/rr-component-state";


class Props {
    componentState?: RapidComponentState;
    component?: any;
}


export default class RapidBeforeRenderUIView extends RapidReactComponent<Props, RapidState> {

    render() {
        return <React.Fragment/>;
    }

}