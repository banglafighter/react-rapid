export default class RapidLoadDataPrams {
    public isReset: Boolean = false;
    public params: any;

    public resetQuery(): RapidLoadDataPrams {
        this.isReset = true
        return this
    }

    public setParams(params: any): RapidLoadDataPrams {
        this.params = params
        return this
    }
}