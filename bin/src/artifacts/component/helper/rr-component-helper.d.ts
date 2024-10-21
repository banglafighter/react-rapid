import { FieldSpecification } from "../../data/rr-input-definition";
import { ParentActionCaller } from "../../interface/rr-mixed-interface";
export declare class RapidComponentHelper {
    private state;
    private fieldSpecification;
    private parentActionCaller?;
    constructor(state: any, fieldSpecification: FieldSpecification, parentActionCaller?: ParentActionCaller);
    updateState(state: any): void;
    private getFilesFromInput;
    private notifyComponentChange;
    private fireInputEvent;
    private getInputEvent;
    updateFormData(name: string, value: any): void;
    updateFieldSpecificationValidation(name: string, wasValidated?: boolean, error?: boolean, errorMessage?: string): void;
    private removeValidationError;
    private addValidationError;
    getValueFromFormData(name: string, defaultValue?: any): any;
    getFormData(): any;
    setFormData(formData: any): void;
    removeDataFromFormData(name: string): void;
    setValueToFromData(name: string, value: any): void;
    private processCustomValidation;
    validateEachDataOfFormData(): boolean;
    handleOnChangeEvent(inputAttributes: any): any;
    handleOnBlurEvent(inputAttributes: any): any;
    updateInputValue(name: string, inputAttributes: any): any;
    getInputDefinitionToAttributes(name: string): any;
    showServerSideFormValidationError(errors: Object): void;
}
