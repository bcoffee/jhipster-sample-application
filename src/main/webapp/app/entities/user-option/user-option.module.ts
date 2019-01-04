import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplicationSharedModule } from 'app/shared';
import {
    UserOptionComponent,
    UserOptionDetailComponent,
    UserOptionUpdateComponent,
    UserOptionDeletePopupComponent,
    UserOptionDeleteDialogComponent,
    userOptionRoute,
    userOptionPopupRoute
} from './';

const ENTITY_STATES = [...userOptionRoute, ...userOptionPopupRoute];

@NgModule({
    imports: [JhipsterSampleApplicationSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        UserOptionComponent,
        UserOptionDetailComponent,
        UserOptionUpdateComponent,
        UserOptionDeleteDialogComponent,
        UserOptionDeletePopupComponent
    ],
    entryComponents: [UserOptionComponent, UserOptionUpdateComponent, UserOptionDeleteDialogComponent, UserOptionDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSampleApplicationUserOptionModule {}
