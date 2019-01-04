/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { BaselineUpdateComponent } from 'app/entities/baseline/baseline-update.component';
import { BaselineService } from 'app/entities/baseline/baseline.service';
import { Baseline } from 'app/shared/model/baseline.model';

describe('Component Tests', () => {
    describe('Baseline Management Update Component', () => {
        let comp: BaselineUpdateComponent;
        let fixture: ComponentFixture<BaselineUpdateComponent>;
        let service: BaselineService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [BaselineUpdateComponent]
            })
                .overrideTemplate(BaselineUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(BaselineUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BaselineService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Baseline(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.baseline = entity;
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
                    const entity = new Baseline();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.baseline = entity;
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
