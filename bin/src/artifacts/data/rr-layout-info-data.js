import RapidPageInfoData from "./rr-page-info-data";
export default class RapidLayoutInfoData {
    constructor() {
        this.pageInfoDataList = [];
    }
    addPage(pageInfo) {
        this.pageInfoDataList.push(pageInfo);
        return this;
    }
    addPageInstance(relativeURL, component, additionalData, pageKey) {
        this.pageInfoDataList.push(this.pageInfoInstance(relativeURL, component, additionalData, pageKey));
        return this;
    }
    concatComponent(pageInfoDataList) {
        this.pageInfoDataList = this.pageInfoDataList.concat(pageInfoDataList);
        return this;
    }
    getPageInfoList() {
        return this.pageInfoDataList;
    }
    pageInfoInstance(relativeURL, component, additionalData, pageKey) {
        let pageInfo = new RapidPageInfoData();
        pageInfo.relativeURL = relativeURL;
        pageInfo.component = component;
        pageInfo.additionalData = additionalData;
        pageInfo.pageKey = pageKey;
        return pageInfo;
    }
    static instance(layout) {
        let layoutData = new RapidLayoutInfoData();
        layoutData.layout = layout;
        return layoutData;
    }
}
