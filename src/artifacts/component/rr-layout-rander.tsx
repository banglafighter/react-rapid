import React, {Suspense} from 'react';
import RapidReactComponent from "./rr-react-component";
import {RapidProps, RapidState} from "../interface/rr-mixed-interface";



export interface LayoutRendererProps extends RapidProps {
    component: any
    suspenseLoader?: any
    customOperation?: any
}

export default class RapidLayoutRenderer extends RapidReactComponent<LayoutRendererProps, RapidState> {
    render() {
        const Component = this.props.component;
        const {route, appConfig, suspenseLoader, customOperation} = this.props;
        const suspense = suspenseLoader ? suspenseLoader : appConfig?.getSuspenseLoader();
        return (
            <React.Fragment>
                <Suspense fallback={suspense}>
                    <Component route={route} appConfig={appConfig} customOperation={customOperation}/>
                </Suspense>
                {appConfig?.commonOperationView(appConfig, route)}
            </React.Fragment>
        )
    }
}