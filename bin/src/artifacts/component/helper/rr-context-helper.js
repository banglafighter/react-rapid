import RapidBrowserStorageManager from "../../manager/rr-browser-storage-manager";
import { RapidReactConst } from "../../common/rr-react-const";
export default class RapidContextHelper {
    static copy(source, destination, key) {
        if (!source[key]) {
            return destination;
        }
        destination[key] = { ...destination[key], ...source[key] };
        return destination;
    }
    static addToDynamicAction(key, value) {
        let dynamicAction = RapidBrowserStorageManager.getAsJSON(RapidReactConst.CONTEXT_DYNAMIC_ACTION);
        if (!dynamicAction) {
            dynamicAction = {};
        }
        let currentDynamicAction = dynamicAction[key];
        if (!currentDynamicAction) {
            dynamicAction[key] = value;
        }
        else {
            currentDynamicAction = this.copy(value, currentDynamicAction, "rowAction");
            currentDynamicAction = this.copy(value, currentDynamicAction, "topAction");
            dynamicAction[key] = currentDynamicAction;
        }
        RapidBrowserStorageManager.addAsJSONString(RapidReactConst.CONTEXT_DYNAMIC_ACTION, dynamicAction);
        return dynamicAction;
    }
    static getDynamicActionItem(dynamicAction, projectKey, name = "rowAction") {
        if (dynamicAction && projectKey) {
            let actions = dynamicAction[projectKey];
            if (actions && actions[name]) {
                return actions[name];
            }
        }
        return undefined;
    }
}
