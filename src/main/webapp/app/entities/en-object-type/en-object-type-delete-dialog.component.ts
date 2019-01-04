import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IEnObjectType } from 'app/shared/model/en-object-type.model';
import { EnObjectTypeService } from './en-object-type.service';

@Component({
    selector: 'jhi-en-object-type-delete-dialog',
    templateUrl: './en-object-type-delete-dialog.component.html'
})
export class EnObjectTypeDeleteDialogComponent {
    enObjectType: IEnObjectType;

    constructor(
        protected enObjectTypeService: EnObjectTypeService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.enObjectTypeService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'enObjectTypeListModification',
                content: 'Deleted an enObjectType'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-en-object-type-delete-popup',
    template: ''
})
export class EnObjectTypeDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ enObjectType }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(EnObjectTypeDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.enObjectType = enObjectType;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
