import { IDistributionList } from 'app/shared/model//distribution-list.model';
import { IUser } from 'app/core/user/user.model';

export const enum Language {
    ENGLISH = 'ENGLISH',
    SPANISH = 'SPANISH',
    FRENCH = 'FRENCH'
}

export interface INotification {
    id?: number;
    name?: string;
    description?: string;
    language?: Language;
    email?: string;
    phone?: string;
    notificationDistributionList?: IDistributionList;
    notificationDUser?: IUser;
}

export class Notification implements INotification {
    constructor(
        public id?: number,
        public name?: string,
        public description?: string,
        public language?: Language,
        public email?: string,
        public phone?: string,
        public notificationDistributionList?: IDistributionList,
        public notificationDUser?: IUser
    ) {}
}
