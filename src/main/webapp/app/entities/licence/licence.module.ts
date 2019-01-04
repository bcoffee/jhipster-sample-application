import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplicationSharedModule } from 'app/shared';
import {
    LicenceComponent,
    LicenceDetailComponent,
    LicenceUpdateComponent,
    LicenceDeletePopupComponent,
    LicenceDeleteDialogComponent,
    licenceRoute,
    licencePopupRoute
} from './';

const ENTITY_STATES = [...licenceRoute, ...licencePopupRoute];

@NgModule({
    imports: [JhipsterSampleApplicationSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        LicenceComponent,
        LicenceDetailComponent,
        LicenceUpdateComponent,
        LicenceDeleteDialogComponent,
        LicenceDeletePopupComponent
    ],
    entryComponents: [LicenceComponent, LicenceUpdateComponent, LicenceDeleteDialogComponent, LicenceDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSampleApplicationLicenceModule {}
