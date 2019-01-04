import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { NotificationParameter } from 'app/shared/model/notification-parameter.model';
import { NotificationParameterService } from './notification-parameter.service';
import { NotificationParameterComponent } from './notification-parameter.component';
import { NotificationParameterDetailComponent } from './notification-parameter-detail.component';
import { NotificationParameterUpdateComponent } from './notification-parameter-update.component';
import { NotificationParameterDeletePopupComponent } from './notification-parameter-delete-dialog.component';
import { INotificationParameter } from 'app/shared/model/notification-parameter.model';

@Injectable({ providedIn: 'root' })
export class NotificationParameterResolve implements Resolve<INotificationParameter> {
    constructor(private service: NotificationParameterService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<NotificationParameter> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<NotificationParameter>) => response.ok),
                map((notificationParameter: HttpResponse<NotificationParameter>) => notificationParameter.body)
            );
        }
        return of(new NotificationParameter());
    }
}

export const notificationParameterRoute: Routes = [
    {
        path: 'notification-parameter',
        component: NotificationParameterComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'NotificationParameters'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'notification-parameter/:id/view',
        component: NotificationParameterDetailComponent,
        resolve: {
            notificationParameter: NotificationParameterResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'NotificationParameters'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'notification-parameter/new',
        component: NotificationParameterUpdateComponent,
        resolve: {
            notificationParameter: NotificationParameterResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'NotificationParameters'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'notification-parameter/:id/edit',
        component: NotificationParameterUpdateComponent,
        resolve: {
            notificationParameter: NotificationParameterResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'NotificationParameters'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const notificationParameterPopupRoute: Routes = [
    {
        path: 'notification-parameter/:id/delete',
        component: NotificationParameterDeletePopupComponent,
        resolve: {
            notificationParameter: NotificationParameterResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'NotificationParameters'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
