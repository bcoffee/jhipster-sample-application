import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { INoteCategory } from 'app/shared/model/note-category.model';

type EntityResponseType = HttpResponse<INoteCategory>;
type EntityArrayResponseType = HttpResponse<INoteCategory[]>;

@Injectable({ providedIn: 'root' })
export class NoteCategoryService {
    public resourceUrl = SERVER_API_URL + 'api/note-categories';

    constructor(protected http: HttpClient) {}

    create(noteCategory: INoteCategory): Observable<EntityResponseType> {
        return this.http.post<INoteCategory>(this.resourceUrl, noteCategory, { observe: 'response' });
    }

    update(noteCategory: INoteCategory): Observable<EntityResponseType> {
        return this.http.put<INoteCategory>(this.resourceUrl, noteCategory, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<INoteCategory>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<INoteCategory[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
