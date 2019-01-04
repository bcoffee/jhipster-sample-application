/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { ModelCodeUpdateComponent } from 'app/entities/model-code/model-code-update.component';
import { ModelCodeService } from 'app/entities/model-code/model-code.service';
import { ModelCode } from 'app/shared/model/model-code.model';

describe('Component Tests', () => {
    describe('ModelCode Management Update Component', () => {
        let comp: ModelCodeUpdateComponent;
        let fixture: ComponentFixture<ModelCodeUpdateComponent>;
        let service: ModelCodeService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [ModelCodeUpdateComponent]
            })
                .overrideTemplate(ModelCodeUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ModelCodeUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ModelCodeService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new ModelCode(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.modelCode = entity;
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
                    const entity = new ModelCode();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.modelCode = entity;
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
