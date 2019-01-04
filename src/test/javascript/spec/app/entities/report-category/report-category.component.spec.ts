/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { ReportCategoryComponent } from 'app/entities/report-category/report-category.component';
import { ReportCategoryService } from 'app/entities/report-category/report-category.service';
import { ReportCategory } from 'app/shared/model/report-category.model';

describe('Component Tests', () => {
    describe('ReportCategory Management Component', () => {
        let comp: ReportCategoryComponent;
        let fixture: ComponentFixture<ReportCategoryComponent>;
        let service: ReportCategoryService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [ReportCategoryComponent],
                providers: []
            })
                .overrideTemplate(ReportCategoryComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ReportCategoryComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ReportCategoryService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new ReportCategory(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.reportCategories[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
