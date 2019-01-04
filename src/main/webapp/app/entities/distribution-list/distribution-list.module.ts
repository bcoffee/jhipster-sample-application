import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplicationSharedModule } from 'app/shared';
import {
    DistributionListComponent,
    DistributionListDetailComponent,
    DistributionListUpdateComponent,
    DistributionListDeletePopupComponent,
    DistributionListDeleteDialogComponent,
    distributionListRoute,
    distributionListPopupRoute
} from './';

const ENTITY_STATES = [...distributionListRoute, ...distributionListPopupRoute];

@NgModule({
    imports: [JhipsterSampleApplicationSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        DistributionListComponent,
        DistributionListDetailComponent,
        DistributionListUpdateComponent,
        DistributionListDeleteDialogComponent,
        DistributionListDeletePopupComponent
    ],
    entryComponents: [
        DistributionListComponent,
        DistributionListUpdateComponent,
        DistributionListDeleteDialogComponent,
        DistributionListDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSampleApplicationDistributionListModule {}
