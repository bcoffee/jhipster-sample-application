import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { UserOption } from 'app/shared/model/user-option.model';
import { UserOptionService } from './user-option.service';
import { UserOptionComponent } from './user-option.component';
import { UserOptionDetailComponent } from './user-option-detail.component';
import { UserOptionUpdateComponent } from './user-option-update.component';
import { UserOptionDeletePopupComponent } from './user-option-delete-dialog.component';
import { IUserOption } from 'app/shared/model/user-option.model';

@Injectable({ providedIn: 'root' })
export class UserOptionResolve implements Resolve<IUserOption> {
    constructor(private service: UserOptionService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<UserOption> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<UserOption>) => response.ok),
                map((userOption: HttpResponse<UserOption>) => userOption.body)
            );
        }
        return of(new UserOption());
    }
}

export const userOptionRoute: Routes = [
    {
        path: 'user-option',
        component: UserOptionComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'UserOptions'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'user-option/:id/view',
        component: UserOptionDetailComponent,
        resolve: {
            userOption: UserOptionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'UserOptions'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'user-option/new',
        component: UserOptionUpdateComponent,
        resolve: {
            userOption: UserOptionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'UserOptions'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'user-option/:id/edit',
        component: UserOptionUpdateComponent,
        resolve: {
            userOption: UserOptionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'UserOptions'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const userOptionPopupRoute: Routes = [
    {
        path: 'user-option/:id/delete',
        component: UserOptionDeletePopupComponent,
        resolve: {
            userOption: UserOptionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'UserOptions'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
