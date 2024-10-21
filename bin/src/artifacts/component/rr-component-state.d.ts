import { RapidState } from "../interface/rr-mixed-interface";
import { RapidMessageData } from "../data/rr-message-data";
import { SortDirection } from "../data/rr-mixed-data";
export default class RapidComponentState implements RapidState {
    formData: {
        [key: string]: any;
    };
    isShowLoader: boolean;
    isShowFlashMessage: boolean;
    messageData: RapidMessageData;
    itemPerPage: number;
    currentPage: number;
    totalPage: number;
    totalItem: number;
    init: boolean;
    showLoginUI: boolean;
    parentComponent?: any;
    queryCondition: {
        [key: string]: any;
    };
    removeNotInFormDefinition: boolean;
    sortDirection: SortDirection;
    orderBy: string;
    search?: string;
    itemList: Array<object>;
    itemDetails: object;
}
