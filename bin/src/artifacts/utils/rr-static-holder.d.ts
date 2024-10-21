export default class RapidStaticHolder {
    static message: {
        [key: string]: any;
    };
    static tempData: {
        [key: string]: any;
    };
    static addMessageData(message: string, isSuccess?: boolean): void;
    static addTempData(key: string, tempData: any): void;
}
