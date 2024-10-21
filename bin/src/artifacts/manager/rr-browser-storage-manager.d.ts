export default class RapidBrowserStorageManager {
    static add(key: string, value: any): void;
    static addAsJSONString(key: string, value: any): void;
    static addAsBase64(key: string, value: any): void;
    static remove(key: string): void;
    static clear(): void;
    static getByKey(key: string): any;
    static getAsJSON(key: string): any;
    static getFromBase64(key: string): any;
    static addAsSession(key: string, value: any): void;
    static getByKeyFromSession(key: string): any;
    static removeFromSession(key: string): void;
    static clearSession(): void;
    static addAsJSONStringInSession(key: string, value: any): void;
    static getAsJSONFromSession(key: string): any;
}
