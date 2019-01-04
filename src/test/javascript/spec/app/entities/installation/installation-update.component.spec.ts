/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { InstallationUpdateComponent } from 'app/entities/installation/installation-update.component';
import { InstallationService } from 'app/entities/installation/installation.service';
import { Installation } from 'app/shared/model/installation.model';

describe('Component Tests', () => {
    describe('Installation Management Update Component', () => {
        let comp: InstallationUpdateComponent;
        let fixture: ComponentFixture<InstallationUpdateComponent>;
        let service: InstallationService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [InstallationUpdateComponent]
            })
                .overrideTemplate(InstallationUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(InstallationUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(InstallationService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Installation(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.installation = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Installation();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.installation = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
