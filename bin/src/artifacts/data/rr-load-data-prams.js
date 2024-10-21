export default class RapidLoadDataPrams {
    constructor() {
        this.isReset = false;
    }
    resetQuery() {
        this.isReset = true;
        return this;
    }
    setParams(params) {
        this.params = params;
        return this;
    }
}
