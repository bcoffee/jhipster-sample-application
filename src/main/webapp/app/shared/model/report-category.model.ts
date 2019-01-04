export interface IReportCategory {
    id?: number;
    name?: string;
}

export class ReportCategory implements IReportCategory {
    constructor(public id?: number, public name?: string) {}
}
