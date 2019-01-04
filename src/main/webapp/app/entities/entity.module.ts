import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { JhipsterSampleApplicationCustomerModule } from './customer/customer.module';
import { JhipsterSampleApplicationInstallationModule } from './installation/installation.module';
import { JhipsterSampleApplicationEnObjectModule } from './en-object/en-object.module';
import { JhipsterSampleApplicationEnObjectTypeModule } from './en-object-type/en-object-type.module';
import { JhipsterSampleApplicationMessageTypeModule } from './message-type/message-type.module';
import { JhipsterSampleApplicationMessageMapModule } from './message-map/message-map.module';
import { JhipsterSampleApplicationBaselineModule } from './baseline/baseline.module';
import { JhipsterSampleApplicationModelModule } from './model/model.module';
import { JhipsterSampleApplicationModelCodeModule } from './model-code/model-code.module';
import { JhipsterSampleApplicationAttributeModule } from './attribute/attribute.module';
import { JhipsterSampleApplicationAttributeOptionModule } from './attribute-option/attribute-option.module';
import { JhipsterSampleApplicationReportModule } from './report/report.module';
import { JhipsterSampleApplicationReportTypeModule } from './report-type/report-type.module';
import { JhipsterSampleApplicationReportCategoryModule } from './report-category/report-category.module';
import { JhipsterSampleApplicationNotificationModule } from './notification/notification.module';
import { JhipsterSampleApplicationDistributionListModule } from './distribution-list/distribution-list.module';
import { JhipsterSampleApplicationNotificationParameterModule } from './notification-parameter/notification-parameter.module';
import { JhipsterSampleApplicationReportSubscriptionModule } from './report-subscription/report-subscription.module';
import { JhipsterSampleApplicationNoteModule } from './note/note.module';
import { JhipsterSampleApplicationNoteCategoryModule } from './note-category/note-category.module';
import { JhipsterSampleApplicationLicenceModule } from './licence/licence.module';
import { JhipsterSampleApplicationUserOptionModule } from './user-option/user-option.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        JhipsterSampleApplicationCustomerModule,
        JhipsterSampleApplicationInstallationModule,
        JhipsterSampleApplicationEnObjectModule,
        JhipsterSampleApplicationEnObjectTypeModule,
        JhipsterSampleApplicationMessageTypeModule,
        JhipsterSampleApplicationMessageMapModule,
        JhipsterSampleApplicationBaselineModule,
        JhipsterSampleApplicationModelModule,
        JhipsterSampleApplicationModelCodeModule,
        JhipsterSampleApplicationAttributeModule,
        JhipsterSampleApplicationAttributeOptionModule,
        JhipsterSampleApplicationReportModule,
        JhipsterSampleApplicationReportTypeModule,
        JhipsterSampleApplicationReportCategoryModule,
        JhipsterSampleApplicationNotificationModule,
        JhipsterSampleApplicationDistributionListModule,
        JhipsterSampleApplicationNotificationParameterModule,
        JhipsterSampleApplicationReportSubscriptionModule,
        JhipsterSampleApplicationNoteModule,
        JhipsterSampleApplicationNoteCategoryModule,
        JhipsterSampleApplicationLicenceModule,
        JhipsterSampleApplicationUserOptionModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSampleApplicationEntityModule {}
