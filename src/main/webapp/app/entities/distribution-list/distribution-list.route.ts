import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { DistributionList } from 'app/shared/model/distribution-list.model';
import { DistributionListService } from './distribution-list.service';
import { DistributionListComponent } from './distribution-list.component';
import { DistributionListDetailComponent } from './distribution-list-detail.component';
import { DistributionListUpdateComponent } from './distribution-list-update.component';
import { DistributionListDeletePopupComponent } from './distribution-list-delete-dialog.component';
import { IDistributionList } from 'app/shared/model/distribution-list.model';

@Injectable({ providedIn: 'root' })
export class DistributionListResolve implements Resolve<IDistributionList> {
    constructor(private service: DistributionListService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<DistributionList> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<DistributionList>) => response.ok),
                map((distributionList: HttpResponse<DistributionList>) => distributionList.body)
            );
        }
        return of(new DistributionList());
    }
}

export const distributionListRoute: Routes = [
    {
        path: 'distribution-list',
        component: DistributionListComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DistributionLists'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'distribution-list/:id/view',
        component: DistributionListDetailComponent,
        resolve: {
            distributionList: DistributionListResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DistributionLists'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'distribution-list/new',
        component: DistributionListUpdateComponent,
        resolve: {
            distributionList: DistributionListResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DistributionLists'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'distribution-list/:id/edit',
        component: DistributionListUpdateComponent,
        resolve: {
            distributionList: DistributionListResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DistributionLists'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const distributionListPopupRoute: Routes = [
    {
        path: 'distribution-list/:id/delete',
        component: DistributionListDeletePopupComponent,
        resolve: {
            distributionList: DistributionListResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DistributionLists'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
