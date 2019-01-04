import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { INotificationParameter } from 'app/shared/model/notification-parameter.model';

type EntityResponseType = HttpResponse<INotificationParameter>;
type EntityArrayResponseType = HttpResponse<INotificationParameter[]>;

@Injectable({ providedIn: 'root' })
export class NotificationParameterService {
    public resourceUrl = SERVER_API_URL + 'api/notification-parameters';

    constructor(protected http: HttpClient) {}

    create(notificationParameter: INotificationParameter): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(notificationParameter);
        return this.http
            .post<INotificationParameter>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(notificationParameter: INotificationParameter): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(notificationParameter);
        return this.http
            .put<INotificationParameter>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<INotificationParameter>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<INotificationParameter[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(notificationParameter: INotificationParameter): INotificationParameter {
        const copy: INotificationParameter = Object.assign({}, notificationParameter, {
            scaneDate:
                notificationParameter.scaneDate != null && notificationParameter.scaneDate.isValid()
                    ? notificationParameter.scaneDate.format(DATE_FORMAT)
                    : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.scaneDate = res.body.scaneDate != null ? moment(res.body.scaneDate) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((notificationParameter: INotificationParameter) => {
                notificationParameter.scaneDate = notificationParameter.scaneDate != null ? moment(notificationParameter.scaneDate) : null;
            });
        }
        return res;
    }
}
