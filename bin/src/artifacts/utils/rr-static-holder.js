class RapidStaticHolder {
    static addMessageData(message, isSuccess = true) {
        this.message = { isSuccess: isSuccess, message: message };
    }
    static addTempData(key, tempData) {
        this.tempData[key] = tempData;
    }
}
RapidStaticHolder.message = {};
RapidStaticHolder.tempData = {};
export default RapidStaticHolder;
