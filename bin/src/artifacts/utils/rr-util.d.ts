export declare const RapidUtil: {
    redirectTo: (url: any) => void;
    gotoUrl: (component: any, url: any) => boolean;
    addDataToObject: (object: any, key: any, value: any) => any;
    hardReload: () => void;
    isMatchPathname: (url: any) => boolean;
    randomString: () => string;
    objectValue: (object: any, defaultValue: any, ...props: string[]) => any;
    mapToJson(map: Map<string, any>): string;
    mapToObject: (map: Map<string, any>) => {
        [key: string]: any;
    };
    makeDataObject(object: object): object;
    removeProperty(object: Object, keyList?: Array<string>): {
        [key: string]: any;
    };
};
