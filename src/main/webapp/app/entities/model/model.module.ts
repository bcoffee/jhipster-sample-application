import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplicationSharedModule } from 'app/shared';
import {
    ModelComponent,
    ModelDetailComponent,
    ModelUpdateComponent,
    ModelDeletePopupComponent,
    ModelDeleteDialogComponent,
    modelRoute,
    modelPopupRoute
} from './';

const ENTITY_STATES = [...modelRoute, ...modelPopupRoute];

@NgModule({
    imports: [JhipsterSampleApplicationSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [ModelComponent, ModelDetailComponent, ModelUpdateComponent, ModelDeleteDialogComponent, ModelDeletePopupComponent],
    entryComponents: [ModelComponent, ModelUpdateComponent, ModelDeleteDialogComponent, ModelDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSampleApplicationModelModule {}
