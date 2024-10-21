import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { Suspense } from 'react';
import RapidReactComponent from "./rr-react-component";
export default class RapidLayoutRenderer extends RapidReactComponent {
    render() {
        const Component = this.props.component;
        const { route, appConfig, suspenseLoader, additionalData } = this.props;
        const suspense = suspenseLoader ? suspenseLoader : appConfig?.getSuspenseLoader();
        return (_jsxs(React.Fragment, { children: [_jsx(Suspense, { fallback: suspense, children: _jsx(Component, { route: route, appConfig: appConfig, additionalData: additionalData }) }), appConfig?.commonOperationView(appConfig, route)] }));
    }
}
