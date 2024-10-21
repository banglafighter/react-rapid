import { DynamicAction } from "../../config/rr-app-context";
export default class RapidContextHelper {
    private static copy;
    static addToDynamicAction(key: string, value: DynamicAction): any;
    static getDynamicActionItem(dynamicAction: any, projectKey: string, name?: string): any;
}
