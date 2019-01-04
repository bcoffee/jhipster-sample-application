/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { UserOptionDetailComponent } from 'app/entities/user-option/user-option-detail.component';
import { UserOption } from 'app/shared/model/user-option.model';

describe('Component Tests', () => {
    describe('UserOption Management Detail Component', () => {
        let comp: UserOptionDetailComponent;
        let fixture: ComponentFixture<UserOptionDetailComponent>;
        const route = ({ data: of({ userOption: new UserOption(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [UserOptionDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(UserOptionDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(UserOptionDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.userOption).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
