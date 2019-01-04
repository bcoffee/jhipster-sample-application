/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { EnObjectTypeDetailComponent } from 'app/entities/en-object-type/en-object-type-detail.component';
import { EnObjectType } from 'app/shared/model/en-object-type.model';

describe('Component Tests', () => {
    describe('EnObjectType Management Detail Component', () => {
        let comp: EnObjectTypeDetailComponent;
        let fixture: ComponentFixture<EnObjectTypeDetailComponent>;
        const route = ({ data: of({ enObjectType: new EnObjectType(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [EnObjectTypeDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(EnObjectTypeDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(EnObjectTypeDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.enObjectType).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
