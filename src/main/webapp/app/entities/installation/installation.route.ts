import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Installation } from 'app/shared/model/installation.model';
import { InstallationService } from './installation.service';
import { InstallationComponent } from './installation.component';
import { InstallationDetailComponent } from './installation-detail.component';
import { InstallationUpdateComponent } from './installation-update.component';
import { InstallationDeletePopupComponent } from './installation-delete-dialog.component';
import { IInstallation } from 'app/shared/model/installation.model';

@Injectable({ providedIn: 'root' })
export class InstallationResolve implements Resolve<IInstallation> {
    constructor(private service: InstallationService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Installation> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Installation>) => response.ok),
                map((installation: HttpResponse<Installation>) => installation.body)
            );
        }
        return of(new Installation());
    }
}

export const installationRoute: Routes = [
    {
        path: 'installation',
        component: InstallationComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Installations'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'installation/:id/view',
        component: InstallationDetailComponent,
        resolve: {
            installation: InstallationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Installations'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'installation/new',
        component: InstallationUpdateComponent,
        resolve: {
            installation: InstallationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Installations'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'installation/:id/edit',
        component: InstallationUpdateComponent,
        resolve: {
            installation: InstallationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Installations'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const installationPopupRoute: Routes = [
    {
        path: 'installation/:id/delete',
        component: InstallationDeletePopupComponent,
        resolve: {
            installation: InstallationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Installations'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
