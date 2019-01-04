/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { DistributionListDetailComponent } from 'app/entities/distribution-list/distribution-list-detail.component';
import { DistributionList } from 'app/shared/model/distribution-list.model';

describe('Component Tests', () => {
    describe('DistributionList Management Detail Component', () => {
        let comp: DistributionListDetailComponent;
        let fixture: ComponentFixture<DistributionListDetailComponent>;
        const route = ({ data: of({ distributionList: new DistributionList(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [DistributionListDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(DistributionListDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(DistributionListDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.distributionList).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
