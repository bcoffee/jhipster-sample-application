import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ReportSubscription } from 'app/shared/model/report-subscription.model';
import { ReportSubscriptionService } from './report-subscription.service';
import { ReportSubscriptionComponent } from './report-subscription.component';
import { ReportSubscriptionDetailComponent } from './report-subscription-detail.component';
import { ReportSubscriptionUpdateComponent } from './report-subscription-update.component';
import { ReportSubscriptionDeletePopupComponent } from './report-subscription-delete-dialog.component';
import { IReportSubscription } from 'app/shared/model/report-subscription.model';

@Injectable({ providedIn: 'root' })
export class ReportSubscriptionResolve implements Resolve<IReportSubscription> {
    constructor(private service: ReportSubscriptionService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ReportSubscription> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<ReportSubscription>) => response.ok),
                map((reportSubscription: HttpResponse<ReportSubscription>) => reportSubscription.body)
            );
        }
        return of(new ReportSubscription());
    }
}

export const reportSubscriptionRoute: Routes = [
    {
        path: 'report-subscription',
        component: ReportSubscriptionComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ReportSubscriptions'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'report-subscription/:id/view',
        component: ReportSubscriptionDetailComponent,
        resolve: {
            reportSubscription: ReportSubscriptionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ReportSubscriptions'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'report-subscription/new',
        component: ReportSubscriptionUpdateComponent,
        resolve: {
            reportSubscription: ReportSubscriptionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ReportSubscriptions'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'report-subscription/:id/edit',
        component: ReportSubscriptionUpdateComponent,
        resolve: {
            reportSubscription: ReportSubscriptionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ReportSubscriptions'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const reportSubscriptionPopupRoute: Routes = [
    {
        path: 'report-subscription/:id/delete',
        component: ReportSubscriptionDeletePopupComponent,
        resolve: {
            reportSubscription: ReportSubscriptionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ReportSubscriptions'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
