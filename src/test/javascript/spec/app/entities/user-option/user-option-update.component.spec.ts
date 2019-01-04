/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { UserOptionUpdateComponent } from 'app/entities/user-option/user-option-update.component';
import { UserOptionService } from 'app/entities/user-option/user-option.service';
import { UserOption } from 'app/shared/model/user-option.model';

describe('Component Tests', () => {
    describe('UserOption Management Update Component', () => {
        let comp: UserOptionUpdateComponent;
        let fixture: ComponentFixture<UserOptionUpdateComponent>;
        let service: UserOptionService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [UserOptionUpdateComponent]
            })
                .overrideTemplate(UserOptionUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(UserOptionUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UserOptionService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new UserOption(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.userOption = entity;
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
                    const entity = new UserOption();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.userOption = entity;
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
