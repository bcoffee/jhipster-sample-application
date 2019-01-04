import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Note } from 'app/shared/model/note.model';
import { NoteService } from './note.service';
import { NoteComponent } from './note.component';
import { NoteDetailComponent } from './note-detail.component';
import { NoteUpdateComponent } from './note-update.component';
import { NoteDeletePopupComponent } from './note-delete-dialog.component';
import { INote } from 'app/shared/model/note.model';

@Injectable({ providedIn: 'root' })
export class NoteResolve implements Resolve<INote> {
    constructor(private service: NoteService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Note> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Note>) => response.ok),
                map((note: HttpResponse<Note>) => note.body)
            );
        }
        return of(new Note());
    }
}

export const noteRoute: Routes = [
    {
        path: 'note',
        component: NoteComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Notes'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'note/:id/view',
        component: NoteDetailComponent,
        resolve: {
            note: NoteResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Notes'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'note/new',
        component: NoteUpdateComponent,
        resolve: {
            note: NoteResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Notes'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'note/:id/edit',
        component: NoteUpdateComponent,
        resolve: {
            note: NoteResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Notes'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const notePopupRoute: Routes = [
    {
        path: 'note/:id/delete',
        component: NoteDeletePopupComponent,
        resolve: {
            note: NoteResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Notes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
