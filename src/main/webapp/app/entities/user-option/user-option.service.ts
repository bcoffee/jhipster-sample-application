import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IUserOption } from 'app/shared/model/user-option.model';

type EntityResponseType = HttpResponse<IUserOption>;
type EntityArrayResponseType = HttpResponse<IUserOption[]>;

@Injectable({ providedIn: 'root' })
export class UserOptionService {
    public resourceUrl = SERVER_API_URL + 'api/user-options';

    constructor(protected http: HttpClient) {}

    create(userOption: IUserOption): Observable<EntityResponseType> {
        return this.http.post<IUserOption>(this.resourceUrl, userOption, { observe: 'response' });
    }

    update(userOption: IUserOption): Observable<EntityResponseType> {
        return this.http.put<IUserOption>(this.resourceUrl, userOption, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IUserOption>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IUserOption[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
