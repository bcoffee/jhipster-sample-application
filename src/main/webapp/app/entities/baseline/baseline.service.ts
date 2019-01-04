import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IBaseline } from 'app/shared/model/baseline.model';

type EntityResponseType = HttpResponse<IBaseline>;
type EntityArrayResponseType = HttpResponse<IBaseline[]>;

@Injectable({ providedIn: 'root' })
export class BaselineService {
    public resourceUrl = SERVER_API_URL + 'api/baselines';

    constructor(protected http: HttpClient) {}

    create(baseline: IBaseline): Observable<EntityResponseType> {
        return this.http.post<IBaseline>(this.resourceUrl, baseline, { observe: 'response' });
    }

    update(baseline: IBaseline): Observable<EntityResponseType> {
        return this.http.put<IBaseline>(this.resourceUrl, baseline, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IBaseline>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IBaseline[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
