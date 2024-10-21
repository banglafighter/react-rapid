import RapidLayoutInfoData from "../data/rr-layout-info-data";
export default class RapidURLMapping {
    publicLayout: RapidLayoutInfoData;
    privateLayout: RapidLayoutInfoData;
    authLayout: RapidLayoutInfoData;
    otherLayout: RapidLayoutInfoData;
    getLayoutsAndPages(): Array<RapidLayoutInfoData>;
}
