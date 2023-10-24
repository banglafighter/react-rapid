import React from 'react';
import {RapidProps} from "../interface/rr-mixed-interface";
import RapidComponentState from "./rr-component-state";
import RapidComponent from "./rr-component";

export default class RapidSysComponent<P extends RapidProps, S extends RapidComponentState> extends RapidComponent<P, S> {


    constructor(props: any) {
        super(props);
    }

    public renderUI() {
        return (
            <h1>Rapid React System Component</h1>
        );
    }


    render() {
        this.beforeRenderCall()
        return (this.renderUI())
    }

}