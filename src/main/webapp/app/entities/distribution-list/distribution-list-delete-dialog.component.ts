import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDistributionList } from 'app/shared/model/distribution-list.model';
import { DistributionListService } from './distribution-list.service';

@Component({
    selector: 'jhi-distribution-list-delete-dialog',
    templateUrl: './distribution-list-delete-dialog.component.html'
})
export class DistributionListDeleteDialogComponent {
    distributionList: IDistributionList;

    constructor(
        protected distributionListService: DistributionListService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.distributionListService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'distributionListListModification',
                content: 'Deleted an distributionList'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-distribution-list-delete-popup',
    template: ''
})
export class DistributionListDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ distributionList }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(DistributionListDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.distributionList = distributionList;
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
