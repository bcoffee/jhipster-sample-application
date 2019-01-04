import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IAttributeOption } from 'app/shared/model/attribute-option.model';

type EntityResponseType = HttpResponse<IAttributeOption>;
type EntityArrayResponseType = HttpResponse<IAttributeOption[]>;

@Injectable({ providedIn: 'root' })
export class AttributeOptionService {
    public resourceUrl = SERVER_API_URL + 'api/attribute-options';

    constructor(protected http: HttpClient) {}

    create(attributeOption: IAttributeOption): Observable<EntityResponseType> {
        return this.http.post<IAttributeOption>(this.resourceUrl, attributeOption, { observe: 'response' });
    }

    update(attributeOption: IAttributeOption): Observable<EntityResponseType> {
        return this.http.put<IAttributeOption>(this.resourceUrl, attributeOption, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IAttributeOption>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IAttributeOption[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
