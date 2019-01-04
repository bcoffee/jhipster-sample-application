/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { ReportCategoryUpdateComponent } from 'app/entities/report-category/report-category-update.component';
import { ReportCategoryService } from 'app/entities/report-category/report-category.service';
import { ReportCategory } from 'app/shared/model/report-category.model';

describe('Component Tests', () => {
    describe('ReportCategory Management Update Component', () => {
        let comp: ReportCategoryUpdateComponent;
        let fixture: ComponentFixture<ReportCategoryUpdateComponent>;
        let service: ReportCategoryService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [ReportCategoryUpdateComponent]
            })
                .overrideTemplate(ReportCategoryUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ReportCategoryUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ReportCategoryService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new ReportCategory(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.reportCategory = entity;
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
                    const entity = new ReportCategory();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.reportCategory = entity;
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
