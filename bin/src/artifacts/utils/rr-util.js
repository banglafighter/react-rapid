export const RapidUtil = {
    redirectTo: (url) => {
        window.location = url;
    },
    gotoUrl: (component, url) => {
        if (component.props.route.history) {
            component.props.route.history.push(url);
            return true;
        }
        return false;
    },
    addDataToObject: (object, key, value) => {
        if (object === undefined) {
            object = {};
        }
        object[key] = value;
        return object;
    },
    hardReload: () => {
        window.location.reload();
    },
    isMatchPathname: (url) => {
        return window.location.pathname === url;
    },
    randomString: () => {
        return Math.random().toString(36).substring(7);
    },
    objectValue: (object, defaultValue, ...props) => {
        let response = object;
        if (!object) {
            return defaultValue;
        }
        else if (!props.length) {
            return defaultValue;
        }
        else {
            for (let item of props) {
                if (!response[item]) {
                    return defaultValue;
                }
                response = response[item];
            }
        }
        return response;
    },
    mapToJson(map) {
        return JSON.stringify(this.mapToObject(map));
    },
    mapToObject: (map) => {
        let jsonObject = {};
        if (map) {
            map.forEach((value, key) => {
                jsonObject[key] = value;
            });
            return jsonObject;
        }
        return {};
    },
    makeDataObject(object) {
        let dataObject = {};
        dataObject['data'] = object;
        return dataObject;
    },
    removeProperty(object, keyList = []) {
        let newObject = {};
        for (let [key, value] of Object.entries(object)) {
            if (keyList.indexOf(key) === -1) {
                newObject[key] = value;
            }
        }
        return newObject;
    }
};
