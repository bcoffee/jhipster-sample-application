/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { DistributionListUpdateComponent } from 'app/entities/distribution-list/distribution-list-update.component';
import { DistributionListService } from 'app/entities/distribution-list/distribution-list.service';
import { DistributionList } from 'app/shared/model/distribution-list.model';

describe('Component Tests', () => {
    describe('DistributionList Management Update Component', () => {
        let comp: DistributionListUpdateComponent;
        let fixture: ComponentFixture<DistributionListUpdateComponent>;
        let service: DistributionListService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [DistributionListUpdateComponent]
            })
                .overrideTemplate(DistributionListUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(DistributionListUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DistributionListService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new DistributionList(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.distributionList = entity;
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
                    const entity = new DistributionList();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.distributionList = entity;
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
