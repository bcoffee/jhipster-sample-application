import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { EnObject } from 'app/shared/model/en-object.model';
import { EnObjectService } from './en-object.service';
import { EnObjectComponent } from './en-object.component';
import { EnObjectDetailComponent } from './en-object-detail.component';
import { EnObjectUpdateComponent } from './en-object-update.component';
import { EnObjectDeletePopupComponent } from './en-object-delete-dialog.component';
import { IEnObject } from 'app/shared/model/en-object.model';

@Injectable({ providedIn: 'root' })
export class EnObjectResolve implements Resolve<IEnObject> {
    constructor(private service: EnObjectService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<EnObject> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<EnObject>) => response.ok),
                map((enObject: HttpResponse<EnObject>) => enObject.body)
            );
        }
        return of(new EnObject());
    }
}

export const enObjectRoute: Routes = [
    {
        path: 'en-object',
        component: EnObjectComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EnObjects'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'en-object/:id/view',
        component: EnObjectDetailComponent,
        resolve: {
            enObject: EnObjectResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EnObjects'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'en-object/new',
        component: EnObjectUpdateComponent,
        resolve: {
            enObject: EnObjectResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EnObjects'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'en-object/:id/edit',
        component: EnObjectUpdateComponent,
        resolve: {
            enObject: EnObjectResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EnObjects'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const enObjectPopupRoute: Routes = [
    {
        path: 'en-object/:id/delete',
        component: EnObjectDeletePopupComponent,
        resolve: {
            enObject: EnObjectResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EnObjects'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
