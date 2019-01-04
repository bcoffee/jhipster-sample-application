/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { EnObjectUpdateComponent } from 'app/entities/en-object/en-object-update.component';
import { EnObjectService } from 'app/entities/en-object/en-object.service';
import { EnObject } from 'app/shared/model/en-object.model';

describe('Component Tests', () => {
    describe('EnObject Management Update Component', () => {
        let comp: EnObjectUpdateComponent;
        let fixture: ComponentFixture<EnObjectUpdateComponent>;
        let service: EnObjectService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [EnObjectUpdateComponent]
            })
                .overrideTemplate(EnObjectUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(EnObjectUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EnObjectService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new EnObject(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.enObject = entity;
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
                    const entity = new EnObject();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.enObject = entity;
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
