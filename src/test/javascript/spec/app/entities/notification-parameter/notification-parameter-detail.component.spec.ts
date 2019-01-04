/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { NotificationParameterDetailComponent } from 'app/entities/notification-parameter/notification-parameter-detail.component';
import { NotificationParameter } from 'app/shared/model/notification-parameter.model';

describe('Component Tests', () => {
    describe('NotificationParameter Management Detail Component', () => {
        let comp: NotificationParameterDetailComponent;
        let fixture: ComponentFixture<NotificationParameterDetailComponent>;
        const route = ({ data: of({ notificationParameter: new NotificationParameter(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [NotificationParameterDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(NotificationParameterDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(NotificationParameterDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.notificationParameter).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
