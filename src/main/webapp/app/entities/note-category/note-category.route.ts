import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { NoteCategory } from 'app/shared/model/note-category.model';
import { NoteCategoryService } from './note-category.service';
import { NoteCategoryComponent } from './note-category.component';
import { NoteCategoryDetailComponent } from './note-category-detail.component';
import { NoteCategoryUpdateComponent } from './note-category-update.component';
import { NoteCategoryDeletePopupComponent } from './note-category-delete-dialog.component';
import { INoteCategory } from 'app/shared/model/note-category.model';

@Injectable({ providedIn: 'root' })
export class NoteCategoryResolve implements Resolve<INoteCategory> {
    constructor(private service: NoteCategoryService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<NoteCategory> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<NoteCategory>) => response.ok),
                map((noteCategory: HttpResponse<NoteCategory>) => noteCategory.body)
            );
        }
        return of(new NoteCategory());
    }
}

export const noteCategoryRoute: Routes = [
    {
        path: 'note-category',
        component: NoteCategoryComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'NoteCategories'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'note-category/:id/view',
        component: NoteCategoryDetailComponent,
        resolve: {
            noteCategory: NoteCategoryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'NoteCategories'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'note-category/new',
        component: NoteCategoryUpdateComponent,
        resolve: {
            noteCategory: NoteCategoryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'NoteCategories'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'note-category/:id/edit',
        component: NoteCategoryUpdateComponent,
        resolve: {
            noteCategory: NoteCategoryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'NoteCategories'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const noteCategoryPopupRoute: Routes = [
    {
        path: 'note-category/:id/delete',
        component: NoteCategoryDeletePopupComponent,
        resolve: {
            noteCategory: NoteCategoryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'NoteCategories'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
