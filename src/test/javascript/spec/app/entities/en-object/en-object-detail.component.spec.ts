/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { EnObjectDetailComponent } from 'app/entities/en-object/en-object-detail.component';
import { EnObject } from 'app/shared/model/en-object.model';

describe('Component Tests', () => {
    describe('EnObject Management Detail Component', () => {
        let comp: EnObjectDetailComponent;
        let fixture: ComponentFixture<EnObjectDetailComponent>;
        const route = ({ data: of({ enObject: new EnObject(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [EnObjectDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(EnObjectDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(EnObjectDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.enObject).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
