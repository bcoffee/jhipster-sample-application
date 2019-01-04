import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IReportSubscription } from 'app/shared/model/report-subscription.model';

type EntityResponseType = HttpResponse<IReportSubscription>;
type EntityArrayResponseType = HttpResponse<IReportSubscription[]>;

@Injectable({ providedIn: 'root' })
export class ReportSubscriptionService {
    public resourceUrl = SERVER_API_URL + 'api/report-subscriptions';

    constructor(protected http: HttpClient) {}

    create(reportSubscription: IReportSubscription): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(reportSubscription);
        return this.http
            .post<IReportSubscription>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(reportSubscription: IReportSubscription): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(reportSubscription);
        return this.http
            .put<IReportSubscription>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IReportSubscription>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IReportSubscription[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(reportSubscription: IReportSubscription): IReportSubscription {
        const copy: IReportSubscription = Object.assign({}, reportSubscription, {
            startDate:
                reportSubscription.startDate != null && reportSubscription.startDate.isValid()
                    ? reportSubscription.startDate.format(DATE_FORMAT)
                    : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.startDate = res.body.startDate != null ? moment(res.body.startDate) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((reportSubscription: IReportSubscription) => {
                reportSubscription.startDate = reportSubscription.startDate != null ? moment(reportSubscription.startDate) : null;
            });
        }
        return res;
    }
}
