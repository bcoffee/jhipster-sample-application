import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IModelCode } from 'app/shared/model/model-code.model';

type EntityResponseType = HttpResponse<IModelCode>;
type EntityArrayResponseType = HttpResponse<IModelCode[]>;

@Injectable({ providedIn: 'root' })
export class ModelCodeService {
    public resourceUrl = SERVER_API_URL + 'api/model-codes';

    constructor(protected http: HttpClient) {}

    create(modelCode: IModelCode): Observable<EntityResponseType> {
        return this.http.post<IModelCode>(this.resourceUrl, modelCode, { observe: 'response' });
    }

    update(modelCode: IModelCode): Observable<EntityResponseType> {
        return this.http.put<IModelCode>(this.resourceUrl, modelCode, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IModelCode>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IModelCode[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
