import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IReportSubscription } from 'app/shared/model/report-subscription.model';
import { ReportSubscriptionService } from './report-subscription.service';

@Component({
    selector: 'jhi-report-subscription-delete-dialog',
    templateUrl: './report-subscription-delete-dialog.component.html'
})
export class ReportSubscriptionDeleteDialogComponent {
    reportSubscription: IReportSubscription;

    constructor(
        protected reportSubscriptionService: ReportSubscriptionService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.reportSubscriptionService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'reportSubscriptionListModification',
                content: 'Deleted an reportSubscription'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-report-subscription-delete-popup',
    template: ''
})
export class ReportSubscriptionDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ reportSubscription }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ReportSubscriptionDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.reportSubscription = reportSubscription;
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
