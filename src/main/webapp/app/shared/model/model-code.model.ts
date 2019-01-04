export interface IModelCode {
    id?: number;
    name?: string;
}

export class ModelCode implements IModelCode {
    constructor(public id?: number, public name?: string) {}
}
