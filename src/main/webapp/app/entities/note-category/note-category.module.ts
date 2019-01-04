import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplicationSharedModule } from 'app/shared';
import {
    NoteCategoryComponent,
    NoteCategoryDetailComponent,
    NoteCategoryUpdateComponent,
    NoteCategoryDeletePopupComponent,
    NoteCategoryDeleteDialogComponent,
    noteCategoryRoute,
    noteCategoryPopupRoute
} from './';

const ENTITY_STATES = [...noteCategoryRoute, ...noteCategoryPopupRoute];

@NgModule({
    imports: [JhipsterSampleApplicationSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        NoteCategoryComponent,
        NoteCategoryDetailComponent,
        NoteCategoryUpdateComponent,
        NoteCategoryDeleteDialogComponent,
        NoteCategoryDeletePopupComponent
    ],
    entryComponents: [
        NoteCategoryComponent,
        NoteCategoryUpdateComponent,
        NoteCategoryDeleteDialogComponent,
        NoteCategoryDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSampleApplicationNoteCategoryModule {}
