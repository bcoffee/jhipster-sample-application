/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { MessageMapDetailComponent } from 'app/entities/message-map/message-map-detail.component';
import { MessageMap } from 'app/shared/model/message-map.model';

describe('Component Tests', () => {
    describe('MessageMap Management Detail Component', () => {
        let comp: MessageMapDetailComponent;
        let fixture: ComponentFixture<MessageMapDetailComponent>;
        const route = ({ data: of({ messageMap: new MessageMap(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [MessageMapDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(MessageMapDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(MessageMapDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.messageMap).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
