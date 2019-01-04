/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { AttributeOptionDetailComponent } from 'app/entities/attribute-option/attribute-option-detail.component';
import { AttributeOption } from 'app/shared/model/attribute-option.model';

describe('Component Tests', () => {
    describe('AttributeOption Management Detail Component', () => {
        let comp: AttributeOptionDetailComponent;
        let fixture: ComponentFixture<AttributeOptionDetailComponent>;
        const route = ({ data: of({ attributeOption: new AttributeOption(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [AttributeOptionDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(AttributeOptionDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(AttributeOptionDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.attributeOption).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
