import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplicationSharedModule } from 'app/shared';
import {
    ModelCodeComponent,
    ModelCodeDetailComponent,
    ModelCodeUpdateComponent,
    ModelCodeDeletePopupComponent,
    ModelCodeDeleteDialogComponent,
    modelCodeRoute,
    modelCodePopupRoute
} from './';

const ENTITY_STATES = [...modelCodeRoute, ...modelCodePopupRoute];

@NgModule({
    imports: [JhipsterSampleApplicationSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ModelCodeComponent,
        ModelCodeDetailComponent,
        ModelCodeUpdateComponent,
        ModelCodeDeleteDialogComponent,
        ModelCodeDeletePopupComponent
    ],
    entryComponents: [ModelCodeComponent, ModelCodeUpdateComponent, ModelCodeDeleteDialogComponent, ModelCodeDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSampleApplicationModelCodeModule {}
