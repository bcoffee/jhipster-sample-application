import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Licence } from 'app/shared/model/licence.model';
import { LicenceService } from './licence.service';
import { LicenceComponent } from './licence.component';
import { LicenceDetailComponent } from './licence-detail.component';
import { LicenceUpdateComponent } from './licence-update.component';
import { LicenceDeletePopupComponent } from './licence-delete-dialog.component';
import { ILicence } from 'app/shared/model/licence.model';

@Injectable({ providedIn: 'root' })
export class LicenceResolve implements Resolve<ILicence> {
    constructor(private service: LicenceService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Licence> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Licence>) => response.ok),
                map((licence: HttpResponse<Licence>) => licence.body)
            );
        }
        return of(new Licence());
    }
}

export const licenceRoute: Routes = [
    {
        path: 'licence',
        component: LicenceComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Licences'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'licence/:id/view',
        component: LicenceDetailComponent,
        resolve: {
            licence: LicenceResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Licences'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'licence/new',
        component: LicenceUpdateComponent,
        resolve: {
            licence: LicenceResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Licences'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'licence/:id/edit',
        component: LicenceUpdateComponent,
        resolve: {
            licence: LicenceResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Licences'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const licencePopupRoute: Routes = [
    {
        path: 'licence/:id/delete',
        component: LicenceDeletePopupComponent,
        resolve: {
            licence: LicenceResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Licences'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
