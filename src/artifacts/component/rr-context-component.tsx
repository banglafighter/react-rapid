import {DynamicAction, RapidAppContext} from "../config/rr-app-context";
import {RapidProps, RapidState} from "../interface/rr-mixed-interface";
import RapidAppConfig from "../config/rr-app-config";
import {RapidAppContextProps} from "../config/rr-app-context";
import RapidReactComponent from "./rr-react-component";
import {RapidMessageData} from "../data/rr-message-data";
import RapidBrowserStorageManager from "../manager/rr-browser-storage-manager";
import {RapidReactConst} from "../common/rr-react-const";
import RapidContextHelper from "./helper/rr-context-helper";

interface RapidContextProps extends RapidProps {
    appConfig: RapidAppConfig;
    children: any;
    contextProps?: RapidAppContextProps
}

class RapidContextState implements RapidState {
    contextProps: RapidAppContextProps = {
        isShowLoader: false,
        isShowFlashMessage: false,
        messageData: RapidMessageData.failed("Unexpected Error!")
    }
}

export default class RapidContextComponent extends RapidReactComponent<RapidContextProps, RapidContextState> {

    state: RapidContextState = new RapidContextState()

    constructor(props: RapidContextProps) {
        super(props);
    }

    componentDidMount() {
        const _this = this
        if (_this.props.contextProps) {
            _this.state.contextProps = _this.props.contextProps
        }
        this.initMethods()
    }

    private initMethods() {
        const _this = this
        _this.updatePropsValue("appConfig", this.props.appConfig)

        let updateProps = _this.state.contextProps.updateProps
        _this.state.contextProps.updateProps = (key: any, value: any) => {
            if (updateProps) {
                updateProps(key, value)
            }
            _this.updatePropsValue(key, value)
        }

        let updateFlashMessage = _this.state.contextProps.updateFlashMessage
        _this.state.contextProps.updateFlashMessage = (isShow: boolean, messageData?: any) => {
            if (updateFlashMessage) {
                updateFlashMessage(isShow, messageData)
            }
            _this.updateFlashMessage(isShow, messageData)
        }

        let showHideLoader = _this.state.contextProps.showHideLoader
        _this.state.contextProps.showHideLoader = (isShow: boolean) => {
            if (showHideLoader) {
                showHideLoader(isShow)
            }
            _this.showHideLoader(isShow)
        }

        let updateDynamicAction = _this.state.contextProps.updateDynamicAction
        _this.state.contextProps.updateDynamicAction = (key: string, value: DynamicAction) => {
            if (updateDynamicAction) {
                updateDynamicAction(key, value)
            }
            _this.addToDynamicAction(key, value)
        }

        _this.state.contextProps.loadDynamicAction = () => {
            _this.loadDynamicAction()
        }
        _this.loadDynamicAction()
    }

    updatePropsValue(key: any, value: any) {
        this.setState((oldState: any) => {
            let newContextProps = Object.assign({}, oldState.contextProps)
            newContextProps[key] = value
            return {contextProps: newContextProps}
        })
    }

    showHideLoader(isShow: boolean = false) {
        this.updatePropsValue("isShowLoader", isShow)
    }

    updateFlashMessage(isShow: boolean, messageData: any = RapidMessageData.failed("Unexpected Error!")) {
        this.setState((oldState: any) => {
            let newContextProps = Object.assign({}, oldState.contextProps)
            newContextProps.isShowFlashMessage = isShow
            newContextProps.messageData = messageData
            return {contextProps: newContextProps}
        })
    }

    private addToDynamicAction(key: string, value: DynamicAction) {
        let dynamicAction = RapidContextHelper.addToDynamicAction(key, value)
        this.updatePropsValue("dynamicAction", dynamicAction)
    }

    private loadDynamicAction() {
        let dynamicAction = RapidBrowserStorageManager.getAsJSON(RapidReactConst.CONTEXT_DYNAMIC_ACTION)
        if (dynamicAction) {
            this.updatePropsValue("dynamicAction", dynamicAction)
        }
    }


    render() {
        return (
            <RapidAppContext.Provider value={this.state.contextProps}>
                {this.props.children}
            </RapidAppContext.Provider>
        )
    }

}