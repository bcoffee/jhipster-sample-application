import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { AttributeOption } from 'app/shared/model/attribute-option.model';
import { AttributeOptionService } from './attribute-option.service';
import { AttributeOptionComponent } from './attribute-option.component';
import { AttributeOptionDetailComponent } from './attribute-option-detail.component';
import { AttributeOptionUpdateComponent } from './attribute-option-update.component';
import { AttributeOptionDeletePopupComponent } from './attribute-option-delete-dialog.component';
import { IAttributeOption } from 'app/shared/model/attribute-option.model';

@Injectable({ providedIn: 'root' })
export class AttributeOptionResolve implements Resolve<IAttributeOption> {
    constructor(private service: AttributeOptionService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<AttributeOption> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<AttributeOption>) => response.ok),
                map((attributeOption: HttpResponse<AttributeOption>) => attributeOption.body)
            );
        }
        return of(new AttributeOption());
    }
}

export const attributeOptionRoute: Routes = [
    {
        path: 'attribute-option',
        component: AttributeOptionComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'AttributeOptions'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'attribute-option/:id/view',
        component: AttributeOptionDetailComponent,
        resolve: {
            attributeOption: AttributeOptionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'AttributeOptions'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'attribute-option/new',
        component: AttributeOptionUpdateComponent,
        resolve: {
            attributeOption: AttributeOptionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'AttributeOptions'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'attribute-option/:id/edit',
        component: AttributeOptionUpdateComponent,
        resolve: {
            attributeOption: AttributeOptionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'AttributeOptions'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const attributeOptionPopupRoute: Routes = [
    {
        path: 'attribute-option/:id/delete',
        component: AttributeOptionDeletePopupComponent,
        resolve: {
            attributeOption: AttributeOptionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'AttributeOptions'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
