import { jsx as _jsx } from "react/jsx-runtime";
import { RapidAppContext } from "../config/rr-app-context";
import RapidReactComponent from "./rr-react-component";
import { RapidMessageData } from "../data/rr-message-data";
import RapidBrowserStorageManager from "../manager/rr-browser-storage-manager";
import { RapidReactConst } from "../common/rr-react-const";
import RapidContextHelper from "./helper/rr-context-helper";
class RapidContextState {
    constructor() {
        this.contextProps = {
            isShowLoader: false,
            isShowFlashMessage: false,
            messageData: RapidMessageData.failed("Unexpected Error!")
        };
    }
}
export default class RapidContextComponent extends RapidReactComponent {
    constructor(props) {
        super(props);
        this.state = new RapidContextState();
    }
    componentDidMount() {
        const _this = this;
        if (_this.props.contextProps) {
            _this.state.contextProps = _this.props.contextProps;
        }
        this.initMethods();
    }
    initMethods() {
        const _this = this;
        _this.updatePropsValue("appConfig", this.props.appConfig);
        let updateProps = _this.state.contextProps.updateProps;
        _this.state.contextProps.updateProps = (key, value) => {
            if (updateProps) {
                updateProps(key, value);
            }
            _this.updatePropsValue(key, value);
        };
        let updateFlashMessage = _this.state.contextProps.updateFlashMessage;
        _this.state.contextProps.updateFlashMessage = (isShow, messageData) => {
            if (updateFlashMessage) {
                updateFlashMessage(isShow, messageData);
            }
            _this.updateFlashMessage(isShow, messageData);
        };
        let showHideLoader = _this.state.contextProps.showHideLoader;
        _this.state.contextProps.showHideLoader = (isShow) => {
            if (showHideLoader) {
                showHideLoader(isShow);
            }
            _this.showHideLoader(isShow);
        };
        let updateDynamicAction = _this.state.contextProps.updateDynamicAction;
        _this.state.contextProps.updateDynamicAction = (key, value) => {
            if (updateDynamicAction) {
                updateDynamicAction(key, value);
            }
            _this.addToDynamicAction(key, value);
        };
        _this.state.contextProps.loadDynamicAction = () => {
            _this.loadDynamicAction();
        };
        _this.loadDynamicAction();
    }
    updatePropsValue(key, value) {
        this.setState((oldState) => {
            let newContextProps = Object.assign({}, oldState.contextProps);
            newContextProps[key] = value;
            return { contextProps: newContextProps };
        });
    }
    showHideLoader(isShow = false) {
        this.updatePropsValue("isShowLoader", isShow);
    }
    updateFlashMessage(isShow, messageData = RapidMessageData.failed("Unexpected Error!")) {
        this.setState((oldState) => {
            let newContextProps = Object.assign({}, oldState.contextProps);
            newContextProps.isShowFlashMessage = isShow;
            newContextProps.messageData = messageData;
            return { contextProps: newContextProps };
        });
    }
    addToDynamicAction(key, value) {
        let dynamicAction = RapidContextHelper.addToDynamicAction(key, value);
        this.updatePropsValue("dynamicAction", dynamicAction);
    }
    loadDynamicAction() {
        let dynamicAction = RapidBrowserStorageManager.getAsJSON(RapidReactConst.CONTEXT_DYNAMIC_ACTION);
        if (dynamicAction) {
            this.updatePropsValue("dynamicAction", dynamicAction);
        }
    }
    render() {
        return (_jsx(RapidAppContext.Provider, { value: this.state.contextProps, children: this.props.children }));
    }
}
