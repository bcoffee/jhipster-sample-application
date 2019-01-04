/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { UserOptionComponent } from 'app/entities/user-option/user-option.component';
import { UserOptionService } from 'app/entities/user-option/user-option.service';
import { UserOption } from 'app/shared/model/user-option.model';

describe('Component Tests', () => {
    describe('UserOption Management Component', () => {
        let comp: UserOptionComponent;
        let fixture: ComponentFixture<UserOptionComponent>;
        let service: UserOptionService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [UserOptionComponent],
                providers: []
            })
                .overrideTemplate(UserOptionComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(UserOptionComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UserOptionService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new UserOption(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.userOptions[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
