/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { DistributionListComponent } from 'app/entities/distribution-list/distribution-list.component';
import { DistributionListService } from 'app/entities/distribution-list/distribution-list.service';
import { DistributionList } from 'app/shared/model/distribution-list.model';

describe('Component Tests', () => {
    describe('DistributionList Management Component', () => {
        let comp: DistributionListComponent;
        let fixture: ComponentFixture<DistributionListComponent>;
        let service: DistributionListService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [DistributionListComponent],
                providers: []
            })
                .overrideTemplate(DistributionListComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(DistributionListComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DistributionListService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new DistributionList(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.distributionLists[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
