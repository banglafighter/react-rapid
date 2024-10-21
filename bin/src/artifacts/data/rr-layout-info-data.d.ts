import RapidPageInfoData from "./rr-page-info-data";
export default class RapidLayoutInfoData {
    layout: any;
    pageInfoDataList: Array<RapidPageInfoData>;
    addPage(pageInfo: RapidPageInfoData): RapidLayoutInfoData;
    addPageInstance(relativeURL: string, component: any, additionalData?: any, pageKey?: string): RapidLayoutInfoData;
    concatComponent(pageInfoDataList: Array<RapidPageInfoData>): RapidLayoutInfoData;
    getPageInfoList(): Array<RapidPageInfoData>;
    pageInfoInstance(relativeURL: string, component: any, additionalData?: any, pageKey?: string): RapidPageInfoData;
    static instance(layout: any): RapidLayoutInfoData;
}
