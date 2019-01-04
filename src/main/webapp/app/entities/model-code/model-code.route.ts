import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ModelCode } from 'app/shared/model/model-code.model';
import { ModelCodeService } from './model-code.service';
import { ModelCodeComponent } from './model-code.component';
import { ModelCodeDetailComponent } from './model-code-detail.component';
import { ModelCodeUpdateComponent } from './model-code-update.component';
import { ModelCodeDeletePopupComponent } from './model-code-delete-dialog.component';
import { IModelCode } from 'app/shared/model/model-code.model';

@Injectable({ providedIn: 'root' })
export class ModelCodeResolve implements Resolve<IModelCode> {
    constructor(private service: ModelCodeService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ModelCode> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<ModelCode>) => response.ok),
                map((modelCode: HttpResponse<ModelCode>) => modelCode.body)
            );
        }
        return of(new ModelCode());
    }
}

export const modelCodeRoute: Routes = [
    {
        path: 'model-code',
        component: ModelCodeComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ModelCodes'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'model-code/:id/view',
        component: ModelCodeDetailComponent,
        resolve: {
            modelCode: ModelCodeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ModelCodes'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'model-code/new',
        component: ModelCodeUpdateComponent,
        resolve: {
            modelCode: ModelCodeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ModelCodes'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'model-code/:id/edit',
        component: ModelCodeUpdateComponent,
        resolve: {
            modelCode: ModelCodeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ModelCodes'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const modelCodePopupRoute: Routes = [
    {
        path: 'model-code/:id/delete',
        component: ModelCodeDeletePopupComponent,
        resolve: {
            modelCode: ModelCodeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ModelCodes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
