export interface IAttribute {
    id?: number;
    name?: string;
    description?: string;
    isSystem?: boolean;
    type?: string;
}

export class Attribute implements IAttribute {
    constructor(public id?: number, public name?: string, public description?: string, public isSystem?: boolean, public type?: string) {
        this.isSystem = this.isSystem || false;
    }
}
