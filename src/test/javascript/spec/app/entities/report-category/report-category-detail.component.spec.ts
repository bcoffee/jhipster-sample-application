/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { ReportCategoryDetailComponent } from 'app/entities/report-category/report-category-detail.component';
import { ReportCategory } from 'app/shared/model/report-category.model';

describe('Component Tests', () => {
    describe('ReportCategory Management Detail Component', () => {
        let comp: ReportCategoryDetailComponent;
        let fixture: ComponentFixture<ReportCategoryDetailComponent>;
        const route = ({ data: of({ reportCategory: new ReportCategory(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [ReportCategoryDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ReportCategoryDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ReportCategoryDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.reportCategory).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
