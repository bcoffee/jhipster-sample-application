import { IEnObject } from 'app/shared/model//en-object.model';
import { IAttributeOption } from 'app/shared/model//attribute-option.model';

export interface IAttribute {
    id?: number;
    name?: string;
    description?: string;
    isSystem?: boolean;
    type?: string;
    enObject?: IEnObject;
    objectOptions?: IAttributeOption[];
}

export class Attribute implements IAttribute {
    constructor(
        public id?: number,
        public name?: string,
        public description?: string,
        public isSystem?: boolean,
        public type?: string,
        public enObject?: IEnObject,
        public objectOptions?: IAttributeOption[]
    ) {
        this.isSystem = this.isSystem || false;
    }
}
