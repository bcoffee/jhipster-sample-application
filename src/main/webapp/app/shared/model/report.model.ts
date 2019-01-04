import { IReportType } from 'app/shared/model//report-type.model';
import { IUser } from 'app/core/user/user.model';
import { IReportCategory } from 'app/shared/model//report-category.model';

export const enum Language {
    ENGLISH = 'ENGLISH',
    SPANISH = 'SPANISH',
    FRENCH = 'FRENCH'
}

export interface IReport {
    id?: number;
    name?: string;
    description?: string;
    language?: Language;
    instructions?: string;
    layoutContentType?: string;
    layout?: any;
    reportType?: IReportType;
    reportOwner?: IUser;
    reportCategory?: IReportCategory;
}

export class Report implements IReport {
    constructor(
        public id?: number,
        public name?: string,
        public description?: string,
        public language?: Language,
        public instructions?: string,
        public layoutContentType?: string,
        public layout?: any,
        public reportType?: IReportType,
        public reportOwner?: IUser,
        public reportCategory?: IReportCategory
    ) {}
}
