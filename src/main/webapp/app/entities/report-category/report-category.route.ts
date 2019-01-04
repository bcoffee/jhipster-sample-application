import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ReportCategory } from 'app/shared/model/report-category.model';
import { ReportCategoryService } from './report-category.service';
import { ReportCategoryComponent } from './report-category.component';
import { ReportCategoryDetailComponent } from './report-category-detail.component';
import { ReportCategoryUpdateComponent } from './report-category-update.component';
import { ReportCategoryDeletePopupComponent } from './report-category-delete-dialog.component';
import { IReportCategory } from 'app/shared/model/report-category.model';

@Injectable({ providedIn: 'root' })
export class ReportCategoryResolve implements Resolve<IReportCategory> {
    constructor(private service: ReportCategoryService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ReportCategory> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<ReportCategory>) => response.ok),
                map((reportCategory: HttpResponse<ReportCategory>) => reportCategory.body)
            );
        }
        return of(new ReportCategory());
    }
}

export const reportCategoryRoute: Routes = [
    {
        path: 'report-category',
        component: ReportCategoryComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ReportCategories'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'report-category/:id/view',
        component: ReportCategoryDetailComponent,
        resolve: {
            reportCategory: ReportCategoryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ReportCategories'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'report-category/new',
        component: ReportCategoryUpdateComponent,
        resolve: {
            reportCategory: ReportCategoryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ReportCategories'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'report-category/:id/edit',
        component: ReportCategoryUpdateComponent,
        resolve: {
            reportCategory: ReportCategoryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ReportCategories'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const reportCategoryPopupRoute: Routes = [
    {
        path: 'report-category/:id/delete',
        component: ReportCategoryDeletePopupComponent,
        resolve: {
            reportCategory: ReportCategoryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ReportCategories'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
