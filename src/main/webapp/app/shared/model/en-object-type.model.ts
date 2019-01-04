export interface IEnObjectType {
    id?: number;
    name?: string;
}

export class EnObjectType implements IEnObjectType {
    constructor(public id?: number, public name?: string) {}
}
