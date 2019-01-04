/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { ReportSubscriptionUpdateComponent } from 'app/entities/report-subscription/report-subscription-update.component';
import { ReportSubscriptionService } from 'app/entities/report-subscription/report-subscription.service';
import { ReportSubscription } from 'app/shared/model/report-subscription.model';

describe('Component Tests', () => {
    describe('ReportSubscription Management Update Component', () => {
        let comp: ReportSubscriptionUpdateComponent;
        let fixture: ComponentFixture<ReportSubscriptionUpdateComponent>;
        let service: ReportSubscriptionService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [ReportSubscriptionUpdateComponent]
            })
                .overrideTemplate(ReportSubscriptionUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ReportSubscriptionUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ReportSubscriptionService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new ReportSubscription(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.reportSubscription = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new ReportSubscription();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.reportSubscription = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
