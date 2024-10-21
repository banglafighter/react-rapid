import RapidLayoutInfoData from "../data/rr-layout-info-data";
export default class RapidURLMapping {
    constructor() {
        this.publicLayout = new RapidLayoutInfoData();
        this.privateLayout = new RapidLayoutInfoData();
        this.authLayout = new RapidLayoutInfoData();
        this.otherLayout = new RapidLayoutInfoData();
    }
    getLayoutsAndPages() {
        return [];
    }
}
