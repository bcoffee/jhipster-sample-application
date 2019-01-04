import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Baseline } from 'app/shared/model/baseline.model';
import { BaselineService } from './baseline.service';
import { BaselineComponent } from './baseline.component';
import { BaselineDetailComponent } from './baseline-detail.component';
import { BaselineUpdateComponent } from './baseline-update.component';
import { BaselineDeletePopupComponent } from './baseline-delete-dialog.component';
import { IBaseline } from 'app/shared/model/baseline.model';

@Injectable({ providedIn: 'root' })
export class BaselineResolve implements Resolve<IBaseline> {
    constructor(private service: BaselineService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Baseline> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Baseline>) => response.ok),
                map((baseline: HttpResponse<Baseline>) => baseline.body)
            );
        }
        return of(new Baseline());
    }
}

export const baselineRoute: Routes = [
    {
        path: 'baseline',
        component: BaselineComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Baselines'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'baseline/:id/view',
        component: BaselineDetailComponent,
        resolve: {
            baseline: BaselineResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Baselines'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'baseline/new',
        component: BaselineUpdateComponent,
        resolve: {
            baseline: BaselineResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Baselines'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'baseline/:id/edit',
        component: BaselineUpdateComponent,
        resolve: {
            baseline: BaselineResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Baselines'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const baselinePopupRoute: Routes = [
    {
        path: 'baseline/:id/delete',
        component: BaselineDeletePopupComponent,
        resolve: {
            baseline: BaselineResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Baselines'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
