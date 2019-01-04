import { Moment } from 'moment';
import { IReport } from 'app/shared/model//report.model';
import { IDistributionList } from 'app/shared/model//distribution-list.model';
import { IUser } from 'app/core/user/user.model';

export const enum Language {
    ENGLISH = 'ENGLISH',
    SPANISH = 'SPANISH',
    FRENCH = 'FRENCH'
}

export interface IReportSubscription {
    id?: number;
    name?: string;
    description?: string;
    language?: Language;
    startDate?: Moment;
    range?: string;
    rangeN?: number;
    active?: boolean;
    emailMessage?: string;
    subscriptionReport?: IReport;
    subscriptionDistributionList?: IDistributionList;
    subscriptionUser?: IUser;
}

export class ReportSubscription implements IReportSubscription {
    constructor(
        public id?: number,
        public name?: string,
        public description?: string,
        public language?: Language,
        public startDate?: Moment,
        public range?: string,
        public rangeN?: number,
        public active?: boolean,
        public emailMessage?: string,
        public subscriptionReport?: IReport,
        public subscriptionDistributionList?: IDistributionList,
        public subscriptionUser?: IUser
    ) {
        this.active = this.active || false;
    }
}
