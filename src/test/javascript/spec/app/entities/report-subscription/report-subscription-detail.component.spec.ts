/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { ReportSubscriptionDetailComponent } from 'app/entities/report-subscription/report-subscription-detail.component';
import { ReportSubscription } from 'app/shared/model/report-subscription.model';

describe('Component Tests', () => {
    describe('ReportSubscription Management Detail Component', () => {
        let comp: ReportSubscriptionDetailComponent;
        let fixture: ComponentFixture<ReportSubscriptionDetailComponent>;
        const route = ({ data: of({ reportSubscription: new ReportSubscription(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [ReportSubscriptionDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ReportSubscriptionDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ReportSubscriptionDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.reportSubscription).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
