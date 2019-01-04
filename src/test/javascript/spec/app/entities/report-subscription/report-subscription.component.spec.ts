/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { ReportSubscriptionComponent } from 'app/entities/report-subscription/report-subscription.component';
import { ReportSubscriptionService } from 'app/entities/report-subscription/report-subscription.service';
import { ReportSubscription } from 'app/shared/model/report-subscription.model';

describe('Component Tests', () => {
    describe('ReportSubscription Management Component', () => {
        let comp: ReportSubscriptionComponent;
        let fixture: ComponentFixture<ReportSubscriptionComponent>;
        let service: ReportSubscriptionService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [ReportSubscriptionComponent],
                providers: []
            })
                .overrideTemplate(ReportSubscriptionComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ReportSubscriptionComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ReportSubscriptionService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new ReportSubscription(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.reportSubscriptions[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
