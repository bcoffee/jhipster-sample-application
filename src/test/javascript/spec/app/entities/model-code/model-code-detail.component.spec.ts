/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { ModelCodeDetailComponent } from 'app/entities/model-code/model-code-detail.component';
import { ModelCode } from 'app/shared/model/model-code.model';

describe('Component Tests', () => {
    describe('ModelCode Management Detail Component', () => {
        let comp: ModelCodeDetailComponent;
        let fixture: ComponentFixture<ModelCodeDetailComponent>;
        const route = ({ data: of({ modelCode: new ModelCode(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [ModelCodeDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ModelCodeDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ModelCodeDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.modelCode).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
