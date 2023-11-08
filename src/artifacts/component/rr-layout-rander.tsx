import React, {Suspense} from 'react';
import RapidReactComponent from "./rr-react-component";
import {RapidProps, RapidState} from "../interface/rr-mixed-interface";



export interface LayoutRendererProps extends RapidProps {
    component: any
    suspenseLoader?: any
    additionalData?: any
}

export default class RapidLayoutRenderer extends RapidReactComponent<LayoutRendererProps, RapidState> {
    render() {
        const Component = this.props.component;
        const {route, appConfig, suspenseLoader, additionalData} = this.props;
        const suspense = suspenseLoader ? suspenseLoader : appConfig?.getSuspenseLoader();
        return (
            <React.Fragment>
                <Suspense fallback={suspense}>
                    <Component route={route} appConfig={appConfig} additionalData={additionalData}/>
                </Suspense>
                {appConfig?.commonOperationView(appConfig, route)}
            </React.Fragment>
        )
    }
}