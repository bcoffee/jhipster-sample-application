import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplicationSharedModule } from 'app/shared';
import {
    ReportCategoryComponent,
    ReportCategoryDetailComponent,
    ReportCategoryUpdateComponent,
    ReportCategoryDeletePopupComponent,
    ReportCategoryDeleteDialogComponent,
    reportCategoryRoute,
    reportCategoryPopupRoute
} from './';

const ENTITY_STATES = [...reportCategoryRoute, ...reportCategoryPopupRoute];

@NgModule({
    imports: [JhipsterSampleApplicationSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ReportCategoryComponent,
        ReportCategoryDetailComponent,
        ReportCategoryUpdateComponent,
        ReportCategoryDeleteDialogComponent,
        ReportCategoryDeletePopupComponent
    ],
    entryComponents: [
        ReportCategoryComponent,
        ReportCategoryUpdateComponent,
        ReportCategoryDeleteDialogComponent,
        ReportCategoryDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSampleApplicationReportCategoryModule {}
