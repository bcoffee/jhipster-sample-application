import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ILicence } from 'app/shared/model/licence.model';

type EntityResponseType = HttpResponse<ILicence>;
type EntityArrayResponseType = HttpResponse<ILicence[]>;

@Injectable({ providedIn: 'root' })
export class LicenceService {
    public resourceUrl = SERVER_API_URL + 'api/licences';

    constructor(protected http: HttpClient) {}

    create(licence: ILicence): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(licence);
        return this.http
            .post<ILicence>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(licence: ILicence): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(licence);
        return this.http
            .put<ILicence>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<ILicence>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ILicence[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(licence: ILicence): ILicence {
        const copy: ILicence = Object.assign({}, licence, {
            startDate: licence.startDate != null && licence.startDate.isValid() ? licence.startDate.format(DATE_FORMAT) : null,
            endDate: licence.endDate != null && licence.endDate.isValid() ? licence.endDate.format(DATE_FORMAT) : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.startDate = res.body.startDate != null ? moment(res.body.startDate) : null;
            res.body.endDate = res.body.endDate != null ? moment(res.body.endDate) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((licence: ILicence) => {
                licence.startDate = licence.startDate != null ? moment(licence.startDate) : null;
                licence.endDate = licence.endDate != null ? moment(licence.endDate) : null;
            });
        }
        return res;
    }
}
