/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { AttributeOptionComponent } from 'app/entities/attribute-option/attribute-option.component';
import { AttributeOptionService } from 'app/entities/attribute-option/attribute-option.service';
import { AttributeOption } from 'app/shared/model/attribute-option.model';

describe('Component Tests', () => {
    describe('AttributeOption Management Component', () => {
        let comp: AttributeOptionComponent;
        let fixture: ComponentFixture<AttributeOptionComponent>;
        let service: AttributeOptionService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [AttributeOptionComponent],
                providers: []
            })
                .overrideTemplate(AttributeOptionComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(AttributeOptionComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AttributeOptionService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new AttributeOption(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.attributeOptions[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
