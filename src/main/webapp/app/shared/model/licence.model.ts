import { Moment } from 'moment';

export interface ILicence {
    id?: number;
    startDate?: Moment;
    endDate?: Moment;
    features?: number;
}

export class Licence implements ILicence {
    constructor(public id?: number, public startDate?: Moment, public endDate?: Moment, public features?: number) {}
}
