/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { InstallationDetailComponent } from 'app/entities/installation/installation-detail.component';
import { Installation } from 'app/shared/model/installation.model';

describe('Component Tests', () => {
    describe('Installation Management Detail Component', () => {
        let comp: InstallationDetailComponent;
        let fixture: ComponentFixture<InstallationDetailComponent>;
        const route = ({ data: of({ installation: new Installation(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [InstallationDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(InstallationDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(InstallationDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.installation).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
