/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { MessageMapComponent } from 'app/entities/message-map/message-map.component';
import { MessageMapService } from 'app/entities/message-map/message-map.service';
import { MessageMap } from 'app/shared/model/message-map.model';

describe('Component Tests', () => {
    describe('MessageMap Management Component', () => {
        let comp: MessageMapComponent;
        let fixture: ComponentFixture<MessageMapComponent>;
        let service: MessageMapService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [MessageMapComponent],
                providers: []
            })
                .overrideTemplate(MessageMapComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(MessageMapComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MessageMapService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new MessageMap(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.messageMaps[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
