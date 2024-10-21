import { RapidMessageData } from "../data/rr-message-data";
import { SortDirection } from "../data/rr-mixed-data";
export default class RapidComponentState {
    constructor() {
        this.formData = {};
        this.isShowLoader = false;
        this.isShowFlashMessage = false;
        this.messageData = RapidMessageData.failed("Unexpected Error!");
        this.itemPerPage = 20;
        this.currentPage = 1;
        this.totalPage = 0;
        this.totalItem = 0;
        this.init = false;
        this.showLoginUI = false;
        this.queryCondition = {};
        this.removeNotInFormDefinition = false;
        this.sortDirection = SortDirection.descending;
        this.orderBy = "id";
        this.itemList = [];
        this.itemDetails = {};
    }
}
