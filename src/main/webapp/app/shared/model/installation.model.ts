import { IEnObject } from 'app/shared/model//en-object.model';
import { ILicence } from 'app/shared/model//licence.model';

export const enum Language {
    ENGLISH = 'ENGLISH',
    SPANISH = 'SPANISH',
    FRENCH = 'FRENCH'
}

export interface IInstallation {
    id?: number;
    name?: string;
    description?: string;
    language?: Language;
    streetAddress?: string;
    postalCode?: string;
    city?: string;
    stateProvince?: string;
    timeZone?: string;
    installation?: IEnObject;
    installationLicence?: ILicence;
}

export class Installation implements IInstallation {
    constructor(
        public id?: number,
        public name?: string,
        public description?: string,
        public language?: Language,
        public streetAddress?: string,
        public postalCode?: string,
        public city?: string,
        public stateProvince?: string,
        public timeZone?: string,
        public installation?: IEnObject,
        public installationLicence?: ILicence
    ) {}
}
