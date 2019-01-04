export interface IDistributionList {
    id?: number;
    name?: string;
}

export class DistributionList implements IDistributionList {
    constructor(public id?: number, public name?: string) {}
}
