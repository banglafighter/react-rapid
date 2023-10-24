import {RapidState} from "../interface/rr-mixed-interface";
import {RapidMessageData} from "../data/rr-message-data";
import {SortDirection} from "../data/rr-mixed-data";

export default class RapidComponentState implements RapidState {

    public formData: { [key: string]: any } = {};
    public isShowLoader: boolean = false;
    public isShowFlashMessage: boolean = false;
    public messageData: RapidMessageData = RapidMessageData.failed("Unexpected Error!");
    public itemPerPage: number = 20
    public currentPage: number = 1
    public totalPage: number = 0
    public totalItem: number = 0




    public init: boolean = false;
    public showLoginUI: boolean = false;

    public parentComponent?: any;

    public queryCondition:{[key: string]: any} = {};
    public removeNotInFormDefinition: boolean = false;
    public sortDirection: SortDirection = SortDirection.descending;
    public orderBy: string = "id";
    public search?: string;
    public itemList: Array<object> = [];
    public itemDetails: object = {};



}