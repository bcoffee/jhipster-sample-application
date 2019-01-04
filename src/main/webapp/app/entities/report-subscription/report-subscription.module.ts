import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplicationSharedModule } from 'app/shared';
import { JhipsterSampleApplicationAdminModule } from 'app/admin/admin.module';
import {
    ReportSubscriptionComponent,
    ReportSubscriptionDetailComponent,
    ReportSubscriptionUpdateComponent,
    ReportSubscriptionDeletePopupComponent,
    ReportSubscriptionDeleteDialogComponent,
    reportSubscriptionRoute,
    reportSubscriptionPopupRoute
} from './';

const ENTITY_STATES = [...reportSubscriptionRoute, ...reportSubscriptionPopupRoute];

@NgModule({
    imports: [JhipsterSampleApplicationSharedModule, JhipsterSampleApplicationAdminModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ReportSubscriptionComponent,
        ReportSubscriptionDetailComponent,
        ReportSubscriptionUpdateComponent,
        ReportSubscriptionDeleteDialogComponent,
        ReportSubscriptionDeletePopupComponent
    ],
    entryComponents: [
        ReportSubscriptionComponent,
        ReportSubscriptionUpdateComponent,
        ReportSubscriptionDeleteDialogComponent,
        ReportSubscriptionDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSampleApplicationReportSubscriptionModule {}
