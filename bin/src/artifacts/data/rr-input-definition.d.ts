import React from "react";
import { CustomValidation, RapidInputEvent } from "../interface/rr-mixed-interface";
export type InputType = 'text' | 'email' | 'checkbox' | 'color' | 'file' | 'date' | 'datetime-local' | 'hidden' | 'month' | 'number' | 'password' | 'radio' | 'range' | 'tel' | 'time' | 'url' | 'week' | 'switch' | 'textarea' | 'select';
export interface InputDataDefinition {
    name: string;
    value?: unknown;
    defaultValue?: any;
    type?: InputType;
    isHideInput?: boolean;
}
export interface HiddenInputDefinition extends InputDataDefinition {
}
export interface BaseInputDefinition extends InputDataDefinition {
    disabled?: boolean;
    required?: boolean;
    autoFocus?: boolean;
    label?: React.ReactNode;
    error?: boolean;
    wasValidated?: boolean;
    helperText?: React.ReactNode;
    errorText?: React.ReactNode;
    successText?: React.ReactNode;
    changeEvent?: RapidInputEvent;
    blurEvent?: RapidInputEvent;
    customValidation?: CustomValidation;
    wrapperClass?: string;
    addWrapperClass?: string;
}
export interface OnOffInputDefinition extends BaseInputDefinition {
    sendValue?: unknown;
}
export interface InputDefinition extends BaseInputDefinition {
    placeholder?: string;
    autoComplete?: string;
}
export interface FileInputDefinition extends InputDefinition {
    fileNames?: any;
    fileExtensions?: Array<string>;
    minSize?: number;
    maxSize?: number;
    maxFiles?: number;
    isMultiple?: boolean;
    urlPrefix?: string;
}
export interface TextAreaDefinition extends InputDefinition {
    rows?: string;
    cols?: string;
}
export interface SelectDefinition extends InputDefinition {
    isMulti?: boolean;
    isClearable?: boolean;
    isSearchable?: boolean;
    options: Array<any>;
    optionLabel: string;
    optionValue: string;
}
export declare class FieldSpecification {
    private fieldDefinition;
    text(spec: InputDefinition): FieldSpecification;
    file(spec: FileInputDefinition): FieldSpecification;
    url(spec: InputDefinition): FieldSpecification;
    password(spec: InputDefinition): FieldSpecification;
    textArea(spec: TextAreaDefinition): FieldSpecification;
    select(spec: SelectDefinition): FieldSpecification;
    email(spec: InputDefinition): FieldSpecification;
    checkbox(spec: OnOffInputDefinition): FieldSpecification;
    hidden(spec: HiddenInputDefinition): FieldSpecification;
    switch(spec: OnOffInputDefinition): FieldSpecification;
    number(spec: OnOffInputDefinition): FieldSpecification;
    time(spec: OnOffInputDefinition): FieldSpecification;
    removeItem(name: string): FieldSpecification;
    getDefinitions(): Map<string, InputDataDefinition>;
    getDefByName(name: string): InputDataDefinition | undefined;
    updateFieldDef(spec: BaseInputDefinition): FieldSpecification;
    updateDefByMap(name: string, props: Map<string, any>): void;
    hideInput(name: string): this;
    mergeDefinition(fieldDefinition?: Map<string, InputDataDefinition>): FieldSpecification;
}
