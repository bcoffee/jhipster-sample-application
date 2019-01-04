/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { NotificationParameterComponent } from 'app/entities/notification-parameter/notification-parameter.component';
import { NotificationParameterService } from 'app/entities/notification-parameter/notification-parameter.service';
import { NotificationParameter } from 'app/shared/model/notification-parameter.model';

describe('Component Tests', () => {
    describe('NotificationParameter Management Component', () => {
        let comp: NotificationParameterComponent;
        let fixture: ComponentFixture<NotificationParameterComponent>;
        let service: NotificationParameterService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [NotificationParameterComponent],
                providers: []
            })
                .overrideTemplate(NotificationParameterComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(NotificationParameterComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(NotificationParameterService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new NotificationParameter(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.notificationParameters[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
