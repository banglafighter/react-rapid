import {RapidException} from "./src/artifacts/common/rr-exception";
import RapidLoadDataPrams from "./src/artifacts/data/rr-load-data-prams";
import RapidHTTResponse from "./src/artifacts/processor/http/rr-http-response";
import RapidAppConfig from "./src/artifacts/config/rr-app-config";
import RapidURLMapping from "./src/artifacts/config/rr-url-mapping";
import RapidLayoutInfoData from "./src/artifacts/data/rr-layout-info-data";
import {RapidProps} from "./src/artifacts/interface/rr-mixed-interface";
import RapidComponentState from "./src/artifacts/component/rr-component-state";
import RapidComponent from "./src/artifacts/component/rr-component";
import {FieldSpecification} from "./src/artifacts/data/rr-input-definition";
import RapidSysComponent from "./src/artifacts/component/rr-sys-component";
import RapidReactComponent from "./src/artifacts/component/rr-react-component";
import RapidLayoutRenderer from "./src/artifacts/component/rr-layout-rander";
import {_t, i18n, _tNumber} from "react-rapid-i18n/app/react-rapid-i18n";
import {RapidUtil} from "./src/artifacts/utils/rr-util";
import RapidBrowserStorageManager from "./src/artifacts/manager/rr-browser-storage-manager";
import {RapidAppContext} from "./src/artifacts/config/rr-app-context";
import {RapidAppContextProps} from "./src/artifacts/config/rr-app-context";
import {RapidMessageData} from "./src/artifacts/data/rr-message-data";

// For Interface
export type {
    RapidHTTResponse,
    RapidProps,
    RapidAppContextProps,
}

export {
    _tNumber,
    _t,
    i18n,
    RapidException,
    RapidLoadDataPrams,
    RapidAppConfig,
    RapidURLMapping,
    RapidLayoutInfoData,
    RapidComponentState,
    RapidComponent,
    FieldSpecification,
    RapidSysComponent,
    RapidReactComponent,
    RapidLayoutRenderer,
    RapidBrowserStorageManager,
    RapidAppContext,
    RapidUtil,
    RapidMessageData,
}

// External Library Export
import React from "react";
import {Component} from 'react';
import {Link} from "react-router-dom";
import {Redirect} from "react-router";
import ReactDOM from 'react-dom';

export {
    Component,
    React,
    Link,
    Redirect,
    ReactDOM,
}