import { IInstallation } from 'app/shared/model//installation.model';

export interface ICustomer {
    id?: number;
    name?: string;
    description?: string;
    customerInstallation?: IInstallation;
}

export class Customer implements ICustomer {
    constructor(public id?: number, public name?: string, public description?: string, public customerInstallation?: IInstallation) {}
}
