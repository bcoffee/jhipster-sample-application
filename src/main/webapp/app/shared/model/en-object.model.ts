import { IEnObjectType } from 'app/shared/model//en-object-type.model';
import { IEnObject } from 'app/shared/model//en-object.model';

export const enum Language {
    ENGLISH = 'ENGLISH',
    SPANISH = 'SPANISH',
    FRENCH = 'FRENCH'
}

export interface IEnObject {
    id?: number;
    name?: string;
    description?: string;
    language?: Language;
    objectType?: IEnObjectType;
    objectParent?: IEnObject;
}

export class EnObject implements IEnObject {
    constructor(
        public id?: number,
        public name?: string,
        public description?: string,
        public language?: Language,
        public objectType?: IEnObjectType,
        public objectParent?: IEnObject
    ) {}
}
