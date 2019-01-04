import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplicationSharedModule } from 'app/shared';
import {
    EnObjectComponent,
    EnObjectDetailComponent,
    EnObjectUpdateComponent,
    EnObjectDeletePopupComponent,
    EnObjectDeleteDialogComponent,
    enObjectRoute,
    enObjectPopupRoute
} from './';

const ENTITY_STATES = [...enObjectRoute, ...enObjectPopupRoute];

@NgModule({
    imports: [JhipsterSampleApplicationSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        EnObjectComponent,
        EnObjectDetailComponent,
        EnObjectUpdateComponent,
        EnObjectDeleteDialogComponent,
        EnObjectDeletePopupComponent
    ],
    entryComponents: [EnObjectComponent, EnObjectUpdateComponent, EnObjectDeleteDialogComponent, EnObjectDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSampleApplicationEnObjectModule {}
