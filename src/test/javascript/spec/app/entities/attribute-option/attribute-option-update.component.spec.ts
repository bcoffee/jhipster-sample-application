/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { AttributeOptionUpdateComponent } from 'app/entities/attribute-option/attribute-option-update.component';
import { AttributeOptionService } from 'app/entities/attribute-option/attribute-option.service';
import { AttributeOption } from 'app/shared/model/attribute-option.model';

describe('Component Tests', () => {
    describe('AttributeOption Management Update Component', () => {
        let comp: AttributeOptionUpdateComponent;
        let fixture: ComponentFixture<AttributeOptionUpdateComponent>;
        let service: AttributeOptionService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [AttributeOptionUpdateComponent]
            })
                .overrideTemplate(AttributeOptionUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(AttributeOptionUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AttributeOptionService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new AttributeOption(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.attributeOption = entity;
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
                    const entity = new AttributeOption();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.attributeOption = entity;
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
