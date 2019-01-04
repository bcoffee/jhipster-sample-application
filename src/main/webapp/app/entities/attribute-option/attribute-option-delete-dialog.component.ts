import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAttributeOption } from 'app/shared/model/attribute-option.model';
import { AttributeOptionService } from './attribute-option.service';

@Component({
    selector: 'jhi-attribute-option-delete-dialog',
    templateUrl: './attribute-option-delete-dialog.component.html'
})
export class AttributeOptionDeleteDialogComponent {
    attributeOption: IAttributeOption;

    constructor(
        protected attributeOptionService: AttributeOptionService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.attributeOptionService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'attributeOptionListModification',
                content: 'Deleted an attributeOption'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-attribute-option-delete-popup',
    template: ''
})
export class AttributeOptionDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ attributeOption }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(AttributeOptionDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.attributeOption = attributeOption;
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
