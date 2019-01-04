/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { MessageTypeComponent } from 'app/entities/message-type/message-type.component';
import { MessageTypeService } from 'app/entities/message-type/message-type.service';
import { MessageType } from 'app/shared/model/message-type.model';

describe('Component Tests', () => {
    describe('MessageType Management Component', () => {
        let comp: MessageTypeComponent;
        let fixture: ComponentFixture<MessageTypeComponent>;
        let service: MessageTypeService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [MessageTypeComponent],
                providers: []
            })
                .overrideTemplate(MessageTypeComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(MessageTypeComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MessageTypeService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new MessageType(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.messageTypes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
