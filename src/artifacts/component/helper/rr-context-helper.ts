import {DynamicAction} from "../../config/rr-app-context";
import RapidBrowserStorageManager from "../../manager/rr-browser-storage-manager";
import {RapidReactConst} from "../../common/rr-react-const";

export default class RapidContextHelper {

    private static copy(source: any, destination: any, key: string) {
        if (!source[key]) {
            return destination
        }
        destination[key] = {...destination[key], ...source[key]}
        return destination
    }

    public static addToDynamicAction(key: string, value: DynamicAction) {
        let dynamicAction = RapidBrowserStorageManager.getAsJSON(RapidReactConst.CONTEXT_DYNAMIC_ACTION)
        if (!dynamicAction) {
            dynamicAction = {}
        }

        let currentDynamicAction = dynamicAction[key]
        if (!currentDynamicAction) {
            dynamicAction[key] = value
        } else {
            currentDynamicAction = this.copy(value, currentDynamicAction, "rowAction")
            currentDynamicAction = this.copy(value, currentDynamicAction, "topAction")
            dynamicAction[key] = currentDynamicAction
        }

        RapidBrowserStorageManager.addAsJSONString(RapidReactConst.CONTEXT_DYNAMIC_ACTION, dynamicAction)
        return dynamicAction
    }

    public static getDynamicActionItem(dynamicAction: any, projectKey: string, name: string = "rowAction") {
        if (dynamicAction && projectKey) {
            let actions = dynamicAction[projectKey]
            if (actions && actions[name]) {
                return actions[name]
            }
        }
        return undefined
    }

}