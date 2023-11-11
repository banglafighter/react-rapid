import RapidPageInfoData from "./rr-page-info-data";


export default class RapidLayoutInfoData {


    public layout: any;
    public pageInfoDataList: Array<RapidPageInfoData> = [];


    public addPage(pageInfo: RapidPageInfoData): RapidLayoutInfoData {
        this.pageInfoDataList.push(pageInfo);
        return this;
    }

    public addPageInstance(relativeURL: string, component: any, additionalData?: any, pageKey?: string): RapidLayoutInfoData {
        this.pageInfoDataList.push(this.pageInfoInstance(relativeURL, component, additionalData, pageKey));
        return this;
    }

    public concatComponent(pageInfoDataList: Array<RapidPageInfoData>): RapidLayoutInfoData {
        this.pageInfoDataList = this.pageInfoDataList.concat(pageInfoDataList);
        return this;
    }

    public getPageInfoList(): Array<RapidPageInfoData> {
        return this.pageInfoDataList;
    }

    public pageInfoInstance(relativeURL: string, component: any, additionalData?: any, pageKey?: string): RapidPageInfoData {
        let pageInfo = new RapidPageInfoData();
        pageInfo.relativeURL = relativeURL;
        pageInfo.component = component;
        pageInfo.additionalData = additionalData;
        pageInfo.pageKey = pageKey
        return pageInfo;
    }

    public static instance(layout: any): RapidLayoutInfoData {
        let layoutData = new RapidLayoutInfoData();
        layoutData.layout = layout;
        return layoutData;
    }

}