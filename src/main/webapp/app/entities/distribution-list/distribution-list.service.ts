import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IDistributionList } from 'app/shared/model/distribution-list.model';

type EntityResponseType = HttpResponse<IDistributionList>;
type EntityArrayResponseType = HttpResponse<IDistributionList[]>;

@Injectable({ providedIn: 'root' })
export class DistributionListService {
    public resourceUrl = SERVER_API_URL + 'api/distribution-lists';

    constructor(protected http: HttpClient) {}

    create(distributionList: IDistributionList): Observable<EntityResponseType> {
        return this.http.post<IDistributionList>(this.resourceUrl, distributionList, { observe: 'response' });
    }

    update(distributionList: IDistributionList): Observable<EntityResponseType> {
        return this.http.put<IDistributionList>(this.resourceUrl, distributionList, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IDistributionList>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IDistributionList[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
