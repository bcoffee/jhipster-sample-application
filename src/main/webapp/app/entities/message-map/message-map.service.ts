import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IMessageMap } from 'app/shared/model/message-map.model';

type EntityResponseType = HttpResponse<IMessageMap>;
type EntityArrayResponseType = HttpResponse<IMessageMap[]>;

@Injectable({ providedIn: 'root' })
export class MessageMapService {
    public resourceUrl = SERVER_API_URL + 'api/message-maps';

    constructor(protected http: HttpClient) {}

    create(messageMap: IMessageMap): Observable<EntityResponseType> {
        return this.http.post<IMessageMap>(this.resourceUrl, messageMap, { observe: 'response' });
    }

    update(messageMap: IMessageMap): Observable<EntityResponseType> {
        return this.http.put<IMessageMap>(this.resourceUrl, messageMap, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IMessageMap>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IMessageMap[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
