/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { NotificationParameterUpdateComponent } from 'app/entities/notification-parameter/notification-parameter-update.component';
import { NotificationParameterService } from 'app/entities/notification-parameter/notification-parameter.service';
import { NotificationParameter } from 'app/shared/model/notification-parameter.model';

describe('Component Tests', () => {
    describe('NotificationParameter Management Update Component', () => {
        let comp: NotificationParameterUpdateComponent;
        let fixture: ComponentFixture<NotificationParameterUpdateComponent>;
        let service: NotificationParameterService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [NotificationParameterUpdateComponent]
            })
                .overrideTemplate(NotificationParameterUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(NotificationParameterUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(NotificationParameterService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new NotificationParameter(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.notificationParameter = entity;
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
                    const entity = new NotificationParameter();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.notificationParameter = entity;
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
