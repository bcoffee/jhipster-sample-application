import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { EnObjectType } from 'app/shared/model/en-object-type.model';
import { EnObjectTypeService } from './en-object-type.service';
import { EnObjectTypeComponent } from './en-object-type.component';
import { EnObjectTypeDetailComponent } from './en-object-type-detail.component';
import { EnObjectTypeUpdateComponent } from './en-object-type-update.component';
import { EnObjectTypeDeletePopupComponent } from './en-object-type-delete-dialog.component';
import { IEnObjectType } from 'app/shared/model/en-object-type.model';

@Injectable({ providedIn: 'root' })
export class EnObjectTypeResolve implements Resolve<IEnObjectType> {
    constructor(private service: EnObjectTypeService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<EnObjectType> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<EnObjectType>) => response.ok),
                map((enObjectType: HttpResponse<EnObjectType>) => enObjectType.body)
            );
        }
        return of(new EnObjectType());
    }
}

export const enObjectTypeRoute: Routes = [
    {
        path: 'en-object-type',
        component: EnObjectTypeComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EnObjectTypes'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'en-object-type/:id/view',
        component: EnObjectTypeDetailComponent,
        resolve: {
            enObjectType: EnObjectTypeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EnObjectTypes'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'en-object-type/new',
        component: EnObjectTypeUpdateComponent,
        resolve: {
            enObjectType: EnObjectTypeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EnObjectTypes'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'en-object-type/:id/edit',
        component: EnObjectTypeUpdateComponent,
        resolve: {
            enObjectType: EnObjectTypeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EnObjectTypes'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const enObjectTypePopupRoute: Routes = [
    {
        path: 'en-object-type/:id/delete',
        component: EnObjectTypeDeletePopupComponent,
        resolve: {
            enObjectType: EnObjectTypeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EnObjectTypes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
