/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { EnObjectTypeUpdateComponent } from 'app/entities/en-object-type/en-object-type-update.component';
import { EnObjectTypeService } from 'app/entities/en-object-type/en-object-type.service';
import { EnObjectType } from 'app/shared/model/en-object-type.model';

describe('Component Tests', () => {
    describe('EnObjectType Management Update Component', () => {
        let comp: EnObjectTypeUpdateComponent;
        let fixture: ComponentFixture<EnObjectTypeUpdateComponent>;
        let service: EnObjectTypeService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [EnObjectTypeUpdateComponent]
            })
                .overrideTemplate(EnObjectTypeUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(EnObjectTypeUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EnObjectTypeService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new EnObjectType(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.enObjectType = entity;
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
                    const entity = new EnObjectType();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.enObjectType = entity;
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
