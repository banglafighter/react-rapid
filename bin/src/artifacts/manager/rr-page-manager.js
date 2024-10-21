import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter, HashRouter, Route, Switch } from "react-router-dom";
import RapidContextComponent from "../component/rr-context-component";
import RapidReactComponent from "../component/rr-react-component";
class RapidPageManager extends RapidReactComponent {
    constructor(props) {
        super(props);
        window.appConfig = this.props.appConfig;
    }
    getRouter(pageInfoData, Layout, index) {
        const { appConfig } = this.props;
        let pageKey = index;
        if (pageInfoData.pageKey) {
            pageKey = pageInfoData.pageKey;
        }
        return (_jsx(Route, { exact: true, path: pageInfoData.relativeURL, render: (route) => {
                return (_jsx(Layout, { component: pageInfoData.component, route: route, appConfig: appConfig, additionalData: pageInfoData.additionalData }));
            } }, pageKey));
    }
    generateURL(pageInfoDataList, layoutData, index) {
        return pageInfoDataList.map((pageInfoData, nestedIndex) => {
            if (pageInfoData.isActive) {
                return this.getRouter(pageInfoData, layoutData.layout, index);
            }
        });
    }
    render() {
        const { urlMapping, appConfig, contextProps } = this.props;
        let RouteType = BrowserRouter;
        if (this.props.routeType === "Hash") {
            RouteType = HashRouter;
        }
        return (_jsx(RapidContextComponent, { contextProps: contextProps, appConfig: appConfig, children: _jsx(RouteType, { children: _jsxs(Switch, { children: [urlMapping.getLayoutsAndPages().map((layoutData, index) => {
                            if (layoutData.pageInfoDataList.length !== 0) {
                                return this.generateURL(layoutData.pageInfoDataList, layoutData, index);
                            }
                        }), _jsx(Route, { component: appConfig.getNotFoundView })] }) }) }));
    }
}
RapidPageManager.defaultProps = {
    routeType: "Browser"
};
export default RapidPageManager;
