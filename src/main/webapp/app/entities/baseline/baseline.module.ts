import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplicationSharedModule } from 'app/shared';
import {
    BaselineComponent,
    BaselineDetailComponent,
    BaselineUpdateComponent,
    BaselineDeletePopupComponent,
    BaselineDeleteDialogComponent,
    baselineRoute,
    baselinePopupRoute
} from './';

const ENTITY_STATES = [...baselineRoute, ...baselinePopupRoute];

@NgModule({
    imports: [JhipsterSampleApplicationSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        BaselineComponent,
        BaselineDetailComponent,
        BaselineUpdateComponent,
        BaselineDeleteDialogComponent,
        BaselineDeletePopupComponent
    ],
    entryComponents: [BaselineComponent, BaselineUpdateComponent, BaselineDeleteDialogComponent, BaselineDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSampleApplicationBaselineModule {}
