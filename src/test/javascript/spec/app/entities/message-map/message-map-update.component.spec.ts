/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { MessageMapUpdateComponent } from 'app/entities/message-map/message-map-update.component';
import { MessageMapService } from 'app/entities/message-map/message-map.service';
import { MessageMap } from 'app/shared/model/message-map.model';

describe('Component Tests', () => {
    describe('MessageMap Management Update Component', () => {
        let comp: MessageMapUpdateComponent;
        let fixture: ComponentFixture<MessageMapUpdateComponent>;
        let service: MessageMapService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [MessageMapUpdateComponent]
            })
                .overrideTemplate(MessageMapUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(MessageMapUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MessageMapService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new MessageMap(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.messageMap = entity;
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
                    const entity = new MessageMap();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.messageMap = entity;
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
