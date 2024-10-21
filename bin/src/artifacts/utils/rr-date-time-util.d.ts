export declare class RapidDateTimeUtil {
    leftFillNumber(digit: any, targetLength?: number): any;
    private getStringToHourMinutesSecond;
    private secondToHMS;
    calculateHours(end: string, start: string): {
        hour: number;
        minute: number;
        second: number;
        time: string;
        timeWithoutSecond: string;
    };
    static ins(): RapidDateTimeUtil;
}
