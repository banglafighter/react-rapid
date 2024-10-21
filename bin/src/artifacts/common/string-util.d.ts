export default class StringUtil {
    static capitalize(word: string): string;
    static camelCaseToHumanReadable(text: string): string;
    static smallFirstLatter(word: string): string;
    static capitalizeFirstLetter(word: string): string;
    static camelCaseTo(text: string, char?: string): string;
    static splitCamelCaseToSpace(text: string): string;
    static containSingleSpace(text: string): string;
    static replaceMoreThanOneOccurrence(text: string, char: any, replace?: any, regex?: any): string;
    static findReplace(text: string, find: string, replace: string): string;
    static removeSpecialCharacter(text: string, replace?: string): string;
    static nameToURL(name: string): string;
    static nameToLabel(name: string): string;
    static nameToSystemName(name: string): string;
}
