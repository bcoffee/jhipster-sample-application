import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IEnObjectType } from 'app/shared/model/en-object-type.model';

type EntityResponseType = HttpResponse<IEnObjectType>;
type EntityArrayResponseType = HttpResponse<IEnObjectType[]>;

@Injectable({ providedIn: 'root' })
export class EnObjectTypeService {
    public resourceUrl = SERVER_API_URL + 'api/en-object-types';

    constructor(protected http: HttpClient) {}

    create(enObjectType: IEnObjectType): Observable<EntityResponseType> {
        return this.http.post<IEnObjectType>(this.resourceUrl, enObjectType, { observe: 'response' });
    }

    update(enObjectType: IEnObjectType): Observable<EntityResponseType> {
        return this.http.put<IEnObjectType>(this.resourceUrl, enObjectType, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IEnObjectType>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IEnObjectType[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
