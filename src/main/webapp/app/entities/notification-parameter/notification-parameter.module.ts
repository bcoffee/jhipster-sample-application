import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplicationSharedModule } from 'app/shared';
import {
    NotificationParameterComponent,
    NotificationParameterDetailComponent,
    NotificationParameterUpdateComponent,
    NotificationParameterDeletePopupComponent,
    NotificationParameterDeleteDialogComponent,
    notificationParameterRoute,
    notificationParameterPopupRoute
} from './';

const ENTITY_STATES = [...notificationParameterRoute, ...notificationParameterPopupRoute];

@NgModule({
    imports: [JhipsterSampleApplicationSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        NotificationParameterComponent,
        NotificationParameterDetailComponent,
        NotificationParameterUpdateComponent,
        NotificationParameterDeleteDialogComponent,
        NotificationParameterDeletePopupComponent
    ],
    entryComponents: [
        NotificationParameterComponent,
        NotificationParameterUpdateComponent,
        NotificationParameterDeleteDialogComponent,
        NotificationParameterDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSampleApplicationNotificationParameterModule {}
