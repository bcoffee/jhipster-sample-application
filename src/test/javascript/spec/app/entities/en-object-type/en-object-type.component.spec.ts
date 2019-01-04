/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { EnObjectTypeComponent } from 'app/entities/en-object-type/en-object-type.component';
import { EnObjectTypeService } from 'app/entities/en-object-type/en-object-type.service';
import { EnObjectType } from 'app/shared/model/en-object-type.model';

describe('Component Tests', () => {
    describe('EnObjectType Management Component', () => {
        let comp: EnObjectTypeComponent;
        let fixture: ComponentFixture<EnObjectTypeComponent>;
        let service: EnObjectTypeService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [EnObjectTypeComponent],
                providers: []
            })
                .overrideTemplate(EnObjectTypeComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(EnObjectTypeComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EnObjectTypeService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new EnObjectType(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.enObjectTypes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
