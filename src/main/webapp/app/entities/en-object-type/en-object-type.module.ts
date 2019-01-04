import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplicationSharedModule } from 'app/shared';
import {
    EnObjectTypeComponent,
    EnObjectTypeDetailComponent,
    EnObjectTypeUpdateComponent,
    EnObjectTypeDeletePopupComponent,
    EnObjectTypeDeleteDialogComponent,
    enObjectTypeRoute,
    enObjectTypePopupRoute
} from './';

const ENTITY_STATES = [...enObjectTypeRoute, ...enObjectTypePopupRoute];

@NgModule({
    imports: [JhipsterSampleApplicationSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        EnObjectTypeComponent,
        EnObjectTypeDetailComponent,
        EnObjectTypeUpdateComponent,
        EnObjectTypeDeleteDialogComponent,
        EnObjectTypeDeletePopupComponent
    ],
    entryComponents: [
        EnObjectTypeComponent,
        EnObjectTypeUpdateComponent,
        EnObjectTypeDeleteDialogComponent,
        EnObjectTypeDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSampleApplicationEnObjectTypeModule {}
