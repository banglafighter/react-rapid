export default class StringUtil {
    static capitalize(word) {
        return word.charAt(0).toUpperCase() + word.substring(1);
    }
    static camelCaseToHumanReadable(text) {
        let words = text.match(/[A-Za-z][a-z]*/g) || [];
        return words.map(this.capitalize).join(" ");
    }
    static smallFirstLatter(word) {
        return word.charAt(0).toLowerCase() + word.slice(1);
    }
    static capitalizeFirstLetter(word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }
    static camelCaseTo(text, char = "_") {
        return text.replace(/[A-Z]/g, (letter) => char + letter);
    }
    static splitCamelCaseToSpace(text) {
        text = text.replace(/([A-Z]+)/g, " $1").replace(/([A-Z][a-z])/g, " $1");
        text = this.containSingleSpace(text);
        return text.trim();
    }
    static containSingleSpace(text) {
        return text.replace(/ +(?= )/g, '');
    }
    static replaceMoreThanOneOccurrence(text, char, replace = undefined, regex = undefined) {
        if (!regex) {
            regex = char;
        }
        regex += "{2,}";
        if (!replace) {
            replace = char;
        }
        let re = new RegExp(regex, "g");
        return text.replace(re, replace);
    }
    static findReplace(text, find, replace) {
        let findRegex = new RegExp(find, 'g');
        return text.replace(findRegex, replace);
    }
    static removeSpecialCharacter(text, replace = "") {
        if (text) {
            text = text.replace(/[^\w\s-_/]/gi, replace);
        }
        return text;
    }
    static nameToURL(name) {
        if (!name) {
            return name;
        }
        let url = StringUtil.splitCamelCaseToSpace(name);
        url = StringUtil.findReplace(url, " ", "-");
        url = StringUtil.findReplace(url, "_", "-");
        url = StringUtil.replaceMoreThanOneOccurrence(url, "_");
        url = StringUtil.replaceMoreThanOneOccurrence(url, undefined, "-", "\\-");
        url = StringUtil.removeSpecialCharacter(url);
        url = url.toLowerCase();
        return url;
    }
    static nameToLabel(name) {
        if (!name) {
            return name;
        }
        let label = StringUtil.camelCaseToHumanReadable(name);
        label = StringUtil.replaceMoreThanOneOccurrence(label, undefined, "-", "\\-");
        label = StringUtil.findReplace(label, "-", " ");
        label = StringUtil.removeSpecialCharacter(label);
        label = StringUtil.capitalizeFirstLetter(label);
        return label;
    }
    static nameToSystemName(name) {
        if (!name) {
            return name;
        }
        let systemName = StringUtil.nameToLabel(name);
        systemName = StringUtil.findReplace(systemName, " ", "");
        systemName = StringUtil.smallFirstLatter(systemName);
        return systemName;
    }
}
