import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import RapidComponentState from "./rr-component-state";
import RapidReactComponent from "./rr-react-component";
import { FieldSpecification } from "../data/rr-input-definition";
import { RapidComponentHelper } from "./helper/rr-component-helper";
import { RapidException } from "../common/rr-exception";
import { RapidMessageData } from "../data/rr-message-data";
import { RapidUtil } from "../utils/rr-util";
import { RapidHttpRequestHelper } from "./helper/rr-http-request-helper";
import RapidStaticHolder from "../utils/rr-static-holder";
import { RapidAppContext } from "../config/rr-app-context";
class RapidComponent extends RapidReactComponent {
    constructor(props) {
        super(props);
        this.REDIRECT_DATA = "REDIRECT_DATA";
        // @ts-ignore
        this.state = new RapidComponentState();
        this.fieldSpecification = new FieldSpecification();
        const _this = this;
        this.rapidComponentHelper = new RapidComponentHelper(this.state, this.fieldSpecification, _this.allowControlFromChild());
        this.httpRequest = new RapidHttpRequestHelper(_this.appConfig(), _this.allowControlFromChild(), _this);
        this.fieldDefinition(this.fieldSpecification);
        this.setPageTitle();
    }
    setPageTitle(pageTitle) {
        let title = pageTitle;
        if (!title && this.pageTitle) {
            title = this.pageTitle;
        }
        else if (this.props.appConfig?.pageTitle) {
            if (!document.title || document.title === "") {
                title = this.props.appConfig?.pageTitle;
            }
        }
        if (title) {
            if (this.props.appConfig?.pageTitlePostFix) {
                title += " " + this.props.appConfig?.pageTitlePostFix;
            }
            document.title = title;
        }
    }
    resetForm() {
        this.fieldDefinition(this.fieldSpecification);
        this.resetFormData();
    }
    removeFieldSpecification(...fields) {
        const _this = this;
        if (fields) {
            fields.forEach((field) => _this.fieldSpecification.removeItem(field));
        }
    }
    appConfig() {
        if (this.props.appConfig) {
            return this.props.appConfig;
        }
        return window.appConfig;
    }
    getRandomKey() {
        return "" + (Math.random() * 100000000000);
    }
    notifyComponentChange() {
        this.setState({
            ["componentChanged"]: this.getRandomKey()
        });
    }
    allowControlFromChild() {
        const _this = this;
        return {
            call(actionName, data) {
                switch (actionName) {
                    case "notify":
                        _this.notifyComponentChange();
                        break;
                    case "showLoader":
                        _this.showLoader();
                        break;
                    case "hideLoader":
                        _this.hideLoader();
                        break;
                }
            }
        };
    }
    getComponentHelper() {
        return this.rapidComponentHelper;
    }
    renderUI() {
        return (_jsx("h1", { children: "Rapid React Application View Component" }));
    }
    // Override this method on view component for field definition
    fieldDefinition(field) { }
    showServerSideFormValidationError(errors) {
        this.rapidComponentHelper.showServerSideFormValidationError(errors);
    }
    setInputDefaultValue(name, value) {
        this.updateInputValue(name, value);
    }
    updateInputValue(name, value) {
        let inputAttributes = this.rapidComponentHelper.getInputDefinitionToAttributes(name);
        inputAttributes.value = value;
        this.rapidComponentHelper.updateInputValue(name, inputAttributes);
        this.state.formData[name] = value;
        this.rapidComponentHelper.setFormData(this.state.formData);
        this.notifyComponentChange();
    }
    setupFieldAttrs(name) {
        let inputAttributes = this.rapidComponentHelper.getInputDefinitionToAttributes(name);
        this.rapidComponentHelper.handleOnChangeEvent(inputAttributes);
        this.rapidComponentHelper.handleOnBlurEvent(inputAttributes);
        this.rapidComponentHelper.updateInputValue(name, inputAttributes);
        return inputAttributes;
    }
    getFormDataValueByName(name, defaultValue = undefined) {
        if (this.state.formData && this.state.formData[name]) {
            return this.state.formData[name];
        }
        return defaultValue;
    }
    getFormData(message = "Data Validation Error") {
        if (this.rapidComponentHelper.validateEachDataOfFormData()) {
            return this.state.formData;
        }
        this.notifyComponentChange();
        throw new RapidException(message);
    }
    setFormData(formData) {
        this.state.formData = formData;
        this.rapidComponentHelper.setFormData(formData);
        this.notifyComponentChange();
    }
    resetFormData() {
        this.setFormData({});
    }
    removeDataFromFormData(name) {
        this.rapidComponentHelper.removeDataFromFormData(name);
    }
    setValueToFromData(name, value) {
        this.state.formData[name] = value;
        this.rapidComponentHelper.setValueToFromData(name, value);
    }
    getBaseUrl() {
        return this.appConfig().getBaseURL();
    }
    showErrorFlash(message) {
        this.context?.updateFlashMessage(true, RapidMessageData.failed(message));
        this.setState({
            messageData: RapidMessageData.failed(message),
            isShowFlashMessage: true
        });
    }
    showSuccessFlash(message) {
        this.context?.updateFlashMessage(true, RapidMessageData.success(message));
        this.setState({
            messageData: RapidMessageData.success(message),
            isShowFlashMessage: true
        });
    }
    closeFlashMessage() {
        this.context?.updateFlashMessage(false);
        this.setState({
            isShowFlashMessage: false
        });
    }
    showLoader() {
        this.context?.showHideLoader(true);
        this.setState({
            isShowLoader: true
        });
    }
    hideLoader() {
        this.context?.showHideLoader(false);
        this.setState({
            isShowLoader: false
        });
    }
    redirect(url) {
        RapidUtil.gotoUrl(this, url);
    }
    showLoginUI() {
        this.setState({ showLoginUI: true });
    }
    redirectWithData(url, data) {
        RapidStaticHolder.addTempData(this.REDIRECT_DATA, data);
        this.redirect(url);
    }
    getRedirectData() {
        let data = RapidStaticHolder.tempData[this.REDIRECT_DATA];
        delete RapidStaticHolder.tempData[this.REDIRECT_DATA];
        return data;
    }
    successRedirect(url, message) {
        RapidStaticHolder.addMessageData(message, true);
        this.redirect(url);
    }
    failedRedirect(url, message, resumeUrl) {
        RapidStaticHolder.addMessageData(message, false);
        if (resumeUrl) {
            url += "?resume=" + resumeUrl;
        }
        this.redirect(url);
    }
    showRedirectMessage() {
        if (RapidStaticHolder.message.message) {
            if (RapidStaticHolder.message.isSuccess) {
                this.showSuccessFlash(RapidStaticHolder.message.message);
            }
            else {
                this.showErrorFlash(RapidStaticHolder.message.message);
            }
        }
        RapidStaticHolder.message = {};
    }
    tableColumnSortAction(event, sortDirection, fieldName, callBack) {
        if (fieldName && sortDirection) {
            this.setState(status => {
                return {
                    orderBy: fieldName,
                    sortDirection: sortDirection
                };
            }, () => {
                if (callBack) {
                    callBack();
                }
            });
        }
    }
    beforeRenderCall() {
        this.rapidComponentHelper.updateState(this.state);
        this.setPageTitle();
    }
    render() {
        this.beforeRenderCall();
        return (_jsxs(React.Fragment, { children: [this.appConfig().getBeforeRenderUIView(this.state, this), this.renderUI()] }));
    }
}
RapidComponent.contextType = RapidAppContext;
export default RapidComponent;
