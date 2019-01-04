export interface IReportType {
    id?: number;
    name?: string;
}

export class ReportType implements IReportType {
    constructor(public id?: number, public name?: string) {}
}
