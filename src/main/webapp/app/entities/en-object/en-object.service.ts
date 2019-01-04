import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IEnObject } from 'app/shared/model/en-object.model';

type EntityResponseType = HttpResponse<IEnObject>;
type EntityArrayResponseType = HttpResponse<IEnObject[]>;

@Injectable({ providedIn: 'root' })
export class EnObjectService {
    public resourceUrl = SERVER_API_URL + 'api/en-objects';

    constructor(protected http: HttpClient) {}

    create(enObject: IEnObject): Observable<EntityResponseType> {
        return this.http.post<IEnObject>(this.resourceUrl, enObject, { observe: 'response' });
    }

    update(enObject: IEnObject): Observable<EntityResponseType> {
        return this.http.put<IEnObject>(this.resourceUrl, enObject, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IEnObject>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IEnObject[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
