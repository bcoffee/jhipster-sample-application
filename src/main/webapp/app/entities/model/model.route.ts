import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Model } from 'app/shared/model/model.model';
import { ModelService } from './model.service';
import { ModelComponent } from './model.component';
import { ModelDetailComponent } from './model-detail.component';
import { ModelUpdateComponent } from './model-update.component';
import { ModelDeletePopupComponent } from './model-delete-dialog.component';
import { IModel } from 'app/shared/model/model.model';

@Injectable({ providedIn: 'root' })
export class ModelResolve implements Resolve<IModel> {
    constructor(private service: ModelService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Model> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Model>) => response.ok),
                map((model: HttpResponse<Model>) => model.body)
            );
        }
        return of(new Model());
    }
}

export const modelRoute: Routes = [
    {
        path: 'model',
        component: ModelComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Models'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'model/:id/view',
        component: ModelDetailComponent,
        resolve: {
            model: ModelResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Models'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'model/new',
        component: ModelUpdateComponent,
        resolve: {
            model: ModelResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Models'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'model/:id/edit',
        component: ModelUpdateComponent,
        resolve: {
            model: ModelResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Models'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const modelPopupRoute: Routes = [
    {
        path: 'model/:id/delete',
        component: ModelDeletePopupComponent,
        resolve: {
            model: ModelResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Models'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
