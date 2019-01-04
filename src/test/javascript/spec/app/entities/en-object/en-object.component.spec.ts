/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { EnObjectComponent } from 'app/entities/en-object/en-object.component';
import { EnObjectService } from 'app/entities/en-object/en-object.service';
import { EnObject } from 'app/shared/model/en-object.model';

describe('Component Tests', () => {
    describe('EnObject Management Component', () => {
        let comp: EnObjectComponent;
        let fixture: ComponentFixture<EnObjectComponent>;
        let service: EnObjectService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [EnObjectComponent],
                providers: []
            })
                .overrideTemplate(EnObjectComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(EnObjectComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EnObjectService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new EnObject(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.enObjects[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
