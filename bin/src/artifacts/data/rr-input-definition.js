export class FieldSpecification {
    constructor() {
        this.fieldDefinition = new Map();
    }
    text(spec) {
        spec.type = "text";
        this.fieldDefinition.set(spec.name, spec);
        return this;
    }
    file(spec) {
        spec.type = "file";
        this.fieldDefinition.set(spec.name, spec);
        return this;
    }
    url(spec) {
        spec.type = "url";
        this.fieldDefinition.set(spec.name, spec);
        return this;
    }
    password(spec) {
        spec.type = "password";
        this.fieldDefinition.set(spec.name, spec);
        return this;
    }
    textArea(spec) {
        spec.type = "textarea";
        this.fieldDefinition.set(spec.name, spec);
        return this;
    }
    select(spec) {
        spec.type = "select";
        this.fieldDefinition.set(spec.name, spec);
        return this;
    }
    email(spec) {
        spec.type = "email";
        this.fieldDefinition.set(spec.name, spec);
        return this;
    }
    checkbox(spec) {
        spec.type = "checkbox";
        this.fieldDefinition.set(spec.name, spec);
        return this;
    }
    hidden(spec) {
        spec.type = "hidden";
        this.fieldDefinition.set(spec.name, spec);
        return this;
    }
    switch(spec) {
        spec.type = "switch";
        this.fieldDefinition.set(spec.name, spec);
        return this;
    }
    number(spec) {
        spec.type = "number";
        this.fieldDefinition.set(spec.name, spec);
        return this;
    }
    time(spec) {
        spec.type = "time";
        this.fieldDefinition.set(spec.name, spec);
        return this;
    }
    removeItem(name) {
        this.fieldDefinition.delete(name);
        return this;
    }
    getDefinitions() {
        return this.fieldDefinition;
    }
    getDefByName(name) {
        return this.fieldDefinition.get(name);
    }
    updateFieldDef(spec) {
        this.fieldDefinition.set(spec.name, spec);
        return this;
    }
    updateDefByMap(name, props) {
        let definition = this.getDefByName(name);
        if (!definition || !props) {
            return;
        }
        props.forEach((value, name) => {
            definition[name] = value;
        });
        this.updateFieldDef(definition);
    }
    hideInput(name) {
        let definition = this.getDefByName(name);
        if (definition) {
            definition.isHideInput = true;
            this.updateFieldDef(definition);
        }
        return this;
    }
    mergeDefinition(fieldDefinition) {
        if (fieldDefinition) {
            fieldDefinition.forEach((definition, name) => {
                this.fieldDefinition.set(definition.name, definition);
            });
        }
        return this;
    }
}
