export interface IAttributeOption {
    id?: number;
    name?: string;
    value?: string;
}

export class AttributeOption implements IAttributeOption {
    constructor(public id?: number, public name?: string, public value?: string) {}
}
