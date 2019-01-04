import { IAttribute } from 'app/shared/model//attribute.model';

export interface IAttributeOption {
    id?: number;
    name?: string;
    value?: string;
    attribute?: IAttribute;
}

export class AttributeOption implements IAttributeOption {
    constructor(public id?: number, public name?: string, public value?: string, public attribute?: IAttribute) {}
}
