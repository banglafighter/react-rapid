import { Status } from "../../data/rr-message-data";
import { RapidUtil } from "../../utils/rr-util";
export class RapidComponentHelper {
    constructor(state, fieldSpecification, parentActionCaller) {
        this.state = state;
        this.fieldSpecification = fieldSpecification;
        this.parentActionCaller = parentActionCaller;
    }
    updateState(state) {
        if (state.constructor.name !== this.state.constructor.name) {
            this.state = state;
        }
    }
    getFilesFromInput(name, target) {
        let files = new Array();
        if (this.state.formData && this.state.formData[name] && this.state.formData[name] instanceof FormData) {
            files = this.state.formData[name];
        }
        if (target && target.files) {
            Array.from(target.files).forEach((file) => {
                files.push(file);
            });
        }
        return files;
    }
    notifyComponentChange() {
        if (this.parentActionCaller) {
            this.parentActionCaller.call("notify");
        }
    }
    fireInputEvent(event, target) {
        if (event && event.fire) {
            event.fire(target);
        }
    }
    getInputEvent(name, eventName) {
        let definition = this.fieldSpecification.getDefByName(name);
        if (definition) {
            return definition[eventName];
        }
        return undefined;
    }
    updateFormData(name, value) {
        if (this.state.formData) {
            this.state.formData[name] = value;
            this.notifyComponentChange();
        }
    }
    updateFieldSpecificationValidation(name, wasValidated, error, errorMessage) {
        let definition = this.fieldSpecification.getDefByName(name);
        if (definition) {
            definition.wasValidated = wasValidated;
            definition.error = error;
            if (errorMessage) {
                definition.errorText = errorMessage;
            }
            this.fieldSpecification.updateFieldDef(definition);
        }
    }
    removeValidationError(name) {
        this.updateFieldSpecificationValidation(name, false, false);
    }
    addValidationError(name) {
        this.updateFieldSpecificationValidation(name, true, true);
    }
    getValueFromFormData(name, defaultValue = "") {
        if (this.state.formData && this.state.formData[name]) {
            return this.state.formData[name];
        }
        return defaultValue;
    }
    getFormData() {
        return this.state.formData;
    }
    setFormData(formData) {
        this.state.formData = formData;
    }
    removeDataFromFormData(name) {
        if (this.state.formData && this.state.formData[name]) {
            delete this.state.formData[name];
        }
    }
    setValueToFromData(name, value) {
        this.state.formData[name] = value;
    }
    processCustomValidation(definition, name) {
        if (definition.customValidation && definition.customValidation.validate) {
            let response = definition.customValidation.validate(name, this.getValueFromFormData(name), this.state.formData);
            if (response.status === Status.FAILED) {
                this.updateFieldSpecificationValidation(name, true, true, response.message);
                return false;
            }
        }
        return true;
    }
    validateEachDataOfFormData() {
        const _this = this;
        let isValid = true;
        let definitions = new Map(this.fieldSpecification.getDefinitions());
        if (definitions) {
            definitions.forEach((definition, name) => {
                if (definition.isHideInput) {
                    return;
                }
                else if (definition.required && !_this.getValueFromFormData(name, undefined)) {
                    isValid = false;
                    _this.addValidationError(name);
                }
                else if (!_this.processCustomValidation(definition, name)) {
                    isValid = false;
                }
                else {
                    _this.updateFieldSpecificationValidation(name, true);
                }
            });
        }
        return isValid;
    }
    handleOnChangeEvent(inputAttributes) {
        const _this = this;
        inputAttributes.onChange = (event) => {
            const target = event.target;
            const name = target.name;
            let value;
            let isDeleteValue = false;
            if (target.type === 'file') {
                value = this.getFilesFromInput(name, target);
            }
            else if (target.type === 'checkbox') {
                let inputDefinition = this.fieldSpecification.getDefByName(name);
                let sendValue = undefined;
                if (inputDefinition && inputDefinition.sendValue !== undefined && inputDefinition.sendValue !== null) {
                    sendValue = inputDefinition.sendValue;
                }
                value = target.checked;
                if (target.checked && sendValue !== undefined) {
                    value = sendValue;
                }
                else if (sendValue !== undefined) {
                    isDeleteValue = true;
                }
            }
            else {
                value = target.value;
            }
            _this.removeValidationError(name);
            if (isDeleteValue) {
                _this.removeDataFromFormData(name);
                _this.notifyComponentChange();
            }
            else {
                _this.updateFormData(name, value);
            }
            _this.fireInputEvent(_this.getInputEvent(name, "changeEvent"), event);
        };
        return inputAttributes;
    }
    handleOnBlurEvent(inputAttributes) {
        const _this = this;
        inputAttributes.onBlur = (target) => {
            const name = inputAttributes.name;
            _this.fireInputEvent(_this.getInputEvent(name, "blurEvent"), target);
        };
        return inputAttributes;
    }
    updateInputValue(name, inputAttributes) {
        let definition = this.fieldSpecification.getDefByName(name);
        let defaultValue = "";
        if (definition && definition.defaultValue) {
            defaultValue = definition.defaultValue;
        }
        let value = this.getValueFromFormData(name, defaultValue);
        if (value && ((value instanceof Array && value.some((item) => item instanceof File)) || (value instanceof File))) {
            if (value instanceof File) {
                inputAttributes.fileNames = value.name;
            }
            else {
                inputAttributes.fileNames = [];
                value.some((item) => {
                    if (item && item instanceof File) {
                        inputAttributes.fileNames.push(item.name);
                    }
                });
            }
            value = "";
        }
        else if (definition && definition.type && definition.type === "file") {
            inputAttributes.fileNames = value;
            value = "";
        }
        inputAttributes.value = value;
        return inputAttributes;
    }
    getInputDefinitionToAttributes(name) {
        let inputDefinition = this.fieldSpecification.getDefByName(name);
        let response = {};
        if (inputDefinition) {
            switch (inputDefinition.type) {
                case "select":
                    response = RapidUtil.removeProperty(inputDefinition, ["type"]);
                    break;
                default:
                    response = RapidUtil.removeProperty(inputDefinition);
            }
        }
        return response;
    }
    showServerSideFormValidationError(errors) {
        for (let [name, message] of Object.entries(errors)) {
            this.updateFieldSpecificationValidation(name, true, true, message);
        }
    }
}
