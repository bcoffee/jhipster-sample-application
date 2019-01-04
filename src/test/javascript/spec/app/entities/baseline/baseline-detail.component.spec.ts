/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { BaselineDetailComponent } from 'app/entities/baseline/baseline-detail.component';
import { Baseline } from 'app/shared/model/baseline.model';

describe('Component Tests', () => {
    describe('Baseline Management Detail Component', () => {
        let comp: BaselineDetailComponent;
        let fixture: ComponentFixture<BaselineDetailComponent>;
        const route = ({ data: of({ baseline: new Baseline(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [BaselineDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(BaselineDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(BaselineDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.baseline).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
