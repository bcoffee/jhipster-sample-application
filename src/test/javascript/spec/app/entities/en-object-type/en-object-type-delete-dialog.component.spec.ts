/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { EnObjectTypeDeleteDialogComponent } from 'app/entities/en-object-type/en-object-type-delete-dialog.component';
import { EnObjectTypeService } from 'app/entities/en-object-type/en-object-type.service';

describe('Component Tests', () => {
    describe('EnObjectType Management Delete Component', () => {
        let comp: EnObjectTypeDeleteDialogComponent;
        let fixture: ComponentFixture<EnObjectTypeDeleteDialogComponent>;
        let service: EnObjectTypeService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [EnObjectTypeDeleteDialogComponent]
            })
                .overrideTemplate(EnObjectTypeDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(EnObjectTypeDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EnObjectTypeService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
