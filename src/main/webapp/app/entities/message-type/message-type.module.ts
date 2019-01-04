import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplicationSharedModule } from 'app/shared';
import {
    MessageTypeComponent,
    MessageTypeDetailComponent,
    MessageTypeUpdateComponent,
    MessageTypeDeletePopupComponent,
    MessageTypeDeleteDialogComponent,
    messageTypeRoute,
    messageTypePopupRoute
} from './';

const ENTITY_STATES = [...messageTypeRoute, ...messageTypePopupRoute];

@NgModule({
    imports: [JhipsterSampleApplicationSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        MessageTypeComponent,
        MessageTypeDetailComponent,
        MessageTypeUpdateComponent,
        MessageTypeDeleteDialogComponent,
        MessageTypeDeletePopupComponent
    ],
    entryComponents: [MessageTypeComponent, MessageTypeUpdateComponent, MessageTypeDeleteDialogComponent, MessageTypeDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSampleApplicationMessageTypeModule {}
