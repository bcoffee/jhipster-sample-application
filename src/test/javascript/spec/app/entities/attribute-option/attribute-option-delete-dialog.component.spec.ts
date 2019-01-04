/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { AttributeOptionDeleteDialogComponent } from 'app/entities/attribute-option/attribute-option-delete-dialog.component';
import { AttributeOptionService } from 'app/entities/attribute-option/attribute-option.service';

describe('Component Tests', () => {
    describe('AttributeOption Management Delete Component', () => {
        let comp: AttributeOptionDeleteDialogComponent;
        let fixture: ComponentFixture<AttributeOptionDeleteDialogComponent>;
        let service: AttributeOptionService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [AttributeOptionDeleteDialogComponent]
            })
                .overrideTemplate(AttributeOptionDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(AttributeOptionDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AttributeOptionService);
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
