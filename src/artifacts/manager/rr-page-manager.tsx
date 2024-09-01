import React from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import RapidContextComponent from "../component/rr-context-component";
import RapidAppConfig from "../config/rr-app-config";
import RapidReactComponent from "../component/rr-react-component";
import RapidLayoutInfoData from "../data/rr-layout-info-data";
import RapidPageInfoData from "../data/rr-page-info-data";
import {RapidPageManagerProps} from "../interface/rr-page-manager-props";
import {RapidPageManagerState} from "../interface/rr-mixed-interface";


declare global {
    interface Window {
        appConfig: RapidAppConfig;
    }
}


export default class RapidPageManager extends RapidReactComponent<RapidPageManagerProps, RapidPageManagerState> {

    constructor(props: RapidPageManagerProps){
        super(props);
        window.appConfig = this.props.appConfig;
    }

    private getRouter(pageInfoData: RapidPageInfoData, Layout: any, index: any) {
        const {appConfig} = this.props;
        let pageKey: any = index
        if (pageInfoData.pageKey){
            pageKey = pageInfoData.pageKey
        }
        return (
            <Route
                exact
                path={pageInfoData.relativeURL}
                key={pageKey}
                render={(route) => {
                    return (<Layout component={pageInfoData.component} route={route} appConfig={appConfig} additionalData={pageInfoData.additionalData} />)
                }}
            />
        )
    }


    private generateURL(pageInfoDataList: Array<RapidPageInfoData>, layoutData: any, index: any) {
        return pageInfoDataList.map((pageInfoData: RapidPageInfoData, nestedIndex) => {
            if (pageInfoData.isActive) {
                return this.getRouter(pageInfoData, layoutData.layout, index);
            }
        });
    }


    render() {
        const {urlMapping, appConfig, contextProps} = this.props
        return (
            <RapidContextComponent contextProps={contextProps} appConfig={appConfig}>
                <BrowserRouter>
                    <Switch>
                        {
                            urlMapping.getLayoutsAndPages().map((layoutData: RapidLayoutInfoData, index: any) => {
                                if (layoutData.pageInfoDataList.length !== 0) {
                                    return this.generateURL(layoutData.pageInfoDataList, layoutData, index);
                                }
                            })
                        }
                        <Route component={appConfig.getNotFoundView}/>
                    </Switch>
                </BrowserRouter>
            </RapidContextComponent>
        );
    }


}