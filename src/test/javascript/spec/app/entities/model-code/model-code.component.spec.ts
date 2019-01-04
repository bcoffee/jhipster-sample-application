/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { ModelCodeComponent } from 'app/entities/model-code/model-code.component';
import { ModelCodeService } from 'app/entities/model-code/model-code.service';
import { ModelCode } from 'app/shared/model/model-code.model';

describe('Component Tests', () => {
    describe('ModelCode Management Component', () => {
        let comp: ModelCodeComponent;
        let fixture: ComponentFixture<ModelCodeComponent>;
        let service: ModelCodeService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [ModelCodeComponent],
                providers: []
            })
                .overrideTemplate(ModelCodeComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ModelCodeComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ModelCodeService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new ModelCode(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.modelCodes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
