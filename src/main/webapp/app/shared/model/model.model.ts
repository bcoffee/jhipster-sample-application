export interface IModel {
    id?: number;
    name?: string;
}

export class Model implements IModel {
    constructor(public id?: number, public name?: string) {}
}
